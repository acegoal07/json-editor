const findValue = require("find-value"),
   setValue = require("set-value"),
   rJson = require("r-json"),
   fs = require("fs"),
   iterateObject = require("iterate-object"),
   os = require('os');

/**
 * The json editor
 */
class editor {
   constructor (path, options) {
      this.options = options = options || {}
         options.stringify_width = options.stringify_width || 3
         options.stringify_fn = options.stringify_fn || null
         options.stringify_eol = options.stringify_eol || false
         options.ignore_dots = options.ignore_dots || false;
      this.path = path
      this.data = this.read()
   }

   /**
    * Saves the file and any changes
    *
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
    * @returns {JsonEditor} The `JsonEditor` instance
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
    * Get a value in a specific path
    *
    * @param {String} path The object path
    * @returns {Value} The object path value
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
    * Write the JSON file
    *
    * @param {String} content file content
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
    * @returns {JsonEditor} The `JsonEditor` instance
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
    * Empty the JSON file content
    *
    * @param {Function} callback The callback function
    */
   empty(callback) {
      return this.write("{}", callback)
   }

   /**
    * Empty an arrays content
    *
    * @param {String} path The object path
    */
   emptyArray(path) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      const data = this.get(path);
      if (!Array.isArray(data)) {
         throw new Error("The data is not an array!");
      }
      return this.set(path, []);
   }

   /**
    *
    */
   emptyObject(path) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      const data = this.get(path)
      if (typeof data !== "object") {
         throw new Error("The data is not an object")
      }
      return this.set(path, {});
   }
   /**
    * Read the JSON file
    *
    * @param {Function} callback An optional callback function which will turn the function into an asynchronous one
    * @returns {Object} The object parsed as object or an empty object by default
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
    * Returns a object from the data path
    *
    * @returns {Object} The data object
    */
   toObject() {
      return this.data;
   }

   /**
    * Returns a string of the json data
    *
    * @param {Boolean} keepLayout Weather or not the data should keep the object layout from the file
    * @returns {String} The data string
    */
   toString(keepLayout = false) {
      if (keepLayout) {
         return JSON.stringify(JSON.parse(data), null, 2);
      } else {
         return JSON.stringify(this.data);         
      }
   }

   /**
    * Returns a joined string from the array path
    *
    * @param {String} path The object path
    * @param {String} joiner The character to join the data with
    * @returns {String} The data string
    */
   arrayToString(path, joiner) {
      let data;
      if (!path) {
         data = this.data;
      } else {
         data = this.get(path);
      }
      if (!Array.isArray(data)) {
         throw new Error("The data is not an array!");
      }
      if (!joiner) {
         throw new Error("No joiner was provided");
      }
      if (data.length = 1) return data;
      return data.join(joiner);
   }

   /**
    * Set a value in a specific path
    *
    * @param {String} path The object path
    * @param {Anything} value The value
    * @param {Object} options The options for set-value (applied only when {ignore_dots} file option is false)
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   set(path, value, options) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      if (typeof path === "object") {
         iterateObject(path, (val, n) => {
            setValue(this.data, n, val, options);
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
    * Remove a path from a JSON object
    *
    * @param {String} path The object path
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   unset(path) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      return this.set(path, undefined)
   }

   /**
    * @deprecated This feature has been deprecated in favour of adding pushTop and pushBottom
    */
   append(path, value) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
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
    * Pushes the data to the top of the specified array
    * 
    * @param {String} path The object path
    * @param {Anything} value The value
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   push(path, value) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
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
    * Pushes the data to the bottom of the specified array
    * 
    * @param {String} path The object path
    * @param {Anything} value The value
    * @returns {JsonEditor} The `JsonEditor` instance
    */
      unshift(path, value) {
         if (!path) {
            throw new Error("You did not provide a path")
         }
         let data = this.get(path);
         data = (data === undefined) ? [] : data;
            if (!Array.isArray(data)) {
               throw new Error("The data is not an array!");
            }
         data.unshift(value);
         this.set(path,data);
         return this;
      }

   /**
    * Remove the last item from an array
    *
    * @param {String} path The object path
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   popLast(path) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      let data = this.get(path);
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
    * @param {String} path The object path
    * @param {Number} position The position of the item
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   popTo(path, position) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      let data = this.get(path);
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
    * @param {String} path The object path
    * @returns {JsonEditor} The `JsonEditor` instance
    */
   popFirst(path) {
      if (!path) {
         throw new Error("You did not provide a path")
      }
      let data = this.get(path);
      if (!Array.isArray(data)) {
         throw new Error('The data is not an array!');
      }
      data.shift();
      this.set(path, data);
      return this;
   }
}

