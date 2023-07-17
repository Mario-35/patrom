
var themes = {
  "common": {
    "font-size" : "14px",
    "font-size-2" : "12px",

    "btn-gray-color" : "#eceff1",
    "btn-gray-border" : "#546e7a",
    "btn-gray-hover-border" : "#78909c",
    "btn-gray-disabled-background" : "#b0bec5",
    "btn-gray-disabled-border" : "#90a4ae",
    "btn-gray-background" : "#78909c",
    "btn-gray-hover-color" : "#fff",
    "btn-gray-hover-background" : "#90a4ae",
    "btn-gray-active-border" : "#546e7a",
    "btn-gray-active-color" : "#cfd8dc",
    "btn-gray-active-background" : "#546e7a",    
    "btn-primary-border" : "#1e88e5",
    "btn-primary-hover-border" : "#42a5f5",
    "btn-primary-disabled-background" : "#90caf9",
    "btn-primary-disabled-border" : "#64b5f6",
    "btn-primary-color" : "#e3f2fd",
    "btn-primary-background" : "#42a5f5",
    "btn-primary-hover-color" : "#fff",
    "btn-primary-hover-background" : "#64b5f6",
    "btn-primary-active-border" : "#1e88e5",
    "btn-primary-active-color" : "#bbdefb",
    "btn-primary-active-background" : "#1e88e5",
    "btn-success-border" : "#43A047",
    "btn-success-hover-border" : "#66BB6A",
    "btn-success-disabled-background" : "#A5D6A7",
    "btn-success-disabled-border" : "#81C784",
    "btn-success-color" : "#E8F5E9",
    "btn-success-background" : "#66BB6A",
    "btn-success-hover-color" : "#fff",
    "btn-success-hover-background" : "#81C784",
    "btn-success-active-border" : "#43A047",
    "btn-success-active-color" : "#C8E6C9",
    "btn-success-active-background" : "#43A047",
    "btn-info-border" : "#00ACC1",
    "btn-info-hover-border" : "#26C6DA",
    "btn-info-disabled-background" : "#80DEEA",
    "btn-info-disabled-border" : "#4DD0E1",
    "btn-info-color" : "#E0F7FA",
    "btn-info-background" : "#26C6DA",
    "btn-info-hover-color" : "#fff",
    "btn-info-hover-background" : "#4DD0E1",
    "btn-info-active-border" : "#00ACC1",
    "btn-info-active-color" : "#B2EBF2",
    "btn-info-active-background" : "#00ACC1",
    "btn-warning-border" : "#FB8C00",
    "btn-warning-hover-border" : "#FFA726",
    "btn-warning-disabled-background" : "#FFCC80",
    "btn-warning-disabled-border" : "#FFB74D",
    "btn-warning-color" : "#FFF3E0",
    "btn-warning-background" : "#FFA726",
    "btn-warning-hover-color" : "#fff",
    "btn-warning-hover-background" : "#FFB74D",
    "btn-warning-active-border" : "#FB8C00",
    "btn-warning-active-color" : "#FFE0B2",
    "btn-warning-active-background" : "#FB8C00",
    "btn-danger-border" : "#F4511E",
    "btn-danger-hover-border" : "#FF7043",
    "btn-danger-disabled-background" : "#FFAB91",
    "btn-danger-disabled-border" : "#FF8A65",
    "btn-danger-color" : "#FBE9E7",
    "btn-danger-background" : "#FF7043",
    "btn-danger-hover-color" : "#fff",
    "btn-danger-hover-background" : "#FF8A65",
    "btn-danger-active-border" : "#F4511E",
    "btn-danger-active-color" : "#FFCCBC",
    "btn-danger-active-background" : "#F4511E",
    },
    "light": {
      "text-color" : "#000",
      "button-border" : "#cccccc",
      "content-color" : "#454545",
      "button-hover": "#208103",
              "select-box-shadow" : "#949696",
        "select-border-top" : "#fff",
        "body-background" : "#dfe2e2",
        "background-color" : "#e5e9e8",
        "background-color-hover" : "#eff1f1",
        "content-background" : "#e1e6e6",
        "border-focus" : "#0036ff",
        "background-highlight" : "#288edf",
        "background-highlight-hover" : "#4ca1e4",
        "select-background" : "#DDE1E1",
        "select-border-top" : "#fff",
        "input-background" : "#fff",
        "invalid-colour" : "#ec514e",
        "color-active" : "#0772c3",
        "color-hover" : "#29a0fa",
      }, "dark": {
        "text-color" : "#fff",
      "button-border" : "#6b6767",
      "select-box-shadow" : "#303233",
      "select-border-top" : "#666767",
        "content-color" : "#c6c8c8",
        "button-hover": "#208103",
        "body-background" : "#4b4d4e",
        "background-color" : "#595b5b",
        "background-color-hover" : "#288edf",
        "content-background" : "#444949",
        "border-focus" : "#0036ff",
        "background-highlight" : "#288edf",
        "background-highlight-hover" : "#4ca1e4",
        "select-background" : "#595B5B",
        "input-background" : "#454646",
        "invalid-colour" : "#ec514e",
        "color-active" : "#1e7dc8",
        "color-hover" : "#4ca1e4",
      }
    };
    function setTheme(name) {
    var theme = themes[name];
    var root = document.querySelector(':root');
    Object.keys(themes.common).forEach(function(key) {
        root.style.setProperty('--' + key, themes.common[key]);
    });
    Object.keys(theme).forEach(function(key){
        root.style.setProperty('--' + key, theme[key]);
    });
  }

  theme.onchange = function(e) { setTheme(e.target.checked ? "dark" : "light"); };

  theme.onclick = function(e) { 
    var field = document.getElementById("button-bar");
fieldvalue= field.value;
  };

  fileone.addEventListener( "change", function(e)	{
    var fileName = "";
    try {
      if (this.files && this.files.length > 1 )
        fileName = ( this.getAttribute( "data-multiple-caption" ) || "" ).replace( "{count}", this.files.length );
      else
        fileName = e.target.value.split( "\\" ).pop();
      
      if(fileName) {
        fileonelabel.querySelector( "span" ).innerHTML = fileName;
      } else {
        fileonelabel.innerHTML = labelVal;
      }
    } catch (err) {
      notifyError("Error", err);
    } finally {
      buttonGo();
    }
  });

  setTheme("dark");

  class Splitter{
    static pxToRem(pixelValue) {
      //document.documentElement is the reference to rem and not document.body
      // test with html {font-size: 18px} and body {font-size: 14px}, 1rem = 18px
      var fontSize = 1 / parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
      var newValue = pixelValue * fontSize;
      return newValue;
    }
  
    static dimToPx(elem, property) { //cf https://www.w3.org/TR/css-cascade-3/#computed
      var prop = window.getComputedStyle(elem, null).getPropertyValue(property);
      if (prop.slice(-2) === "px") {
        return parseInt(prop);
      } else if (prop.slice(-1) === "%") {
        let size = this._getDimension(elem.parentElement);
            
        return size * parseFloat(prop) / 100;
      } else {
        return 0; // -> none, auto, ...
      }
    }
  
    constructor(splitterId) {
      this.$elem = document.getElementById(splitterId);
      if (!this.$elem) return;
      this.$pane1 = document.getElementById(this.$elem.dataset.pane1);
      if (!this.$pane1) return;
      this.$pane2 = document.getElementById(this.$elem.dataset.pane2);
      if (!this.$pane2) return;    
      // instance variables
      // instance variables
      this.$isPane1Before = true;
      this.$isMoving = false;
      this.$drag = 0;
      this.$oldSize = 0; // used for toggle
      this.$maxSize = 0;  //limited by css max-xxx
      this.$minSize = 0; //limited by css min-xxx
      this.$totalSize = 0; // pane1+pane2 size
      //keyboard attributes
      this.$speedUp = 1;
      this.$maxSpeed = 20;
      //touch attributes
      this.$touchOrigin = 0;
      this.$threshold = 60; //required min distance traveled to be considered swipe
      this.$allowedTime = 300; // maximum time allowed to travel that distance
      this.$startTime = 0;
      
      // attributes
      this.$fixedPosition = this.$elem.dataset.position === "fixed";
      
      if (this.$elem.dataset.orientation !== "horizontal") {
        this.$orientation = "vertical";
        this.$cssOrient = "width";
        this.$mouseOrient = "clientX";
      } else {
        this.$orientation = "horizontal";
        this.$cssOrient = "height";
        this.$mouseOrient = "clientY";
      }
  
      if (this.$elem.dataset.unit !== "rem") 
        this.$unit = "px";
      else
        this.$unit = "rem";
      
      //initialisation
      // bind events
      this._onMouseDown = this._onMouseDown.bind(this);
      this._onMouseMove = this._onMouseMove.bind(this);
      this._onMouseUp = this._onMouseUp.bind(this);      
      this._onKeyDown = this._onKeyDown.bind(this);      
      this._onKeyUp = this._onKeyUp.bind(this);      
    this._onFocus = this._onFocus.bind(this);     
      if ('ontouchstart' in window) {
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
      }  
  
      this._addEvents();
        
      // init var for dimension calcul
      this._initDim(this.$pane1, this.$pane2);
  
      // init attributes
      this._setAttribute("role","separator");
  
      if (!this.$elem.hasAttribute('aria-labelled-by') && !this.$elem.hasAttribute("aria-label"))
        this._setAttribute("aria-label","Window splitter");
  
      this._setAttribute('tabindex', '0');
      this._setAttribute("aria-orientation",this.$orientation);
      this._setAttribute("aria-controls",this.$pane1.id);
      this._setAttribute("aria-valuemin",this._calcValue(this.$minSize));
      this._setAttribute("aria-valuenow",this._calcValue(this._getDimension(this.$pane1)));
      this._setAttribute("aria-valuemax",this._calcValue(this.$maxSize));
    }  
    
    // methods
    _setAttribute(attr,value) {
      this.$elem.setAttribute(attr, value);
    }
    
    _calcValue(value) {
      var total = this.$totalSize;
      if (total > 0) 
        return Math.round(value * 10000 / total)/100;
      else
        return 0;
    }
  
    _getDimension(elem) {
      return elem.getBoundingClientRect()[this.$cssOrient];
    }
  
    _setDimension(elem, dimension) {
      if(this.$unit === "rem")
        elem.style[this.$cssOrient] = Math.round(Splitter.pxToRem(dimension)*1000)/1000 + "rem"; // 3 significative digits max
      else
        elem.style[this.$cssOrient] = Math.round(dimension) + "px";
    }
  
    _setspeedUp() {
      if (this.$speedUp < this.$maxSpeed)
        this.$speedUp++;
    }
  
    _initDim(pane1, pane2) {
      this.$isPane1Before = (pane1.compareDocumentPosition(this.$elem) & Node.DOCUMENT_POSITION_FOLLOWING) ===  Node.DOCUMENT_POSITION_FOLLOWING;
      this.$totalSize = this._getDimension(pane1) + this._getDimension(pane2);
      this.$minSize = Splitter.dimToPx(pane1,`min-${this.$cssOrient}`);
      
      if (this.$fixedPosition) {
        this.$maxSize = this._getDimension(pane1);
      } else {
        var maxStyle = Splitter.dimToPx(pane1,`max-${this.$cssOrient}`);
        if (maxStyle === 0 || this.$totalSize <= maxStyle) {
          this.$maxSize = this.$totalSize;
        } else {
          this.$maxSize = maxStyle;
        }
      }
    }
  
    _setPane(delta) {
      let pane1 = this._getDimension(this.$pane1);
  
      if (this.$isPane1Before) {
      pane1 += delta;
    } else {
      pane1 -= delta;
    }
  
      if (pane1 >= this.$maxSize) {
        pane1 = this.$maxSize;
      } else if (pane1 <= this.$minSize) {
        pane1 = this.$minSize;
      }
    
      this._setDimension(this.$pane1, pane1);
        
      this._setAttribute("aria-valuenow",this._calcValue(pane1));
    }
      
    _keyArrow(increase) {
    this._setPane(increase * this.$speedUp);
      this._setspeedUp();
    }
  
    _removeEvents() {
      this.$elem.removeEventListener('mousedown',this._onMouseDown);
      window.removeEventListener('mouseup', this._onMouseUp);
      document.removeEventListener('keydown', this._onKeyDown);
      document.removeEventListener('keyup', this._onKeyUp);
      this.$elem.removeEventListener('focus', this._onFocus);
    
      if ('ontouchstart' in window) {
        this.$elem.removeEventListener('touchstart',this._onTouchStart,false);
        this.$elem.removeEventListener('touchend',this._onTouchEnd,false);
        this.$elem.removeEventListener('touchcancel',this._onTouchEnd,false);
      }      
    }
      
    _addEvents() {
      this.$elem.addEventListener('mousedown',this._onMouseDown);
      window.addEventListener('mouseup', this._onMouseUp);
      document.addEventListener('keydown', this._onKeyDown);
      document.addEventListener('keyup', this._onKeyUp);
      this.$elem.addEventListener('focus',this._onFocus);
    
      if ('ontouchstart' in window) {
        this.$elem.addEventListener('touchstart',this._onTouchStart, false);
        this.$elem.addEventListener('touchend',this._onTouchEnd, false);
        this.$elem.addEventListener('touchcancel',this._onTouchEnd, false);
      }      
    }    
    
    //events
    _onTouchStart(event) {
      event.preventDefault();
      this.$isMoving = true;
      this.$drag = event.targetTouches[0][this.$mouseOrient];
      this.$touchOrigin = this.$drag;
      this.$startTime = Date.now();
  
      if (!this.$fixedPosition)
        this._initDim(this.$pane1, this.$pane2);
      this.$elem.addEventListener('touchmove',this._onTouchMove);
    }
    
    _touchSwipe(event) {
      var delta = this.$drag - this.$touchOrigin;
      var elapsedTime = new Date().getTime() - this.$startTime;
      if (elapsedTime <= this.$allowedTime && Math.abs(delta) >= this.$threshold)
        return (delta < 0)? 'min' : 'max' ;
      else
        return "none";
    }  
    
    _onTouchEnd(event) {
      if (this.$isMoving === true) {
        event.preventDefault();
        let delta;
        var size = this._getDimension(this.$pane1);
        this.$elem.removeEventListener('touchmove',this._onTouchMove);
        
        var swipe = this._touchSwipe(event);
        if (swipe !== "none") {
          if (swipe === "min") { 
            delta = this.$minSize - size;
          } else if (swipe === "max") {
            delta = this.$maxSize - size;
          }
          this._setPane(delta);	  
        } else {
          if (this.$fixedPosition && (size !== this.$minSize || size !== this.$maxSize)) {
            if (size <= this.$maxSize/2) {
            delta = this.$minSize - size;
            } else {
              delta = this.$maxSize - size;
            }
            this._setPane(delta);
          }
        }
        this.$isMoving = false;
      }    
    }
  
    _onTouchMove(event) {
      event.preventDefault();
      var current = event.targetTouches[0][this.$mouseOrient];
      this._setPane(current - this.$drag);
      
      this.$drag = current;
    }
  
    _onMouseDown(event) {
      event.preventDefault();
      this.$isMoving = true;
      this.$drag = event[this.$mouseOrient];
    
      if (!this.$fixedPosition)
        this._initDim(this.$pane1, this.$pane2);
      document.addEventListener('mousemove',this._onMouseMove);
    }
    
    _onMouseUp(event) {
      if (this.$isMoving === true) {
        event.preventDefault();
        document.removeEventListener('mousemove',this._onMouseMove);
        var size = this._getDimension(this.$pane1);
        if (this.$fixedPosition && (size !== this.$minSize || size !== this.$maxSize)) {
      let delta;
          if (size <= this.$maxSize/2) {
        delta = this.$minSize - size;
          } else {
            delta = this.$maxSize - size;
          }
          this._setPane(delta);
        }
        this.$isMoving = false;
      }
    }
    
    _onMouseMove(event) {
      event.preventDefault();
      var current = event[this.$mouseOrient];
      this._setPane(current - this.$drag);
      this.$drag = current;
    }
  
    _onKeyDown(event) {
      if ((event.target !== this.$elem) || event.defaultPrevented || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey || event.OS)
        return; 
  
      switch (event.key) {
        case "Down": // IE/Edge specific value
       case "ArrowDown":
           if (!this.$fixedPosition && this.$orientation === "horizontal")
           this._keyArrow(1);
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          if (!this.$fixedPosition && this.$orientation === "vertical")
            this._keyArrow(1);
          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
          if (!this.$fixedPosition && this.$orientation === "horizontal")
            this._keyArrow(-1);
          break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          if (!this.$fixedPosition && this.$orientation === "vertical")
            this._keyArrow(-1);
          break;
        case "Enter":
          var size = this._getDimension(this.$pane1);
          if (Math.abs(size - this.$minSize) >= 1) { // relative unit is approximative
        this._setPane(this.$minSize - size);
            this.$oldSize = size;
          } else if (this.$oldSize !== 0) {
        this._setPane(this.$oldSize - this.$minSize);
            this.$oldSize=0;
          } 
          break;
        case "Home":
          this._setPane(this.$minSize - this._getDimension(this.$pane1));
          break;
        case "End":
          this._setPane(this.$maxSize - this._getDimension(this.$pane1));
      }
    }
      
    _onKeyUp(event) {
      if (event.target !== this.$elem)
        return;  
      this.$speedUp = 1;
    }
    
    _onFocus(event) {
      if (!this.$isMoving && !this.$fixedPosition)  //vs mouseDown
        this._initDim(this.$pane1, this.$pane2);
    }  
  }
  
  var splitterH = new Splitter("splitterH");
  var splitterV = new Splitter("splitterV");

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


