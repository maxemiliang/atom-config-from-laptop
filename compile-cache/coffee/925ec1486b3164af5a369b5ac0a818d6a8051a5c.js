(function() {
  var BlendModes, Color, ColorContext, ColorExpression, ColorParser, SVGColors, clamp, clampInt, comma, float, floatOrPercent, hexadecimal, int, intOrPercent, namePrefixes, notQuote, optionalPercent, path, pe, percent, ps, split, variables, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  path = require('path');

  Color = require('./color');

  ColorParser = null;

  ColorExpression = require('./color-expression');

  SVGColors = require('./svg-colors');

  BlendModes = require('./blend-modes');

  _ref = require('./utils'), split = _ref.split, clamp = _ref.clamp, clampInt = _ref.clampInt;

  _ref1 = require('./regexes'), int = _ref1.int, float = _ref1.float, percent = _ref1.percent, optionalPercent = _ref1.optionalPercent, intOrPercent = _ref1.intOrPercent, floatOrPercent = _ref1.floatOrPercent, comma = _ref1.comma, notQuote = _ref1.notQuote, hexadecimal = _ref1.hexadecimal, ps = _ref1.ps, pe = _ref1.pe, variables = _ref1.variables, namePrefixes = _ref1.namePrefixes;

  module.exports = ColorContext = (function() {
    function ColorContext(options) {
      var colorVariables, expr, sorted, v, _i, _j, _len, _len1, _ref2, _ref3;
      if (options == null) {
        options = {};
      }
      this.sortPaths = __bind(this.sortPaths, this);
      variables = options.variables, colorVariables = options.colorVariables, this.referenceVariable = options.referenceVariable, this.referencePath = options.referencePath, this.rootPaths = options.rootPaths, this.parser = options.parser, this.colorVars = options.colorVars, this.vars = options.vars, this.defaultVars = options.defaultVars, this.defaultColorVars = options.defaultColorVars, sorted = options.sorted, this.registry = options.registry;
      if (variables == null) {
        variables = [];
      }
      if (colorVariables == null) {
        colorVariables = [];
      }
      if (this.rootPaths == null) {
        this.rootPaths = [];
      }
      if (this.referenceVariable != null) {
        if (this.referencePath == null) {
          this.referencePath = this.referenceVariable.path;
        }
      }
      if (this.sorted) {
        this.variables = variables;
        this.colorVariables = colorVariables;
      } else {
        this.variables = variables.slice().sort(this.sortPaths);
        this.colorVariables = colorVariables.slice().sort(this.sortPaths);
      }
      if (this.vars == null) {
        this.vars = {};
        this.colorVars = {};
        this.defaultVars = {};
        this.defaultColorVars = {};
        _ref2 = this.variables;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          v = _ref2[_i];
          this.vars[v.name] = v;
          if (v.path.match(/\/.pigments$/)) {
            this.defaultVars[v.name] = v;
          }
        }
        _ref3 = this.colorVariables;
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          v = _ref3[_j];
          this.colorVars[v.name] = v;
          if (v.path.match(/\/.pigments$/)) {
            this.defaultColorVars[v.name] = v;
          }
        }
      }
      if ((this.registry.getExpression('pigments:variables') == null) && this.colorVariables.length > 0) {
        expr = ColorExpression.colorExpressionForColorVariables(this.colorVariables);
        this.registry.addExpression(expr);
      }
      if (this.parser == null) {
        ColorParser = require('./color-parser');
        this.parser = new ColorParser(this.registry, this);
      }
      this.usedVariables = [];
    }

    ColorContext.prototype.sortPaths = function(a, b) {
      var rootA, rootB, rootReference;
      if (this.referencePath != null) {
        if (a.path === b.path) {
          return 0;
        }
        if (a.path === this.referencePath) {
          return 1;
        }
        if (b.path === this.referencePath) {
          return -1;
        }
        rootReference = this.rootPathForPath(this.referencePath);
        rootA = this.rootPathForPath(a.path);
        rootB = this.rootPathForPath(b.path);
        if (rootA === rootB) {
          return 0;
        }
        if (rootA === rootReference) {
          return 1;
        }
        if (rootB === rootReference) {
          return -1;
        }
        return 0;
      } else {
        return 0;
      }
    };

    ColorContext.prototype.rootPathForPath = function(path) {
      var root, _i, _len, _ref2;
      _ref2 = this.rootPaths;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        root = _ref2[_i];
        if (path.indexOf("" + root + "/") === 0) {
          return root;
        }
      }
    };

    ColorContext.prototype.clone = function() {
      return new ColorContext({
        variables: this.variables,
        colorVariables: this.colorVariables,
        referenceVariable: this.referenceVariable,
        parser: this.parser,
        vars: this.vars,
        colorVars: this.colorVars,
        defaultVars: this.defaultVars,
        defaultColorVars: this.defaultColorVars,
        sorted: true
      });
    };

    ColorContext.prototype.containsVariable = function(variableName) {
      return __indexOf.call(this.getVariablesNames(), variableName) >= 0;
    };

    ColorContext.prototype.hasColorVariables = function() {
      return this.colorVariables.length > 0;
    };

    ColorContext.prototype.getVariables = function() {
      return this.variables;
    };

    ColorContext.prototype.getColorVariables = function() {
      return this.colorVariables;
    };

    ColorContext.prototype.getVariablesNames = function() {
      return this.varNames != null ? this.varNames : this.varNames = Object.keys(this.vars);
    };

    ColorContext.prototype.getVariablesCount = function() {
      return this.varCount != null ? this.varCount : this.varCount = this.getVariablesNames().length;
    };

    ColorContext.prototype.readUsedVariables = function() {
      var usedVariables, v, _i, _len, _ref2;
      usedVariables = [];
      _ref2 = this.usedVariables;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        v = _ref2[_i];
        if (__indexOf.call(usedVariables, v) < 0) {
          usedVariables.push(v);
        }
      }
      this.usedVariables = [];
      return usedVariables;
    };

    ColorContext.prototype.getValue = function(value) {
      var lastRealValue, realValue, _ref2, _ref3;
      _ref2 = [], realValue = _ref2[0], lastRealValue = _ref2[1];
      while (realValue = (_ref3 = this.vars[value]) != null ? _ref3.value : void 0) {
        this.usedVariables.push(value);
        value = lastRealValue = realValue;
      }
      return lastRealValue;
    };

    ColorContext.prototype.getColorValue = function(value) {
      var lastRealValue, realValue, _ref2, _ref3;
      _ref2 = [], realValue = _ref2[0], lastRealValue = _ref2[1];
      while (realValue = (_ref3 = this.colorVars[value]) != null ? _ref3.value : void 0) {
        this.usedVariables.push(value);
        value = lastRealValue = realValue;
      }
      return lastRealValue;
    };

    ColorContext.prototype.readColorExpression = function(value) {
      if (this.colorVars[value] != null) {
        this.usedVariables.push(value);
        return this.colorVars[value].value;
      } else {
        return value;
      }
    };

    ColorContext.prototype.readColor = function(value, keepAllVariables) {
      var realValue, result, scope, _ref2;
      if (keepAllVariables == null) {
        keepAllVariables = false;
      }
      realValue = this.readColorExpression(value);
      if (realValue == null) {
        return;
      }
      scope = this.colorVars[value] != null ? path.extname(this.colorVars[value].path) : '*';
      result = this.parser.parse(realValue, scope, false);
      if (result != null) {
        if (result.invalid && (this.defaultColorVars[realValue] != null)) {
          this.usedVariables.push(realValue);
          result = this.readColor(this.defaultColorVars[realValue].value);
          value = realValue;
        }
      } else if (this.defaultColorVars[value] != null) {
        this.usedVariables.push(value);
        result = this.readColor(this.defaultColorVars[value].value);
      } else {
        if (this.vars[value] != null) {
          this.usedVariables.push(value);
        }
      }
      if ((result != null) && (keepAllVariables || __indexOf.call(this.usedVariables, value) < 0)) {
        result.variables = ((_ref2 = result.variables) != null ? _ref2 : []).concat(this.readUsedVariables());
      }
      return result;
    };

    ColorContext.prototype.readFloat = function(value) {
      var res;
      res = parseFloat(value);
      if (isNaN(res) && (this.vars[value] != null)) {
        this.usedVariables.push(value);
        res = this.readFloat(this.vars[value].value);
      }
      if (isNaN(res) && (this.defaultVars[value] != null)) {
        this.usedVariables.push(value);
        res = this.readFloat(this.defaultVars[value].value);
      }
      return res;
    };

    ColorContext.prototype.readInt = function(value, base) {
      var res;
      if (base == null) {
        base = 10;
      }
      res = parseInt(value, base);
      if (isNaN(res) && (this.vars[value] != null)) {
        this.usedVariables.push(value);
        res = this.readInt(this.vars[value].value);
      }
      if (isNaN(res) && (this.defaultVars[value] != null)) {
        this.usedVariables.push(value);
        res = this.readInt(this.defaultVars[value].value);
      }
      return res;
    };

    ColorContext.prototype.readPercent = function(value) {
      if (!/\d+/.test(value) && (this.vars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readPercent(this.vars[value].value);
      }
      if (!/\d+/.test(value) && (this.defaultVars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readPercent(this.defaultVars[value].value);
      }
      return Math.round(parseFloat(value) * 2.55);
    };

    ColorContext.prototype.readIntOrPercent = function(value) {
      var res;
      if (!/\d+/.test(value) && (this.vars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readIntOrPercent(this.vars[value].value);
      }
      if (!/\d+/.test(value) && (this.defaultVars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readIntOrPercent(this.defaultVars[value].value);
      }
      if (value == null) {
        return NaN;
      }
      if (typeof value === 'number') {
        return value;
      }
      if (value.indexOf('%') !== -1) {
        res = Math.round(parseFloat(value) * 2.55);
      } else {
        res = parseInt(value);
      }
      return res;
    };

    ColorContext.prototype.readFloatOrPercent = function(value) {
      var res;
      if (!/\d+/.test(value) && (this.vars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readFloatOrPercent(this.vars[value].value);
      }
      if (!/\d+/.test(value) && (this.defaultVars[value] != null)) {
        this.usedVariables.push(value);
        value = this.readFloatOrPercent(this.defaultVars[value].value);
      }
      if (value == null) {
        return NaN;
      }
      if (typeof value === 'number') {
        return value;
      }
      if (value.indexOf('%') !== -1) {
        res = parseFloat(value) / 100;
      } else {
        res = parseFloat(value);
        if (res > 1) {
          res = res / 100;
        }
        res;
      }
      return res;
    };

    ColorContext.prototype.SVGColors = SVGColors;

    ColorContext.prototype.Color = Color;

    ColorContext.prototype.BlendModes = BlendModes;

    ColorContext.prototype.split = function(value) {
      return split(value);
    };

    ColorContext.prototype.clamp = function(value) {
      return clamp(value);
    };

    ColorContext.prototype.clampInt = function(value) {
      return clampInt(value);
    };

    ColorContext.prototype.isInvalid = function(color) {
      return !(color != null ? color.isValid() : void 0);
    };

    ColorContext.prototype.readParam = function(param, block) {
      var name, re, value, _, _ref2;
      re = RegExp("\\$(\\w+):\\s*((-?" + this.float + ")|" + this.variablesRE + ")");
      if (re.test(param)) {
        _ref2 = re.exec(param), _ = _ref2[0], name = _ref2[1], value = _ref2[2];
        return block(name, value);
      }
    };

    ColorContext.prototype.contrast = function(base, dark, light, threshold) {
      var _ref2;
      if (dark == null) {
        dark = new Color('black');
      }
      if (light == null) {
        light = new Color('white');
      }
      if (threshold == null) {
        threshold = 0.43;
      }
      if (dark.luma > light.luma) {
        _ref2 = [dark, light], light = _ref2[0], dark = _ref2[1];
      }
      if (base.luma > threshold) {
        return dark;
      } else {
        return light;
      }
    };

    ColorContext.prototype.mixColors = function(color1, color2, amount, round) {
      var color, inverse;
      if (amount == null) {
        amount = 0.5;
      }
      if (round == null) {
        round = Math.floor;
      }
      inverse = 1 - amount;
      color = new Color;
      color.rgba = [round(color1.red * amount + color2.red * inverse), round(color1.green * amount + color2.green * inverse), round(color1.blue * amount + color2.blue * inverse), color1.alpha * amount + color2.alpha * inverse];
      return color;
    };

    ColorContext.prototype.int = int;

    ColorContext.prototype.float = float;

    ColorContext.prototype.percent = percent;

    ColorContext.prototype.optionalPercent = optionalPercent;

    ColorContext.prototype.intOrPercent = intOrPercent;

    ColorContext.prototype.floatOrPercent = floatOrPercent;

    ColorContext.prototype.comma = comma;

    ColorContext.prototype.notQuote = notQuote;

    ColorContext.prototype.hexadecimal = hexadecimal;

    ColorContext.prototype.ps = ps;

    ColorContext.prototype.pe = pe;

    ColorContext.prototype.variablesRE = variables;

    ColorContext.prototype.namePrefixes = namePrefixes;

    return ColorContext;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9jb2xvci1jb250ZXh0LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxzUEFBQTtJQUFBO3lKQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQURSLENBQUE7O0FBQUEsRUFFQSxXQUFBLEdBQWMsSUFGZCxDQUFBOztBQUFBLEVBR0EsZUFBQSxHQUFrQixPQUFBLENBQVEsb0JBQVIsQ0FIbEIsQ0FBQTs7QUFBQSxFQUlBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUpaLENBQUE7O0FBQUEsRUFLQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FMYixDQUFBOztBQUFBLEVBTUEsT0FBMkIsT0FBQSxDQUFRLFNBQVIsQ0FBM0IsRUFBQyxhQUFBLEtBQUQsRUFBUSxhQUFBLEtBQVIsRUFBZSxnQkFBQSxRQU5mLENBQUE7O0FBQUEsRUFPQSxRQWNJLE9BQUEsQ0FBUSxXQUFSLENBZEosRUFDRSxZQUFBLEdBREYsRUFFRSxjQUFBLEtBRkYsRUFHRSxnQkFBQSxPQUhGLEVBSUUsd0JBQUEsZUFKRixFQUtFLHFCQUFBLFlBTEYsRUFNRSx1QkFBQSxjQU5GLEVBT0UsY0FBQSxLQVBGLEVBUUUsaUJBQUEsUUFSRixFQVNFLG9CQUFBLFdBVEYsRUFVRSxXQUFBLEVBVkYsRUFXRSxXQUFBLEVBWEYsRUFZRSxrQkFBQSxTQVpGLEVBYUUscUJBQUEsWUFwQkYsQ0FBQTs7QUFBQSxFQXVCQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ1MsSUFBQSxzQkFBQyxPQUFELEdBQUE7QUFDWCxVQUFBLGtFQUFBOztRQURZLFVBQVE7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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/color-context.coffee
