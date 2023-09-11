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

function changeContentMultiSelect() {
    multiSelects['essai'].loadSourceArray(["adam", "mario"]);
  }

function getContentMultiSelect() {
        alert(multiSelects['essai'].getData());
  }
function getContentMultiSelectOrder() {
        alert(multiSelects['selectOrder'].getData());
  }

  var jsonObj = {};
  var jsonViewer = new JSONViewer();
  document.querySelector("#json").appendChild(jsonViewer.getContainer());

  var textarea = document.querySelector("textarea");
  textarea.value = JSON.stringify({
    "@iot.id": 2,
    "@iot.selfLink": "http://localhost:8029/mario/v1.0/MultiDatastreams(2)",
    "name": "air_quality_readings2",
    "description": "Air quality Number two",
    "unitOfMeasurements": [
      {
        "name": "Humidity",
        "symbol": "%",
        "definition": "http://unitsofmeasure.org/humidity.html"
      },
      {
        "name": "Temperature",
        "symbol": "°",
        "definition": "http://unitsofmeasure.org/temperature.html"
      }
    ],
    "observationType": "http://www.opengis.net/def/observation-type/ogc-om/2.0/om_complex-observation",
    "multiObservationDataTypes": [
      "Measurement",
      "Measurement",
      "Measurement"
    ],
    "observedArea": null,
    "phenomenonTime": "2016-11-18T02:15:15Z/2016-11-18T05:15:15Z",
    "resultTime": "2016-11-18T13:30:30Z/2016-11-18T15:30:30Z",
    "properties": null,
    "Thing@iot.navigationLink": "http://localhost:8029/mario/v1.0/MultiDatastreams(2)/Thing",
    "Sensor@iot.navigationLink": "http://localhost:8029/mario/v1.0/MultiDatastreams(2)/Sensor",
    "Observations": [
      {
        "@iot.id": 11,
        "@iot.selfLink": "http://localhost:8029/mario/v1.0/Observations(11)",
        "phenomenonTime": "2016-11-18T02:15:15.79+01:00",
        "result": {
          "Humidity": 35,
          "Temperature": 35,
          "Battery": 35
        },
        "resultTime": "2016-11-18T13:30:30.79+01:00",
        "resultQuality": null,
        "validTime": "2023-07-06T12:01:35.201885+02:00",
        "parameters": false,
        "Datastream@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(11)/Datastream",
        "MultiDatastream@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(11)/MultiDatastream",
        "FeatureOfInterest@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(11)/FeatureOfInterest"
      },
      {
        "@iot.id": 12,
        "@iot.selfLink": "http://localhost:8029/mario/v1.0/Observations(12)",
        "phenomenonTime": "2016-11-18T05:15:15.79+01:00",
        "result": {
          "Humidity": 17.5,
          "Temperature": 35,
          "Battery": 17.5
        },
        "resultTime": "2016-11-18T15:30:30.79+01:00",
        "resultQuality": null,
        "validTime": "2023-07-06T12:01:35.205064+02:00",
        "parameters": false,
        "Datastream@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(12)/Datastream",
        "MultiDatastream@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(12)/MultiDatastream",
        "FeatureOfInterest@iot.navigationLink": "http://localhost:8029/mario/v1.0/Observations(12)/FeatureOfInterest"
      }
    ],
    "ObservedProperties@iot.navigationLink": "http://localhost:8029/mario/v1.0/MultiDatastreams(2)/ObservedProperties",
    "Loras@iot.navigationLink": "http://localhost:8029/mario/v1.0/MultiDatastreams(2)/Loras"
  });

  // textarea value to JSON object
  var setJSON = function() {
    try {
      var value = textarea.value;
      jsonObj = JSON.parse(value);
    }
    catch (err) {
      alert(err);
    }
  };

  // load default value
  setJSON();

  var loadJsonBtn = document.querySelector("button.load-json");
  var collapseBtn = document.querySelector("button.collapse");
  var maxlvlBtn = document.querySelector("button.maxlvl");

  loadJsonBtn.addEventListener("click", function() {
    setJSON();
    jsonViewer.showJSON(jsonObj);
  });

  collapseBtn.addEventListener("click", function() {
    jsonViewer.showJSON(jsonObj, null, 1);
  });

  maxlvlBtn.addEventListener("click", function() {
    jsonViewer.showJSON(jsonObj, 1);
  });




const menuitems = [
  {
    "text": "context one",
    "events": { // Adds eventlisteners to the item (you can use any event there is)
      "click": function(e){
        console.log("context one");
      }
    }
  },
  {
    "text": "context too",
    "events": {
      "click": function(e){
        console.log("context one");
      }
    }
  },
  {
    "text": "context disabled",
    "enabled": false,
    "events": {
      "click": function(e){
        console.log("not possible");
      }
    }
  }
];

var menu = new ContextMenu(menuitems);

contextDemo.addEventListener("contextmenu", function(e){
  menu.display(e);
});
