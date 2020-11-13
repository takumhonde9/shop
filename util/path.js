const path = require("path");

// constructs a path to the root file
module.exports = path.dirname(process.mainModule.filename);
