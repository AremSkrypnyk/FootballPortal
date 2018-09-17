define('component-loader', [], function() {
  return {
    // defualt css selector to grab components out of the dom
    cssSelector: '[data-component-name]',

    // init the component loader
    init: function(selector) {
      // override default selector if set
      if (selector) {
        this.cssSelector = selector;
      }

      this.addAnimationStartListener();
      this.initCss();
    },

    // ensure number strings are converted to proper numbers
    parseType: function(item) {
      if (!isNaN(parseInt(item, 10))) {
        item = parseInt(item, 10);
      }

      return item;
    },

    toCamelCase: function(string) {
      var attribute = '';

      string = string.replace(/^data-/i, '');
      string.split('-').forEach(function(chunk) {
        attribute += chunk.charAt(0).toUpperCase() + chunk.slice(1);
      });

      return attribute.charAt(0).toLowerCase() + attribute.slice(1);
    },

    callFunction: function(element, options) {
      // check that its defined in our config
      if (!window.requirejs.s.contexts._.config.paths[options.componentName]) {
        // console.log('component path not defined in requirejs config', options.componentName);
        return;
      }

      // use loaded component if available
      if (window.requirejs.defined(options.componentName)) {
        var component = window.requirejs.s.contexts._.defined[options.componentName];
        this.callComponent(component, element, options);
        return;
      }

      // otherwise load component
      window.requirejs([options.componentName], function(component) {
        this.callComponent(component, element, options);
      }.bind(this));
    },

    callComponent: function(component, element, options) {
      if (component) {
        if (typeof component === 'function') {
          component(element, options);
        } else if (typeof component === 'object' && component.init) {
          component.init(element, options);
        } else {
          console.error('component or component.init is not a function', options.componentName)
        }

        element.setAttribute('data-init', 'true');
      }
    },

    processElement: function(element) {
      // extract data attributes from element
      var nodemap = element.attributes;
      var options = {};

      for (var attr in nodemap) {
        var attribute = nodemap[attr].nodeName;
        var value = this.parseType(nodemap[attr].nodeValue);
        if (attribute && attribute.match(/^data-/)) {
          options[this.toCamelCase(attribute)] = value;
        }
      }

      // call function with the element and options
      this.callFunction(element, options);
    },

    addAnimationStartListener: function() {
      // add animation start event listener
      ['animationstart', 'webkitAnimationStart'].forEach(function(eventName) {

        document.addEventListener(eventName, function(e) {
          if (e.animationName === 'component-loader') {
            this.processElement(e.target);
          }

        }.bind(this));
      }.bind(this));
    },

    initCss: function() {
      //trigger loader by adding css to dom
      var style = document.createElement('style');

      style.textContent = [
        "@-webkit-keyframes component-loader {0%{outline:0}100%{outline:0 solid red}}",
        "@keyframes component-loader {0%{outline:0}100%{outline:0 solid red}}",
        this.cssSelector,
        ':not([data-init=true])',
        "{-webkit-animation: component-loader 0.01s;animation: component-loader 0.01s}"
      ].join('');

      document.querySelector('head').appendChild(style);
    }
  }
});
