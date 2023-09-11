var themes = {
	"common": {
		"font-size": "14px",
		"font-size-half": "7px",
		"font-size-2": "12px",
		"font-size+2": "16px",
		"btn-gray-color": "#eceff1",
		"btn-gray-border": "#546e7a",
		"btn-gray-hover-border": "#78909c",
		"btn-gray-disabled-background": "#b0bec5",
		"btn-gray-disabled-border": "#90a4ae",
		"btn-gray-background": "#78909c",
		"btn-gray-hover-color": "#fff",
		"btn-gray-hover-background": "#90a4ae",
		"btn-gray-active-border": "#546e7a",
		"btn-gray-active-color": "#cfd8dc",
		"btn-gray-active-background": "#546e7a",
		"btn-primary-border": "#1e88e5",
		"btn-primary-hover-border": "#42a5f5",
		"btn-primary-disabled-background": "#90caf9",
		"btn-primary-disabled-border": "#64b5f6",
		"btn-primary-color": "#e3f2fd",
		"btn-primary-background": "#42a5f5",
		"btn-primary-hover-color": "#fff",
		"btn-primary-hover-background": "#64b5f6",
		"btn-primary-active-border": "#1e88e5",
		"btn-primary-active-color": "#bbdefb",
		"btn-primary-active-background": "#1e88e5",
		"btn-success-border": "#43A047",
		"btn-success-hover-border": "#66BB6A",
		"btn-success-disabled-background": "#A5D6A7",
		"btn-success-disabled-border": "#81C784",
		"btn-success-color": "#E8F5E9",
		"btn-success-background": "#66BB6A",
		"btn-success-hover-color": "#fff",
		"btn-success-hover-background": "#81C784",
		"btn-success-active-border": "#43A047",
		"btn-success-active-color": "#C8E6C9",
		"btn-success-active-background": "#43A047",
		"btn-info-border": "#00ACC1",
		"btn-info-hover-border": "#26C6DA",
		"btn-info-disabled-background": "#80DEEA",
		"btn-info-disabled-border": "#4DD0E1",
		"btn-info-color": "#E0F7FA",
		"btn-info-background": "#26C6DA",
		"btn-info-hover-color": "#fff",
		"btn-info-hover-background": "#4DD0E1",
		"btn-info-active-border": "#00ACC1",
		"btn-info-active-color": "#B2EBF2",
		"btn-info-active-background": "#00ACC1",
		"btn-warning-border": "#FB8C00",
		"btn-warning-hover-border": "#FFA726",
		"btn-warning-disabled-background": "#FFCC80",
		"btn-warning-disabled-border": "#FFB74D",
		"btn-warning-color": "#FFF3E0",
		"btn-warning-background": "#FFA726",
		"btn-warning-hover-color": "#fff",
		"btn-warning-hover-background": "#FFB74D",
		"btn-warning-active-border": "#FB8C00",
		"btn-warning-active-color": "#FFE0B2",
		"btn-warning-active-background": "#FB8C00",
		"btn-danger-border": "#F4511E",
		"btn-danger-hover-border": "#FF7043",
		"btn-danger-disabled-background": "#FFAB91",
		"btn-danger-disabled-border": "#FF8A65",
		"btn-danger-color": "#FBE9E7",
		"btn-danger-background": "#FF7043",
		"btn-danger-hover-color": "#fff",
		"btn-danger-hover-background": "#FF8A65",
		"btn-danger-active-border": "#F4511E",
		"btn-danger-active-color": "#FFCCBC",
		"btn-danger-active-background": "#F4511E",
	},
	"light": {
		"text-color": "#000",
		"button-border": "#cccccc",
		"content-color": "#454545",
		"button-hover": "#208103",
		"select-box-shadow": "#949696",
		"select-border-top": "#fff",
		"body-background": "#dfe2e2",
		"background-color": "#e5e9e8",
		"background-color-disabled": "#ffe1e1",
		"background-color-hover": "#f9c62a70",
		"content-background": "#e1e6e6",
		"border-focus": "#0036ff",
		"background-highlight": "#288edf",
		"background-highlight-hover": "#4ca1e4",
		"select-background": "#DDE1E1",
		"select-border-top": "#fff",
		"input-background": "#fff",
		"invalid-colour": "#ec514e",
		"color-active": "#0772c3",
		"color-hover": "#29a0fa",
		"json-number": "#073aff",
		"json-code": "#8e08a0",
		"json-url": "#DD2E2E",
		"json-string": "#116408",
		"json-date": "#CB7500"
	},
	"dark": {
		"text-color": "#fff",
		"button-border": "#6b6767",
		"select-box-shadow": "#303233",
		"select-border-top": "#666767",
		"content-color": "#c6c8c8",
		"button-hover": "#208103",
		"body-background": "#4b4d4e",
		"background-color": "#595b5b",
		"background-color-odd": "#7e8080",
		"background-color-disabled": "#685757",
		"background-color-hover": "#288edf",
		"content-background": "#444949",
		"border-focus": "#0036ff",
		"background-highlight": "#288edf",
		"background-highlight-hover": "#4ca1e4",
		"select-background": "#595B5B",
		"input-background": "#454646",
		"invalid-colour": "#ec514e",
		"color-active": "#1e7dc8",
		"color-hover": "#4ca1e4",
		"json-number": "#0cbde6",
		"json-code": "#de9ae7",
		"json-url": "#F0A1A1",
		"json-string": "#B7E4B2",
		"json-date": "#CB7500"

	}
};

 function setTheme(themeName) {
	localStorage.setItem('theme', themeName);
	document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-light');
	} else {
		setTheme('theme-dark');
	}
}