/**
 * Edit a json file
 *
 * @param {String} path The path to the JSON file
 * @param {{
 *    stringify_width?: Number,
 *    stringify_fn?: Function,
 *    stringify_eol?: Boolean,
 *    ignore_dots?: Boolean,
 *    autosave?: Boolean
 * }} options An object containing the following fields:
 *
 *  - `stringify_width` (Number): The JSON stringify indent width (default: `2`)
 *  - `stringify_fn` (Function): A function used by `JSON.stringify`
 *  - `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
 *  - `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
 *  - `autosave` (Boolean): Save the file when setting some data in it
 *
 * @returns {editor}
 */

exports.editFile = function(path, options) {
   if (!path) {
      throw new Error("ERROR with editFile: path is null")
   }
   return new editor(path, options)
}

/**
 * Creates a json file
 *
 * @param {String} path The path to the file location
 * @param {String} data The data you would like to populate the file with
 */
exports.createFile = function(path, data = `{}`) {
   if (!path) {
      throw new Error("ERROR with createFile: path is null");
   }
   fs.writeFile(path, data, function (error) {
      if (error) throw error;
      return;
   });
}

/**
 * Deletes the specified json file
 *
 * @param {String} path The path to the file location
 */
exports.deleteFile = function(path) {
   if (!path) {
      throw new Error("ERROR with deleteFile: path is null");
   }
   fs.unlink(path, function (error) {
      if (error) throw error;
      return;
   });
}

/**
 * Duplicates the file you specify
 *
 * @param {String} path The path to the JSON file
 * @param {String} copyPath The path to the location you want the new file saved
 */
exports.copyFile = function(path, copyPath = null) {
   if (!path) {
      throw new Error("ERROR with copyFile: path is null");
   }
   if (!copyPath) {
      fs.copyFile(path, path.replace(".json","-copy.json"), function (error) {
         if (error) throw error;
      });
   } else {
      fs.copyFile(path, copyPath, function (error) {
         if (error) throw error;
         return
      });
   }
}

/**
 * Moves the file from the old location to the new location
 * 
 * @param {String} oldPath The path to the file location
 * @param {String} newPath The path to the location you want to move the file
 */
exports.moveFile = function(oldPath, newPath) {
   if (!oldPath) {
      throw new Error("ERROR with moveFile: oldPath is null");
   }
   if (!newPath) {
      throw new Error("ERROR with moveFile: newPath is null");
   }
   fs.copyFile(oldPath, newPath, function (error) {
      if (error) throw error;
   });
   fs.unlink(oldPath, function (error) {
      if (error) throw error;
      return;
   });
}

/**
 * Renames the specified file to the new provided name
 * 
 * @param {String} path The path to the file location
 * @param {String} newName The new name that will be set for the file
 */
exports.renameFile = function(path, newName) {
   if (!path) {
      throw new Error("ERROR with renameFile: path is null");
   }
   if (!newName) {
      throw new Error("ERROR with renameFile: newName is null")
   }
   fs.rename(path, path.replace(path.split(/[\\/]/).pop(), newName), function (error) {
      if (error) throw error;
      return;
   });
}