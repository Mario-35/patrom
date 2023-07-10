const fs = require('fs');
var path = require("path");
var dir = './dist';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const temp = fs.readFileSync(path.join("./css/", "main.css"), "utf-8").replace(/[\r\n]+/g, "") .split('@import url("').join("").split('");');
let file = "";
temp.filter(e => e.trim() != "").forEach(e => {
    file += fs.readFileSync(path.join("./css/", e), "utf-8");
})
const js = fs.readFileSync(path.join("./css/", "css.js"), "utf-8");

fs.writeFileSync("dist/full.css", file);
console.log("write ====> patrom.css");
fs.writeFileSync("dist/css.js", js);
console.log("write ====> css.js");