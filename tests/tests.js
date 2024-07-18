///////////////////////////////////////////////////////////////////////////
const jsonEditor = require("../dist");
const file = jsonEditor.editFile("tests/json/1.json", { autosave: true });
const topBottomSize = 28;
const topBottom = `|${"-".repeat(topBottomSize + 2)}|--------|`;
// Log output ////////////////////////////////////////////////////////////
function logFormatter(testName, value = false) {
   console.log(`| ${testName}${" ".repeat((topBottomSize - testName.length))} | ${value ? "\x1b[92mPASSED\x1b[0m" : "\x1b[91mFAILED\x1b[0m"} |`);
}
// JSON Editor Tests /////////////////////////////////////////////////////
console.log(`${topBottom}
| JSON Editor                  |        |
${topBottom}
|             TEST             | STATUS |
${topBottom}`);
// get
try {
   logFormatter("get", file.get("check"));
} catch (error) {
   logFormatter("get", false);
}
// write
try {
   file.write(`{"check2":"passed"}`);
   if (file.get("check2") === "passed") {
      logFormatter("Write", true);
   } else {
      logFormatter("Write", false);
   }
} catch (error) {
   console.log(error);
   logFormatter("Write", false);
}
// get keys
try {
   const keys = file.getKeys();
   if (keys.length === 1 && keys[0] === "check2") {
      logFormatter("Get keys", true);
   } else {
      logFormatter("Get keys", false);
   }
} catch (error) {
   logFormatter("Get keys", false);
}
// Cleanup /////////////////////////////////////////////////////////////
console.log(topBottom);