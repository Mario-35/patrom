// INSTALL BEFORE npm install css-minify -g

const fs = require('fs');
var path = require("path");
var dir = './dist';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const tempCss = fs.readFileSync(path.join("./css/", "main.css"), "utf-8").replace(/[\r\n]+/g, "") .split('@import url("').join("").split('");');
let file = `/**
* Patrom theme 
* @copyright 2023-present Inrae
* ${new Date().toLocaleString()}
* @author mario.adam@inrae.fr
*
*/
`;
tempCss.filter(e => e.trim() != "").forEach(e => {
    file += fs.readFileSync(path.join("./css/", e), "utf-8");
});

const temp = fs.readFileSync(path.join("./js/", "patrom.js"), "utf-8").split("addJsFiles([");
const files = temp[1].split("]);")[0].replace(/['" ]+/g, "").split(",");
console.log(files);
let js = temp[0];
files.forEach(e => {
    js += fs.readFileSync(path.join("./js/", `${e}.js`), "utf-8");
});
// const demoCss = fs.readFileSync(path.join("./css/", "demo.css"), "utf-8");
const iconsCss = fs.readFileSync(path.join("./css/", "icons.css"), "utf-8");
let demoHtml = fs.readFileSync(path.join("./", "index.html"), "utf-8");



fs.writeFileSync("dist/patrom.css", file);
fs.writeFileSync("../api/src/server/views/css/patrom.css", file);
console.log("write ====> patrom.css");
fs.writeFileSync("dist/patrom.js", js);
fs.writeFileSync("../api/src/server/views/js/patrom.js", js);
console.log("write ====> patrom.js");
demoHtml = demoHtml.replace(/css\/main.css/g, '../dist/patrom.min.css');
demoHtml = demoHtml.replace(/css\/css.js/g, '../dist/patrom.js');
demoHtml = demoHtml.replace(/demo\/demo.css/g, './demo.css');


// const res = iconsCss.split(":before {").join(" ").split(".");
const res = iconsCss.split(".").map(e => e.split(":")[0]);
res.shift();
let stri = [""];

let count = 1;
res.forEach(e => {
    if (count === 1) stri.push("<div class=\"patrom-row\">");
    stri.push(`   <div class="patrom-col col-span-1"> <span tooltip="${e}"> <span class="${e}"></span> </span> </div>`);
    count += 1;
    if (count === 13) {
        stri.push("</div>");
        count = 1;
    }
});

stri.push("</div>");
demoHtml = demoHtml.replace(/<div id="iconList"><\/div>/g, stri.join("\r\n"));
demoHtml = demoHtml.replace(/<script src="demo\/demo.js"><\/script>/g, "");



fs.writeFileSync("demo/demo.html", demoHtml);
console.log("write ====> demo.html");