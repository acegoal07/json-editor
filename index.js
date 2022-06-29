const findValue = require("find-value");
const setValue = require("set-value");
const rJson = require("r-json");
const fs = require("fs");
const iterateObject = require("iterate-object");
const os = require('os');

class JsonEditor {

   /**
    * @name JsonEditor
    * @param {String}
    * @param {Object}
    *
    *  - `stringify_width` (Number): The JSON stringify indent width (default: `2`).
    *  - `stringify_fn` (Function): A function used by `JSON.stringify`.
    *  - `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
    *  - `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
    *  - `autosave` (Boolean): Save the file when setting some data in it.
    *
    * @returns {JsonEditor}
    */
   constructor (path, options) {
      this.options = options = options || {}
      options.stringify_width = options.stringify_width || 2
      options.stringify_fn = options.stringify_fn || null
      options.stringify_eol = options.stringify_eol || false
      options.ignore_dots = options.ignore_dots || false;
      this.path = path
      this.data = this.read()
   }

   /**
     * Saves the file and any changes
     *
     * @param {Function} callback
     * @returns {JsonEditor}
     */
   save(callback) {
      const data = JSON.stringify(
         this.data,
         this.options.stringify_fn,
         this.options.stringify_width,
         this.options.stringify_eol
      );
      this.write(this.options.stringify_eol ? data + os.EOL : data, callback);
      return this;
   }

   /**
    * Get a value in a specific path.
    *
    * @param {String} path
    * @returns {Value} The object path value.
    */
   get(path) {
      if (path) {
         if(this.options.ignore_dots) {
            return this.data[path];
         }
         return findValue(this.data, path)
      }
      return this.toObject()
   }
   /**
    * Write the JSON file.
    *
    * @param {String} The file content.
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one.
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   write(content, callback) {
      if (callback) {
            fs.writeFile(this.path, content, callback)
      } else {
            fs.writeFileSync(this.path, content)
      }
      return this
   }
 
   /**
    * Empty the JSON file content.
    *
    * @param {Function} callback The callback function.
    */
   empty(callback) {
      return this.write("{}", callback)
   }
 

   /**
    * Read the JSON file.
    *
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one.
    * @returns {Object} The object parsed as object or an empty object by default.
    */
   read(callback) {
      if (!callback) {
            try {
               return rJson(this.path)
            } catch (error) {
               return {}
            }
      }
      rJson(this.path, function (err, data) {
            data = err ? {} : data
            callback(null, data)
      })
   }

   /**
    * toObject
    *
    * @name toObject
    * @function
    * @returns {Object} The data object.
    */
   toObject() {
      return this.data
   }
   
   /**
    * Set a value in a specific path
    *
    * @param {String} path The object path.
    * @param {Anything} value The value.
    * @param {Object} options The options for set-value (applied only when {ignore_dots} file option is false)
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   set(path, value, options) {
      if (typeof path === "object") {
         iterateObject(path, (iValue, n) => {
            setValue(this.data, n, iValue, options);
         })
      } else if (this.options.ignore_dots) {
         this.data[path] = value;
      } else {
         setValue(this.data, path, value, options);
      }
      if (this.options.autosave) {
         this.save();
      }
      return this;
   }

   /**
    * Remove a path from a JSON object.
    *
    * @param {String} path The object path.
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
    unset(path) {
      return this.set(path, undefined)
   }

   /**
    * Appends a value/object to a specific path.
    * If the path is empty it wil create a list.
    *
    * @param {String} path The object path.
    * @param {Anything} value The value.
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   append(path, value) {
      let data = this.get(path);
      data = (data === undefined) ? [] : data;
         if (!Array.isArray(data)) {
            throw new Error("The data is not an array!");
         }
      data.push(value);
      this.set(path,data);
      return this;
   }

   /**
    * Remove the last item from an array
    *
    * @param {String} path The object path.
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   popLast(path) {
      const data = this.get(path);
      if (!Array.isArray(data)) {
         throw new Error('The data is not an array!');
      }
      data.pop();
      this.set(path, data);
      return this;
   }

   /**
    * Removes a specific item from an array
    *
    * @param {String} path The object path.
    * @param {Number} position The position of the item
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   popTo(path, position) {
      const data = this.get(path);
      if (!Array.isArray(data)) {
         throw new Error('The data is not an array!');
      }
      if (!data[position]) {
         throw new Error('The item does not exist on this array');
      }
      data.splice(position, position);
      this.set(path, data);
      return this;
   }

   /**
    * Remove the first item from an array
    *
    * @param {String} path The object path.
    * @returns {JsonEditor} The `JsonEditor` instance.
    */
   popFirst(path) {
      const data = this.get(path);
      if (!Array.isArray(data)) {
         throw new Error('The data is not an array!');
      }
      data.shift();
      this.set(path, data);
      return this;
   }
}

/**
 * Edit a json file.
 *
 * @param {String} path The path to the JSON file.
 * @param {{
 *    stringify_width?: Number,
 *    stringify_fn?: Function,
 *    stringify_eol?: Boolean,
 *    ignore_dots?: Boolean,
 *    autosave?: Boolean
 * }} options An object containing the following fields:
 * @return {JsonEditor} The `JsonEditor` instance.
 */
module.exports = function jsonEditor(path, options) {
   return new JsonEditor(path, options);
}