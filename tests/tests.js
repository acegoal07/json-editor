const jsonEditor = require("../dist");

const file = jsonEditor.editFile("json/1.json", {autosave: true});

// specified get
if (file.get("check")) {
   console.log("\x1B[32mTest 1 passed");
} else {
   console.log("\x1B[31mTest 2 failed");
}
// non specified get
if (!file.get().check) {
   console.log("\x1B[32mTest 2 passed");
} else {
   console.log("\x1B[31mTest 2 failed");
}