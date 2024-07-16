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
// Specified get
try {
   logFormatter("Specified get", file.get("check"));
} catch (error) {
   logFormatter("Specified get", false);
}
// Get keys
try {
   const keys = file.getKeys();
   if (keys.length === 1 && keys[0] === "check") {
      logFormatter("Get keys", true);
   } else {
      logFormatter("Get keys", false);
   }
} catch (error) {
   logFormatter("Get keys", false);
}
// Cleanup /////////////////////////////////////////////////////////////
console.log(topBottom);