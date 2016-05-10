(function() {
  var Palette;

  module.exports = Palette = (function() {
    function Palette(variables) {
      this.variables = variables != null ? variables : [];
    }

    Palette.prototype.sortedByColor = function() {
      return this.variables.slice().sort((function(_this) {
        return function(_arg, _arg1) {
          var a, b;
          a = _arg.color;
          b = _arg1.color;
          return _this.compareColors(a, b);
        };
      })(this));
    };

    Palette.prototype.sortedByName = function() {
      var collator;
      collator = new Intl.Collator("en-US", {
        numeric: true
      });
      return this.variables.slice().sort(function(_arg, _arg1) {
        var a, b;
        a = _arg.name;
        b = _arg1.name;
        return collator.compare(a, b);
      });
    };

    Palette.prototype.getColorsNames = function() {
      return this.variables.map(function(v) {
        return v.name;
      });
    };

    Palette.prototype.getColorsCount = function() {
      return this.variables.length;
    };

    Palette.prototype.eachColor = function(iterator) {
      var v, _i, _len, _ref, _results;
      _ref = this.variables;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        _results.push(iterator(v));
      }
      return _results;
    };

    Palette.prototype.compareColors = function(a, b) {
      var aHue, aLightness, aSaturation, bHue, bLightness, bSaturation, _ref, _ref1;
      _ref = a.hsl, aHue = _ref[0], aSaturation = _ref[1], aLightness = _ref[2];
      _ref1 = b.hsl, bHue = _ref1[0], bSaturation = _ref1[1], bLightness = _ref1[2];
      if (aHue < bHue) {
        return -1;
      } else if (aHue > bHue) {
        return 1;
      } else if (aSaturation < bSaturation) {
        return -1;
      } else if (aSaturation > bSaturation) {
        return 1;
      } else if (aLightness < bLightness) {
        return -1;
      } else if (aLightness > bLightness) {
        return 1;
      } else {
        return 0;
      }
    };

    return Palette;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9wYWxldHRlLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxPQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNTLElBQUEsaUJBQUUsU0FBRixHQUFBO0FBQWlCLE1BQWhCLElBQUMsQ0FBQSxnQ0FBQSxZQUFVLEVBQUssQ0FBakI7SUFBQSxDQUFiOztBQUFBLHNCQUVBLGFBQUEsR0FBZSxTQUFBLEdBQUE7YUFDYixJQUFDLENBQUEsU0FBUyxDQUFDLEtBQVgsQ0FBQSxDQUFrQixDQUFDLElBQW5CLENBQXdCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsRUFBWSxLQUFaLEdBQUE7QUFBMEIsY0FBQSxJQUFBO0FBQUEsVUFBbEIsSUFBUCxLQUFDLEtBQXdCLENBQUE7QUFBQSxVQUFQLElBQVAsTUFBQyxLQUFhLENBQUE7aUJBQUEsS0FBQyxDQUFBLGFBQUQsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLEVBQTFCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEIsRUFEYTtJQUFBLENBRmYsQ0FBQTs7QUFBQSxzQkFLQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1osVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQWUsSUFBQSxJQUFJLENBQUMsUUFBTCxDQUFjLE9BQWQsRUFBdUI7QUFBQSxRQUFBLE9BQUEsRUFBUyxJQUFUO09BQXZCLENBQWYsQ0FBQTthQUNBLElBQUMsQ0FBQSxTQUFTLENBQUMsS0FBWCxDQUFBLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsU0FBQyxJQUFELEVBQVcsS0FBWCxHQUFBO0FBQXdCLFlBQUEsSUFBQTtBQUFBLFFBQWpCLElBQU4sS0FBQyxJQUFzQixDQUFBO0FBQUEsUUFBUCxJQUFOLE1BQUMsSUFBWSxDQUFBO2VBQUEsUUFBUSxDQUFDLE9BQVQsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBeEI7TUFBQSxDQUF4QixFQUZZO0lBQUEsQ0FMZCxDQUFBOztBQUFBLHNCQVNBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLFNBQVMsQ0FBQyxHQUFYLENBQWUsU0FBQyxDQUFELEdBQUE7ZUFBTyxDQUFDLENBQUMsS0FBVDtNQUFBLENBQWYsRUFBSDtJQUFBLENBVGhCLENBQUE7O0FBQUEsc0JBV0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQWQ7SUFBQSxDQVhoQixDQUFBOztBQUFBLHNCQWFBLFNBQUEsR0FBVyxTQUFDLFFBQUQsR0FBQTtBQUFjLFVBQUEsMkJBQUE7QUFBQTtBQUFBO1dBQUEsMkNBQUE7cUJBQUE7QUFBQSxzQkFBQSxRQUFBLENBQVMsQ0FBVCxFQUFBLENBQUE7QUFBQTtzQkFBZDtJQUFBLENBYlgsQ0FBQTs7QUFBQSxzQkFlQSxhQUFBLEdBQWUsU0FBQyxDQUFELEVBQUcsQ0FBSCxHQUFBO0FBQ2IsVUFBQSx5RUFBQTtBQUFBLE1BQUEsT0FBa0MsQ0FBQyxDQUFDLEdBQXBDLEVBQUMsY0FBRCxFQUFPLHFCQUFQLEVBQW9CLG9CQUFwQixDQUFBO0FBQUEsTUFDQSxRQUFrQyxDQUFDLENBQUMsR0FBcEMsRUFBQyxlQUFELEVBQU8sc0JBQVAsRUFBb0IscUJBRHBCLENBQUE7QUFFQSxNQUFBLElBQUcsSUFBQSxHQUFPLElBQVY7ZUFDRSxDQUFBLEVBREY7T0FBQSxNQUVLLElBQUcsSUFBQSxHQUFPLElBQVY7ZUFDSCxFQURHO09BQUEsTUFFQSxJQUFHLFdBQUEsR0FBYyxXQUFqQjtlQUNILENBQUEsRUFERztPQUFBLE1BRUEsSUFBRyxXQUFBLEdBQWMsV0FBakI7ZUFDSCxFQURHO09BQUEsTUFFQSxJQUFHLFVBQUEsR0FBYSxVQUFoQjtlQUNILENBQUEsRUFERztPQUFBLE1BRUEsSUFBRyxVQUFBLEdBQWEsVUFBaEI7ZUFDSCxFQURHO09BQUEsTUFBQTtlQUdILEVBSEc7T0FiUTtJQUFBLENBZmYsQ0FBQTs7bUJBQUE7O01BRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/palette.coffee
