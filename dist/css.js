const themes = {
        "light": {
        "font-size" : "14px",
        "body-background" : "#dfe2e2",
        "text-color" : "#000",
        "content-color" : "#454545",
        "button-box-shadow" : "#fff",
        "background-color" : "#e5e9e8",
        "button-border-color" : "#9daca9",
        "background-color-hover" : "#eff1f1",
        "border-blue" : "#0036ff",
        "box-shadow-blue" : "#6fb5f1",
        "background-color-cta" : "#288edf",
        "button-border-color-cta" : "#134f7f",
        "background-color-cta-active" : "#1e7dc8",
        "background-color-cta-hover" : "#4ca1e4",
        "button-text-shadow" : "#fff",
        "button-background-color" : "#d2d6d6",    
        "box-shadow" : "rgba(255,255,255,0.36)",
        "box-shadow-active" : "rgba(0,0,0,0.12)",
        "select-background" : "#DDE1E1",
        "select-box-shadow" : "#949696",
        "select-border-top" : "#fff",
        "select-text-shadow" : "#FFF",
        "text-shadow" : "rgba(0,0,0,0.36)",
        "input-shadow" : "rgba(0a,0,0,0.23)",
        "button-background-shadow" : "rgba(0,0,0,0.1)",
        "input-background" : "#fff",
        "invalid-colour" : "#ec514e",
        "primary": "#2ea0eb",
        "primary-focus": "#1487d2",
        "primary-active": "#1069a3",
        "secondary": "#5e5e5e",
        "secondary-focus": "#5e5e5e70",
        "secondary-active": "#444444",
        "success": "#89d085",
        "success-focus": "#65c260",
        "success-active": "#48ad42",
        "warning": "#f29a4e",
        "warning-focus": "#ef7f1e",
        "warning-active": "#cb660f",
        "danger": "#fa5757",
        "danger-focus": "#f92525",
        "danger-active": "#e40707",
        "color-active" : "#0772c3",
        "color-hover" : "#29a0fa",
      }, "dark": {
        "font-size" : "14px",
        "body-background" : "#4b4d4e",
        "background-color-hover" : "#626465",
        "text-color" : "#fff",
        "content-color" : "#c6c8c8",
        "button-box-shadow" : "#737373",
        "background-color" : "#595b5b",
        "button-border-color" : "#333434",
        "button-border-color" : "#333434",
        "select-background" : "#595B5B",
        "select-box-shadow" : "#303233",
        "select-border-top" : "#666767",
        "select-text-shadow" : "#000",
        "border-blue" : "#0036ff",
        "box-shadow-blue" : "#6fb5f1",
        "background-color-cta" : "#288edf",
        "button-border-color-cta" : "#134f7f",
        "background-color-cta-active" : "#1e7dc8",
        "background-color-cta-hover" : "#4ca1e4",
        "button-text-shadow" : "#rgba(0,0,0,0.69)",
        "button-background-color" : "#3f4041",
        "input-background" : "#454646",
        "box-shadow" : "rgba(255,255,255,0.36)",
        "box-shadow-active" : "rgba(0o,0,0,0.12)",
        "text-shadow" : "rgba(0,0,0,0.36)",
        "input-shadow" : "rgba(0a,0,0,0.23)",
        "button-background-shadow" : "rgba(0,0,0,0.05)",
        "invalid-colour" : "#ec514e",
        "color-active" : "#1e7dc8",
        "color-hover" : "#4ca1e4",
        "primary": "#2ea0eb",
        "primary-focus": "#1487d2",
        "primary-active": "#1069a3",
        "secondary": "#5e5e5e",
        "secondary-focus": "#5e5e5e70",
        "secondary-active": "#444444",
        "success": "#89d085",
        "success-focus": "#65c260",
        "success-active": "#48ad42",
        "warning": "#f29a4e",
        "warning-focus": "#ef7f1e",
        "warning-active": "#cb660f",
        "danger": "#fa5757",
        "danger-focus": "#f92525",
        "danger-active": "#e40707",
      }
    };
  const setTheme = (name) => {
    const theme = themes[name];
    const root = document.querySelector(':root');
    Object.keys(theme).forEach(key => {
        root.style.setProperty('--' + key, theme[key]);
    });
  };
  theme.onchange = function(e) { setTheme(e.target.checked ? "dark" : "light"); };

  setTheme("dark");
  
  console.clear();

  class Splitter{
    static pxToRem(pixelValue) {
      //document.documentElement is the reference to rem and not document.body
      // test with html {font-size: 18px} and body {font-size: 14px}, 1rem = 18px
      const fontSize = 1 / parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('font-size'));
      const newValue = pixelValue * fontSize;
      return newValue;
    }
  
    static dimToPx(elem, property) { //cf https://www.w3.org/TR/css-cascade-3/#computed
      const prop = window.getComputedStyle(elem, null).getPropertyValue(property);
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
      this.$pane1 = document.getElementById(this.$elem.dataset.pane1);
      this.$pane2 = document.getElementById(this.$elem.dataset.pane2);
  
      if (!this.$elem || !this.$pane1 || !this.$pane2) return;
  
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
      const total = this.$totalSize;
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
        const maxStyle = Splitter.dimToPx(pane1,`max-${this.$cssOrient}`);
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
      const delta = this.$drag - this.$touchOrigin;
      const elapsedTime = new Date().getTime() - this.$startTime;
      if (elapsedTime <= this.$allowedTime && Math.abs(delta) >= this.$threshold)
        return (delta < 0)? 'min' : 'max' ;
      else
        return "none";
    }  
    
    _onTouchEnd(event) {
      if (this.$isMoving === true) {
        event.preventDefault();
        let delta;
        const size = this._getDimension(this.$pane1);
        this.$elem.removeEventListener('touchmove',this._onTouchMove);
        
        const swipe = this._touchSwipe(event);
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
      const current = event.targetTouches[0][this.$mouseOrient];
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
        const size = this._getDimension(this.$pane1);
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
      const current = event[this.$mouseOrient];
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
          const size = this._getDimension(this.$pane1);
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