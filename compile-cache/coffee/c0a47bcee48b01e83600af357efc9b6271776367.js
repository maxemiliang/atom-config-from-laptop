(function() {
  var OutlineRenderer, RegionRenderer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RegionRenderer = require('./region-renderer');

  module.exports = OutlineRenderer = (function(_super) {
    __extends(OutlineRenderer, _super);

    function OutlineRenderer() {
      return OutlineRenderer.__super__.constructor.apply(this, arguments);
    }

    OutlineRenderer.prototype.render = function(colorMarker) {
      var color, range, region, regions, rowSpan, _i, _len;
      range = colorMarker.getScreenRange();
      if (range.isEmpty()) {
        return [];
      }
      color = colorMarker.color.toCSS();
      rowSpan = range.end.row - range.start.row;
      regions = this.renderRegions(colorMarker);
      for (_i = 0, _len = regions.length; _i < _len; _i++) {
        region = regions[_i];
        this.styleRegion(region, color);
      }
      return {
        regions: regions
      };
    };

    OutlineRenderer.prototype.styleRegion = function(region, color) {
      region.classList.add('outline');
      return region.style.borderColor = color;
    };

    return OutlineRenderer;

  })(RegionRenderer);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9yZW5kZXJlcnMvb3V0bGluZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsK0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osc0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDhCQUFBLE1BQUEsR0FBUSxTQUFDLFdBQUQsR0FBQTtBQUNOLFVBQUEsZ0RBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxXQUFXLENBQUMsY0FBWixDQUFBLENBQVIsQ0FBQTtBQUNBLE1BQUEsSUFBYSxLQUFLLENBQUMsT0FBTixDQUFBLENBQWI7QUFBQSxlQUFPLEVBQVAsQ0FBQTtPQURBO0FBQUEsTUFHQSxLQUFBLEdBQVEsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFsQixDQUFBLENBSFIsQ0FBQTtBQUFBLE1BS0EsT0FBQSxHQUFVLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVixHQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBTHRDLENBQUE7QUFBQSxNQU1BLE9BQUEsR0FBVSxJQUFDLENBQUEsYUFBRCxDQUFlLFdBQWYsQ0FOVixDQUFBO0FBUUEsV0FBQSw4Q0FBQTs2QkFBQTtBQUFBLFFBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiLEVBQXFCLEtBQXJCLENBQUEsQ0FBQTtBQUFBLE9BUkE7YUFTQTtBQUFBLFFBQUMsU0FBQSxPQUFEO1FBVk07SUFBQSxDQUFSLENBQUE7O0FBQUEsOEJBWUEsV0FBQSxHQUFhLFNBQUMsTUFBRCxFQUFTLEtBQVQsR0FBQTtBQUNYLE1BQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFqQixDQUFxQixTQUFyQixDQUFBLENBQUE7YUFDQSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQWIsR0FBMkIsTUFGaEI7SUFBQSxDQVpiLENBQUE7OzJCQUFBOztLQUQ0QixlQUg5QixDQUFBO0FBQUEiCn0=

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/renderers/outline.coffee
