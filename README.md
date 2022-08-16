<h1 align="center">json-editor</h1>
<div align="center">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/json-editor">
   <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/json-editor/latest">
   <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/json-editor">
   <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/github/issues-raw/acegoal07/json-editor">
   <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/json-editor">
   <img alt="Monthly Downloads" src="https://img.shields.io/npm/dm/@acegoal07/json-editor">
</div>

---

## Installation
```sh
npm i @acegoal07/json-editor
```

## About
This package is still a working progress so expect changes that could change how it is used

If you experience any issues or would like to recommend a feature open an issue and ill look into it

## Example
```js
const json = require("@acegoal07/json-editor");

json.createFile("display.json");
// Create a new json file

let file = json.editFile("display.json", {autosave: true});
// file content = {}

file.set("Hello", "world!");
file.set("toggle", true);
file.set("data", []);
// {
//   "Hello": "world!",
//   "toggle": true,
//   "data": []
// }

console.log(file.get("Hello"))
// log => world!

file.push("data", "test");
file.push("data", "test2")
file.unshift("data", "test3");
file.set("items", {"world": "world!"});
file.unset("Hello");
// {
//   "data": [
//       "test3",
//       "test",
//       "test2"
//   ],
//   "items": {
//       "world": "world!"
//   }
// }

file.emptyArray("data");
file.emptyObject("items");
// {"data": [], "items": {}}

file.empty()
// {}

json.copyFile("display.json", "json/display.json");
json.deleteFile("display.json");
// Deletes the specified json file

json.renameFile("json/display.json", "show.json");
// Changes the name of the specified file
```


## File documentation
### `createFile(path, data)`
Creates a json file
<h4>Params</h4>

- `path` - The path to the file location
- `data` - The data you would like to populate the file with
### `deleteFile(path)`
Deletes the specified json file
<h4>Params</h4>

- `path` - The path to the file location
### `copyFile(path, copyPath)`
Duplicates a json file to a location provided
<h4>Params</h4>

- `path` - The path to the file location
- `copyPath` - The path to the location you want the new file saved
### `moveFile(oldPath, newPath)`
Moves the file from the old location to the new location
<h4>Params</h4>

- `oldPath` - The path to the file location
- `newPath` - The path to the location you want to move the file
### `renameFile(path, newName)`
Renames the file that is specified
<h4>Params</h4>

- `path` - The path to the file location
- `newName` - The new name that will be set for the file
## Editor documentation
Edits json files
### `editFile(path, options)`
<h4>Params</h4>

- `path` - A string to show the location of the file
- `options` - A object of custom options for the editor:
<h4>Options</h4>

- `stringify_width` (Number): The JSON stringify indent width (default: `2`)
- `stringify_fn` (Function): A function used by `JSON.stringify`
- `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
- `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
- `autosave` (Boolean): Save the file when setting some data in it
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- save !-->
### `.save(callback)`
Saves the file and any changes
<h4>Params</h4>

- `callback` - An optional callback function which will turn the function into an asynchronous one
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- write !-->
### `.write(content, callback)`
Write the JSON file
<h4>Params</h4>

- `content` - The data you would like to write to the json file
- `callback` - An optional callback function which will turn the function into an asynchronous one
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- get !-->
### `.get(path)`
Get a value in a specific path or the whole json document
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns the object path value
<br>



<!-- empty !-->
### `.empty(callback)`
Empty the JSON file content
<h4>Params</h4>

- `callback` - An optional callback function which will turn the function into an asynchronous one
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- emptyArray !-->
### `.emptyArray(path)`
Removes all the items from an array
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- emptyObject !-->
### `.emptyObject(path)`
Removes all the items from a object
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- read !-->
### `.read(callback)`
Read the JSON file
<h4>Params</h4>

- `callback` - An optional callback function which will turn the function into an asynchronous one
<h4>Return</h4>

- Returns the data from the json file
<br>



<!-- toObject !-->
### `.toObject()`
Returns a object from the data path
<h4>Return</h4>

- Returns the data from the json file as a object
<br>



<!-- toString !-->
### `.toString(keepLayout)`
Returns a string of the json data
<h4>Params</h4>

- `keepLayout` - An option to keep the layout of the json file (default: false)
<h4>Return</h4>

- Returns the data from the json as a string
<br>



<!-- arrayToString !-->
### `.arrayToString({path, joiner})`
Returns a object from the data path
<h4>Params</h4>

- `path` - The object path
- `joiner` - The character to join the data with
<h4>Return</h4>

- Returns a string of data
<br>



<!-- set !-->
### `.set(path, value, options)`
Set a value in a specific path
<h4>Params</h4>

- `path` - The object path
- `value` - The data you want to put into the json file
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- unset !-->
### `.unset(path)`
Remove a path from a JSON object
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- unshift !-->
### `.unshift(path, value)`
Pushes the data to the top of the specified array
<h4>Params</h4>

- `path` - The object path
- `value` - The data you want to put into the json file
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- push !-->
### `.push(path, value)`
Pushes the data to the bottom of the specified array
<h4>Params</h4>

- `path` - The object path
- `value` - The data you want to put into the json file
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- popFirst !-->
### `.popFirst(path)`
Remove the first item from an array
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- popTo !-->
### `.popTo(path, position)`
Removes a specific item from an array
<h4>Params</h4>

- `path` - The object path
- `position` - The position of the item you want to remove
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- popLast !-->
### `.popLast(path)`
Remove the last item from an array
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
<br>



<!-- getKeys !-->
### `.getKeys(path)`
Gets the keys of the object 
<h4>Params</h4>

- `path` - The object path
<h4>Return</h4>

- Returns an array with all the keys in
<br>



<!-- delete !-->
### `.delete()`
Deletes the current file your editing
<br>