This is page breaks down the file editor function and how to use all its functions

# editFile parameters
* `path` - A string to show the location of the file
* `options` - A object of custom options for the editor

# editFile options
* `stringify_width` (Number): The JSON stringify indent width (default: `2`)
* `stringify_fn` (Function): A function used by `JSON.stringify`
* `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
* `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
* `autosave` (Boolean): Save the file when setting some data in it

# Example
```js
// Starting editor instance
const file = json.editFile("example.json", {autosave: true}); 

// Edit data within file
file.set("example", "data");
```

# editFile functions 
* `save` - Saves the file and any changes
* `write` - Write the JSON file
* `writeCopy` - Copy's the data from a file into the file your editing
* `get` - Get a value in a specific path or the whole json document
* `empty` - Empty the JSON file content
* `emptyArray` - Removes all the items from an array
* `emptyObject` - Removes all the items from a object
* `read` - Read the JSON file
* `toObject` - Returns the data from the json file as a object
* `toString` - Returns the data from the json as a string
* `arrayToString` - Returns a string of data from an array
* `set` - Set a value in a specific path
* `unset` - Remove a path from a JSON object
* `trigger` - Switches a boolean data type between true and false
* `unshift` - Pushes the data to the top of the specified array
* `push` - Pushes the data to the bottom of the specified array
* `popFirst` - Remove the first item from an array
* `popTo` - Removes a specific item from an array
* `popLast` - Remove the last item from an array
* `getKeys` - Gets the keys of the object 
* `delete` - Deletes the current file your editing
* `copy` - Copy's the data from one path to a another
* `move` - Moves the data to a new path and deletes the original

# Function breakdowns
These are breakdowns of the functions within the editor and how to use them

***
## `save(callback)`
**Parameters**
* `callback` - An optional callback function which will turn the function into an asynchronous one

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
file.save() // This is only needed if you are not using autosave
```

***
## `write(content, callback)`
**Parameters**
* `content` - The data you would like to write to the json file
* `callback` - An optional callback function which will turn the function into an asynchronous one

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
file.write(
   `{
        "Hello": "World!"
    }`
)
```

***
## `writeCopy(path, layout)`
**Parameters**
* `path` - The path to the JSON file
* `layout` - The is used to add a layout out to the data being written to the file

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
// Copy data and add layout
file.writeCopy("dataFile.json", true)

// Copy data without layout
file.writeCopy("dataFile.json")
```

***
## `get(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
file.get("Hello")
```

***
## `empty(callback)`
**Parameters**
* `callback` - An optional callback function which will turn the function into an asynchronous one

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
file.empty()
```

***
## `emptyArray(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

**Example**
```js
// Empty Array json file
file.emptyArray()

// Empty array from an object path
file.emptyArray("HelloArray")
```

***
## `emptyObject(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

***
## `read(callback)`
**Parameters**
* `callback` - An optional callback function which will turn the function into an asynchronous one

**Returns**
* Returns the data from the json file


***
## `toObject()`
**Returns**
* Returns the data from the json file as a object

***
## `toString(keepLayout)`
**Parameters**
* `keepLayout` - An option to keep the layout of the json file (default: false)

**Returns**
* Returns the data from the json as a string

***
## `arrayToString({path, joiner})`
**Parameters**
* `path` - The object path
* `joiner` - The character to join the data with

**Returns**
* Returns a string of data from the array

***
## `set(path, value, options)`
**Parameters**
* `path` - The object path
* `value` - The value
* `options` - The options for set-value (applied only when {ignore_dots} file option is false)

**Returns**
* Returns an instance of the `JsonEditor`

***
## `unset(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

***
## `trigger(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

***
## `unshift(path, value)`
**Parameters**
* `path` - The object path
* `value` - The data you want to put into the array

**Returns**
* Returns an instance of the `JsonEditor`

***
## `push(path, value)`
**Parameters**
* `path` - The object path
* `value` - The data you want to put into the array

**Returns**
* Returns an instance of the `JsonEditor`

***
## `popFirst(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

***
## `popTo(path, position)`
**Parameters**
* `path` - The object path
* `position` - The position of the item in the array you want to remove

**Returns**
* Returns an instance of the `JsonEditor`

***
## `popLast(path)`
**Parameters**
* `path` - The object path

**Returns**
* Returns an instance of the `JsonEditor`

***
## `getKeys(path)`
**Parameters**
* `path` - The object path

**Returns**
Returns an array with all the keys in

***
## `delete()`

***
## `copy(path, copyPath)`
**Parameters**
* `path` - The object path to the data you want to copy
* `copyPath` - The object path to the place you wanna put the data

**Returns**
* Returns an instance of the `JsonEditor`

***
## `move(oldPath, newPath)`
**Parameters**
* `oldPath` - The object path to the data you want to move
* `newPath` - The object path to the place you wanna put the data

**Returns**
* Returns an instance of the `JsonEditor`