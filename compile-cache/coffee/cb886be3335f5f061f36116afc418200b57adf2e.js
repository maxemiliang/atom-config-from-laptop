(function() {
  var BackgroundRenderer, RegionRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RegionRenderer = require('./region-renderer');

  module.exports = BackgroundRenderer = (function(_super) {
    __extends(BackgroundRenderer, _super);

    function BackgroundRenderer() {
      return BackgroundRenderer.__super__.constructor.apply(this, arguments);
    }

    BackgroundRenderer.prototype.includeTextInRegion = true;

    BackgroundRenderer.prototype.render = function(colorMarker) {
      var color, colorText, l, region, regions, _i, _len;
      color = colorMarker.color.toCSS();
      regions = this.renderRegions(colorMarker);
      l = colorMarker.color.luma;
      colorText = l > 0.43 ? 'black' : 'white';
      for (_i = 0, _len = regions.length; _i < _len; _i++) {
        region = regions[_i];
        this.styleRegion(region, color, colorText);
      }
      return {
        regions: regions
      };
    };

    BackgroundRenderer.prototype.styleRegion = function(region, color, textColor) {
      region.classList.add('background');
      region.style.backgroundColor = color;
      return region.style.color = textColor;
    };

    return BackgroundRenderer;

  })(RegionRenderer);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9yZW5kZXJlcnMvYmFja2dyb3VuZC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLG1CQUFBLEdBQXFCLElBQXJCLENBQUE7O0FBQUEsaUNBQ0EsTUFBQSxHQUFRLFNBQUMsV0FBRCxHQUFBO0FBRU4sVUFBQSw4Q0FBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBbEIsQ0FBQSxDQUFSLENBQUE7QUFBQSxNQUVBLE9BQUEsR0FBVSxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQWYsQ0FGVixDQUFBO0FBQUEsTUFJQSxDQUFBLEdBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUp0QixDQUFBO0FBQUEsTUFNQSxTQUFBLEdBQWUsQ0FBQSxHQUFJLElBQVAsR0FBaUIsT0FBakIsR0FBOEIsT0FOMUMsQ0FBQTtBQU9BLFdBQUEsOENBQUE7NkJBQUE7QUFBQSxRQUFBLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYixFQUFxQixLQUFyQixFQUE0QixTQUE1QixDQUFBLENBQUE7QUFBQSxPQVBBO2FBUUE7QUFBQSxRQUFDLFNBQUEsT0FBRDtRQVZNO0lBQUEsQ0FEUixDQUFBOztBQUFBLGlDQWFBLFdBQUEsR0FBYSxTQUFDLE1BQUQsRUFBUyxLQUFULEVBQWdCLFNBQWhCLEdBQUE7QUFDWCxNQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBakIsQ0FBcUIsWUFBckIsQ0FBQSxDQUFBO0FBQUEsTUFFQSxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWIsR0FBK0IsS0FGL0IsQ0FBQTthQUdBLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBYixHQUFxQixVQUpWO0lBQUEsQ0FiYixDQUFBOzs4QkFBQTs7S0FEK0IsZUFIakMsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/renderers/background.coffee
