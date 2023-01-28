This is wiki contains a breakdown of the package and how to use each function

# Installation
```sh
npm i @acegoal07/json-editor
```

# Available tools
* `editFile` - Creates an editor instance for the specified file

# Example
```js
const json = require("@acegoal07/json-editor");

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
```