fileone.addEventListener("change", function(e) {
	var fileName = "";
	try {
		if (this.files && this.files.length > 1)
			fileName = (this.getAttribute("data-multiple-caption") || "").replace("{count}", this.files.length);
		else
			fileName = e.target.value.split("\\").pop();

		if (fileName) {
			fileonelabel.querySelector("span").innerHTML = fileName;
		} else {
			fileonelabel.innerHTML = labelVal;
		}
	} catch (err) {
		notifyError("Error", err);
	} finally {
		buttonGo();
	}
});

// Immediately invoked function to set the theme on initial load
(function () {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-dark');
		document.getElementById('theme').checked = false;
	} else {
		setTheme('theme-light');
	  document.getElementById('theme').checked = true;
	}
})();

addJsFiles(['multiSelect' ,'jsonViewer', 'contextMenu']);

// ONLY FOR DEMO 
function viewCode(e) {
	document.getElementById('pre').innerText = e.target.parentElement.previousElementSibling.innerHTML;
	document.getElementById("popup").style.opacity = 1;
	// document.getElementById("overlay").style.opacity = 0.8;
	document.getElementById("popup").style.display = "block";
	// document.getElementById("overlay").style.display = "block";
}

popupClose.onclick = function(e) {
	document.getElementById("popup").style.opacity = 0;
	// document.getElementById("overlay").style.opacity = 0;
	setTimeout(function() {
		document.getElementById("popup").style.display = "none";
		// document.getElementById("overlay").style.display = "none";
	}, 1000);

};


function addJsFile(file) {
	var script = document.createElement('script');
	script.type='text/javascript';
	script.src = `./js/${file}.js`;
	document.getElementsByTagName('head')[0].appendChild(script);
}

function addJsFiles(files) {
	files.forEach((file) => addJsFile(file));
}

addJsFile('demo');

function createRow(type, first) {
	let result = '<tr>'
	result += first;
	for (let step = 0; step < 25; step++) {
		// Runs 5 times, with values of step 0 through 4.
		result += `<${type}>head</${type}>`;
	}
	result += "</tr>";
	return result;  
}


function createRows(nb) {
	let result = '<tbody>';
	for (let step = 0; step < nb; step++) {
		// Runs 5 times, with values of step 0 through 4.
		result += createRow("td", "<th>head</th>");
	}
	result += "</tbody>";
	return result;  
}

var table = document.createElement('table');
table.innerHTML = ` <thead> ${createRow("th", "<th></th>")} </thead> 
${createRows(35)} 
`;
document.getElementById("tableDemo").appendChild(table);

