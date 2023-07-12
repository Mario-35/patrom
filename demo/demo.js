function createIcones() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "../css/icons.css", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                var iconsCss = rawFile.responseText;
                const res = iconsCss.split(".").map(e => e.split(":")[0]);
                res.shift();
                let stri = [""];
                let count = 1;
                res.forEach(e => {
                    if (count === 1) stri.push("<div class=\"patrom-row\">");
                    stri.push(`<div class="patrom-col col-span-1">`);
                    stri.push(`   <span tooltip="${e}">`);
                    stri.push(`      <span class="${e}"></span>`);
                    stri.push(`   </span>`);
                    stri.push("</div>");
                    count += 1;
                    if (count === 13) {
                        stri.push("</div>");
                        count = 1;
                    }
                });
                stri.push("</div>");
                document.getElementById("iconList").innerHTML = stri.join(" ");
            }
        }
    }
    rawFile.send(null);
  };
  createIcones();