(function() {
  var Color, ColorExpression, createVariableRegExpString;

  Color = require('./color');

  createVariableRegExpString = require('./regexes').createVariableRegExpString;

  module.exports = ColorExpression = (function() {
    ColorExpression.colorExpressionForContext = function(context) {
      return this.colorExpressionForColorVariables(context.getColorVariables());
    };

    ColorExpression.colorExpressionRegexpForColorVariables = function(colorVariables) {
      return createVariableRegExpString(colorVariables);
    };

    ColorExpression.colorExpressionForColorVariables = function(colorVariables) {
      var paletteRegexpString;
      paletteRegexpString = this.colorExpressionRegexpForColorVariables(colorVariables);
      return new ColorExpression({
        name: 'pigments:variables',
        regexpString: paletteRegexpString,
        scopes: ['*'],
        priority: 1,
        handle: function(match, expression, context) {
          var baseColor, name, _;
          _ = match[0], name = match[1];
          if (context.readColorExpression(name) === name) {
            return this.invalid = true;
          }
          baseColor = context.readColor(name);
          this.colorExpression = name;
          this.variables = baseColor != null ? baseColor.variables : void 0;
          if (context.isInvalid(baseColor)) {
            return this.invalid = true;
          }
          return this.rgba = baseColor.rgba;
        }
      });
    };

    function ColorExpression(_arg) {
      this.name = _arg.name, this.regexpString = _arg.regexpString, this.scopes = _arg.scopes, this.priority = _arg.priority, this.handle = _arg.handle;
      this.regexp = new RegExp("^" + this.regexpString + "$");
    }

    ColorExpression.prototype.match = function(expression) {
      return this.regexp.test(expression);
    };

    ColorExpression.prototype.parse = function(expression, context) {
      var color;
      if (!this.match(expression)) {
        return null;
      }
      color = new Color();
      color.colorExpression = expression;
      this.handle.call(color, this.regexp.exec(expression), expression, context);
      return color;
    };

    ColorExpression.prototype.search = function(text, start) {
      var lastIndex, match, range, re, results, _ref;
      if (start == null) {
        start = 0;
      }
      results = void 0;
      re = new RegExp(this.regexpString, 'g');
      re.lastIndex = start;
      if (_ref = re.exec(text), match = _ref[0], _ref) {
        lastIndex = re.lastIndex;
        range = [lastIndex - match.length, lastIndex];
        results = {
          range: range,
          match: text.slice(range[0], range[1])
        };
      }
      return results;
    };

    return ColorExpression;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9jb2xvci1leHByZXNzaW9uLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxrREFBQTs7QUFBQSxFQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUFSLENBQUE7O0FBQUEsRUFDQyw2QkFBOEIsT0FBQSxDQUFRLFdBQVIsRUFBOUIsMEJBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixJQUFBLGVBQUMsQ0FBQSx5QkFBRCxHQUE0QixTQUFDLE9BQUQsR0FBQTthQUMxQixJQUFDLENBQUEsZ0NBQUQsQ0FBa0MsT0FBTyxDQUFDLGlCQUFSLENBQUEsQ0FBbEMsRUFEMEI7SUFBQSxDQUE1QixDQUFBOztBQUFBLElBR0EsZUFBQyxDQUFBLHNDQUFELEdBQXlDLFNBQUMsY0FBRCxHQUFBO2FBQ3ZDLDBCQUFBLENBQTJCLGNBQTNCLEVBRHVDO0lBQUEsQ0FIekMsQ0FBQTs7QUFBQSxJQU1BLGVBQUMsQ0FBQSxnQ0FBRCxHQUFtQyxTQUFDLGNBQUQsR0FBQTtBQUNqQyxVQUFBLG1CQUFBO0FBQUEsTUFBQSxtQkFBQSxHQUFzQixJQUFDLENBQUEsc0NBQUQsQ0FBd0MsY0FBeEMsQ0FBdEIsQ0FBQTthQUVJLElBQUEsZUFBQSxDQUNGO0FBQUEsUUFBQSxJQUFBLEVBQU0sb0JBQU47QUFBQSxRQUNBLFlBQUEsRUFBYyxtQkFEZDtBQUFBLFFBRUEsTUFBQSxFQUFRLENBQUMsR0FBRCxDQUZSO0FBQUEsUUFHQSxRQUFBLEVBQVUsQ0FIVjtBQUFBLFFBSUEsTUFBQSxFQUFRLFNBQUMsS0FBRCxFQUFRLFVBQVIsRUFBb0IsT0FBcEIsR0FBQTtBQUNOLGNBQUEsa0JBQUE7QUFBQSxVQUFDLFlBQUQs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/color-expression.coffee
