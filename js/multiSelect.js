class PatromMultiSelect {
	constructor(select) {
		this.select = select;
		this.select.multiple = true;
		this.select.style.display = 'none';
		this.settings = this._getSettings(select);
		this.select.datas = {};
		var prefix = 'patrom-';
		this.class = {
			prefix: prefix + 'multi-select',
			rootContainer: prefix + 'multi-select-container',
			logger: 'logger',
			list: prefix + 'multi-select'
		};
		this.data = {};
		this.create();
		this.log();
	}
	_getSettings(element) {
		var settings = {};
		var defaultSettings = {
			width: this._setpixel(element.width || '250px'),
			height: themes.common["font-size+2"],
			appendTo: '__auto__',
			className: '',
			placeholder: element.placeholder || '',
			selectAll: element.attributes["selectall"] ? true : false,
			orderby: element.attributes["orderby"] ? true : false,
		};

		var defaultSettingsKeys = Object.keys(defaultSettings);
		var i, attr, defaultSettingsKeyslen = defaultSettingsKeys.length;
		for (i = 0; i < defaultSettingsKeyslen; i++) {
			attr = defaultSettingsKeys[i];

			if (attr && settings[attr] !== undefined) continue;
			settings[attr] = defaultSettings[attr];
		}
		return settings;
	}
	_setpixel(value) {
		if (!value) {
			return;
		}
		// Here value has string return the value, otherwise px will be added.
		return isNaN(value) ? value : value + 'px';
	}
	_getTarget(appendTo) {
		var target;
		if (appendTo == '__auto__' && this.select.parentElement) {
			target = this.select.parentElement;
		} else {
			target = document.querySelector(this.settings.appendTo);
		}
		return target;
	}
	create() {
		var self = this;
		var addTarget = this._getTarget(this.settings.appendTo);
		var div = document.createElement('DIV');
		div.className = this.class.rootContainer;
		div.classList.add("full");
		div.id = this.class.prefix + (document.querySelectorAll('.' + this.class.rootContainer).length + 1);
		this._getThemeElements(div);
		// Creating common elements for both themes here.
		this._getCommonElems(div);

		this.container = div;
		if (addTarget.contains(this.select)) {
			addTarget.insertBefore(div, this.select);
		} else {
			addTarget.appendChild(div);
		}

		// add event
		document.addEventListener('click', function(event) {
			var theme2Specific = event.target.className === 'closeBtn';
			self.list.classList.add("scrollbar-width-thin");
			if (self.container.contains(event.target) || theme2Specific) {
				return;
			}
			self.list.classList.add('hidden');
			self.logger.classList.remove('open');
		});

	}
	setValue(selected = [], trigger) {
		if (!selected.length) return;

		var selectChildrenLen = this.select.children.length,
			selectedLen = selected.length,
			selectChild, listChild, selectedIndex, list;
		list = this._getSearchableLi(this.list);
		var i, j;

		for (i = 0; i < selectChildrenLen; i++) {
			for (j = 0; j < selected.length; j++) {
				selectChild = this.select.children[i];
				selectedIndex = selected[j];

				// TODO: need to change != to !==.
				if (selectChild.value != selectedIndex) continue;

				selectChild.selected = true;
				listChild = list[i];
				if (this.settings.orderby === true) selectChild.setAttribute("orderBy", listChild.children[0].getAttribute("order"));
				listChild.children[0].checked = true;
				listChild.classList.add('active');
				this.data[i] = true;
				//onchange trigger
				if (trigger) {
					if (typeof this.settings.onChange == 'function') {
						this.settings.onChange(true, selectChild.value, this);
					}
				}
				break;
			}
		}
		this.log();
	}
	removeValue(selected = [], trigger = false) {
		if (!selected.length) return;

		var selectChildrenLen = this.select.children.length,
			selectedLen = selected.length,
			selectChild, listChild, selectedIndex, list;
		list = this._getSearchableLi(this.list);
		var i, j;

		for (i = 0; i < selectChildrenLen; i++) {
			for (j = 0; j < selectedLen; j++) {
				selectChild = this.select.children[i];
				selectedIndex = selected[j];
				if (selectChild.value != selectedIndex) continue;

				selectChild.selected = false;
				listChild = list[i];
				listChild.children[0].checked = false;
				listChild.classList.remove('active');
				this.data[i] = false;
				//onchange trigger
				if (trigger) {
					if (typeof this.settings.onChange == 'function') {
						this.settings.onChange(false, selectChild.value, this);
					}
				}
				break;
			}
		}
		this.log();
	}
	log() {
      var self = this;
      var logger = self.logger;
      logger.innerHTML = '';
  
      var i, option = '',
        selectedOptions = '',
        selectedLabels, closeBtn;
      var loop_length = this.select.children.length;
  
      for (i = 0; i < loop_length; i++) {
        option = this.select.children[i];
        if (!this.data[i]) {
          continue;
        }
  
        selectedLabels = document.createElement('label');
        selectedLabels.className = 'selectedLabels';
        selectedLabels.innerHTML = option.innerText;
  
        closeBtn = document.createElement('span');
        closeBtn.className = 'closeBtn';
        closeBtn.innerHTML = '&#10005;';
        closeBtn.dataset.id = option.value;
  
        closeBtn.addEventListener('click', function(event) {
          event.stopPropagation();
          self.removeValue([event.target.dataset.id], true);
        });
  
        selectedLabels.appendChild(closeBtn);
        logger.appendChild(selectedLabels);
  
        selectedOptions += selectedOptions ? ',' + option.innerText : option.innerText;
      }
      this.logger.dataset.value = selectedOptions;
    
	}
	getData() {
		var data = [];
		var i, selectChildrenLen = this.select.children.length;		
		for (i = 0; i < selectChildrenLen; i++) {
			if (!this.select.children[i].selected) {
				continue;
			}
			data.push(this.settings.orderby === true ? `${this.select.children[i].value}${this.select.children[i].attributes && this.select.children[i].attributes.orderby && this.select.children[i].attributes.orderby.value ? ' ' + this.select.children[i].attributes.orderby.value : ''}` : this.select.children[i].value);
		}

		return data;
	}
	selectAll(isSetValue = false) {
		var data = [];
		var i, selectedChildren, selectChildrenLen;
		selectedChildren = this.list.querySelectorAll('label:not(.hidden) li:not(.ignore) input');
		selectChildrenLen = selectedChildren.length;

		for (i = 0; i < selectChildrenLen; i++) {
			data.push(selectedChildren[i].value);
		}

		isSetValue ? this.setValue(data) : this.removeValue(data);
		//callback
		if (typeof this.settings.afterSelectAll == 'function') {
			this.settings.afterSelectAll(isSetValue, data, this);
		}
	}
	loadSourceArray(data = []) {
		if (data.length) {
			this.select.innerHTML = '';
			var i, dataLen = data.length,
				option, datum;

			for (i = 0; i < dataLen; i++) {
				option = document.createElement('OPTION');
				option.value = data[i];
				option.innerHTML = data[i];
				option.selected = false;
				this.select.appendChild(option);
			}
			this.reload();
		}
	}
	loadSource(data = []) {
		if (data.length) {
			this.select.innerHTML = '';
			var i, dataLen = data.length,
				option, datum;

			for (i = 0; i < dataLen; i++) {
				datum = data[i];
				option = document.createElement('OPTION');
				option.value = datum.value;
				option.innerHTML = datum.caption;
				option.selected = datum.selected;
				this.select.appendChild(option);
			}
			this.reload();
		}
	}
	getSource() {
		var data = [],
			children = this.select.children;
		var childrenLen = children.length,
			i, child;

		for (i = 0; i < childrenLen; i++) {
			child = children[i];
			data.push({
				value: child.value,
				caption: child.innerText,
				selected: child.selected
			});
		}
		return data;
	}
	reload() {
		this.container.remove();
		this.create();
	}
	_showAllOptions() {
		if (this.list.classList.contains('hidden')) {
			this.list.classList.remove('hidden');
		}
		var options = this._getSearchableLi(this.list);

		var i, optionsLen = options.length;
		for (i = 0; i < optionsLen; i++) {
			options[i].parentElement.classList.remove('hidden');
		}

	}
	_createButon(name) {
		var btn = document.createElement("button");
		btn.type = "button";
		btn.classList.add("buttonMini-" + name);
		btn.innerHTML = name;
		return btn;
	}

	_getCommonElems(wrapper) {
		var self = this;
		var ul, li, label, input, caption;
		var i, selectChild, selectChildrenLen = this.select.children.length;

		ul = document.createElement('UL');
		ul.className = this.class.list;
		ul.classList.add((this.settings.orderby === true)  ? "orderby" : "checked");
		ul.style.width = this.settings.width;
		ul.classList.add('hidden');

		if (this.settings.selectAll) {
			label = document.createElement("label");
			li = document.createElement("LI");
			li.classList.add("ignore");

			if (this.settings.orderby === true) {
				var buttonClear = this._createButon('clear');
				buttonClear.addEventListener('click', function() {
					self.selectAll(false);
				});
				li.appendChild(buttonClear);
			} else {
				var buttonAll = this._createButon('all');

				var buttonNone = this._createButon('none');

				buttonAll.addEventListener('click', function() {
					self.selectAll(true);
				});
				buttonNone.addEventListener('click', function() {
					self.selectAll(false);
				});

				li.appendChild(buttonAll);
				li.appendChild(buttonNone);
			}
			label.appendChild(li);
			ul.appendChild(label);
		}

		for (i = 0; i < selectChildrenLen; i++) {
			selectChild = this.select.children[i];
			label = document.createElement('label');
			li = document.createElement('LI');
			input = document.createElement('input');
			input.type = 'checkbox';
			if (this.settings.orderby === true) {
				input.classList.add("orderby");
				input.setAttribute("order", "none");
			}
			input.value = selectChild.value;

			caption = document.createTextNode(selectChild.innerText);
			if (this.settings.orderby === true) {

				input.addEventListener('click', function() {
					switch (this.getAttribute("order")) {
						case "none":
							this.setAttribute("order", "asc");
							break;
						case "asc":
							this.setAttribute("order", "desc");
							break;
						case "desc":
							this.setAttribute("order", "asc");
							break;
						default:
							this.setAttribute("order", "nono");
							break;
					}
					self.setValue([this.value]);


					if (typeof self.settings.onChange == 'function') {
						self.settings.onChange(this.checked, this.value, self);
					}
				});
			} else {
				input.addEventListener('click', function(label) {
					this.checked ? self.setValue([this.value]) : self.removeValue([this.value]);
					if (typeof self.settings.onChange == 'function') {
						self.settings.onChange(this.checked, this.value, self);
					}
				});

			}
			li.appendChild(input);
			li.appendChild(caption);

			li.className = selectChild.selected ? 'active' : '';
			input.checked = selectChild.selected;
			this.data[i] = selectChild.selected;
			label.appendChild(li);
			ul.appendChild(label);
		}

		wrapper.appendChild(ul);
		this.list = ul;
	}
	_getSearchableLi(ul) {
		return ul.querySelectorAll('li:not([class*=ignore])');
	}
	_getLi(ul, selector = 'label') {
		return ul.querySelectorAll(selector);
	}
	_getThemeElements(wrapper) {
		var logger = document.createElement('span');
		this._setLogger(logger);
		wrapper.appendChild(logger);
	}
	_setLogger(elem) {
		var self = this;
		elem.style.width = this.settings.width;
		elem.style.height = this.settings.height;
		elem.className = this.class.logger;
		this.logger = elem;

		elem.addEventListener('click', function() {
			self.list.classList.toggle('hidden');
			self.logger.classList.toggle('open');
		});
	}

}

var multiSelects = {};
	Array.prototype.forEach.call(document.getElementsByClassName("patrom-multiselect"), function(el) {
	multiSelects[el.id] = new PatromMultiSelect(el);
});