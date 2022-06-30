<h1 align="center">json-editor</h1>
<div align="center">
   <img alt="Repository size" src="https://img.shields.io/github/repo-size/acegoal07/json-editor">
   <img alt="npm" src="https://img.shields.io/npm/v/@acegoal07/json-editor/latest">
   <img alt="NPM" src="https://img.shields.io/npm/l/@acegoal07/json-editor">
   <img alt="Libraries.io dependency status for latest release" src="https://img.shields.io/github/issues-raw/acegoal07/json-editor">
   <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/acegoal07/json-editor">
   <img alt="Monthly Downloads" src="https://img.shields.io/npm/dm/@acegoal07/json-editor">
</div><br>

---

## Installation
```sh
npm i @acegoal07/json-editor
```

### `JsonEditor(path, options)`
<h4>Params</h4>

- `path` - A string to show the location of the file<br>
- `options` - A object of custom options for the editor:
<h4>Options</h4>

- `stringify_width` (Number): The JSON stringify indent width (default: `2`)
- `stringify_fn` (Function): A function used by `JSON.stringify`
- `stringify_eol` (Boolean): Whether to add the new line at the end of the file or not (default: `false`)
- `ignore_dots` (Boolean): Whether to use the path including dots or have an object structure (default: `false`)
- `autosave` (Boolean): Save the file when setting some data in it
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
### `.save(callback)`
Saves the file and any changes
<h4>Params</h4>

- 'callback' - An optional callback function which will turn the function into an asynchronous one
<h4>Return</h4>

- Returns an instance of the `JsonEditor`
### `.write(content, callback)`
### `.get(path)`
### `.empty(callback)`
### `.read(callback)`
### `.toObject()`
### `.toString(joiner)`
### `.set(path, value, options)`
### `.unset(path)`
### `.append(path, value)`
### `.popFirst(path)`
### `.popTo(path, position)`
### `.popLast(path)`