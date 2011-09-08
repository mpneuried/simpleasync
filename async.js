(function() {
  var EventEmitter, SimpleAsync, fnTest, isServer, oExport, root, sa, test, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  root = this;
  isServer = false;
  if (typeof module !== 'undefined' && module.exports) {
    EventEmitter = require("events").EventEmitter;
    _ = require("underscore");
    isServer = true;
  } else {
    EventEmitter = (function() {
      function EventEmitter() {
        this.emit = __bind(this.emit, this);
        this.removeListener = __bind(this.removeListener, this);
        this.on = __bind(this.on, this);        this._events = this._events || {};
      }
      EventEmitter.prototype.on = function(event, fct) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
      };
      EventEmitter.prototype.removeListener = function(event, fct) {
        this._events = this._events || {};
        if (__indexOf.call(this._events, event) >= 0 === false) {
          return;
        }
        this._events[event].splice(this._events[event].indexOf(fct), 1);
      };
      EventEmitter.prototype.emit = function(event) {
        var eReceiver, i, _len, _ref;
        this._events = this._events || {};
        if (event in this._events === false) {
          return;
        }
        _ref = this._events[event];
        for (i = 0, _len = _ref.length; i < _len; i++) {
          eReceiver = _ref[i];
          eReceiver.apply(this, Array.prototype.slice.call(arguments, 1));
        }
      };
      return EventEmitter;
    })();
  }
  SimpleAsync = (function() {
    __extends(SimpleAsync, EventEmitter);
    function SimpleAsync(processing, options) {
      if (processing == null) {
        processing = {};
      }
      if (options == null) {
        options = {};
      }
      this.run = __bind(this.run, this);
      this.initProcessing = __bind(this.initProcessing, this);
      options.timeout || (options.timeout = 0);
      if (!_.isEmpty(processing)) {
        this.processing = _.clone(processing);
        this.initProcessing();
      }
    }
    SimpleAsync.prototype.initProcessing = function() {
      return this;
    };
    SimpleAsync.prototype.run = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
    };
    return SimpleAsync;
  })();
  oExport = SimpleAsync;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = oExport;
  } else {
    root.SimpleAsync = oExport;
  }
  fnTest = function(a, b, async) {
    var fn, res, time;
    console.log(async.results);
    res = a + b;
    time = Math.floor(Math.random() * 5000);
    fn = _.bind(async.callback, this, null, res);
    setTimeout(time, fn);
  };
  test = {
    a: _.bind(fnTest, this, 1, 2),
    b: _.bind(fnTest, this, 1, 2)
  };
  sa = new SimpleAsync(test);
  sa.run(function(err, res) {
    return console.log("RES", arguments);
  });
}).call(this);
