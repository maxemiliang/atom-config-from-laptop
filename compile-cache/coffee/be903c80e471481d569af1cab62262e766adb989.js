(function() {
  var RegionRenderer;

  module.exports = RegionRenderer = (function() {
    function RegionRenderer() {}

    RegionRenderer.prototype.includeTextInRegion = false;

    RegionRenderer.prototype.renderRegions = function(colorMarker) {
      var displayBuffer, range, regions, row, rowSpan, _i, _ref, _ref1;
      range = colorMarker.getScreenRange();
      if (range.isEmpty()) {
        return [];
      }
      rowSpan = range.end.row - range.start.row;
      regions = [];
      displayBuffer = colorMarker.marker.displayBuffer;
      if (rowSpan === 0) {
        regions.push(this.createRegion(range.start, range.end, colorMarker));
      } else {
        regions.push(this.createRegion(range.start, {
          row: range.start.row,
          column: Infinity
        }, colorMarker, displayBuffer.screenLines[range.start.row]));
        if (rowSpan > 1) {
          for (row = _i = _ref = range.start.row + 1, _ref1 = range.end.row; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; row = _ref <= _ref1 ? ++_i : --_i) {
            regions.push(this.createRegion({
              row: row,
              column: 0
            }, {
              row: row,
              column: Infinity
            }, colorMarker, displayBuffer.screenLines[row]));
          }
        }
        regions.push(this.createRegion({
          row: range.end.row,
          column: 0
        }, range.end, colorMarker, displayBuffer.screenLines[range.end.row]));
      }
      return regions;
    };

    RegionRenderer.prototype.createRegion = function(start, end, colorMarker, screenLine) {
      var bufferRange, charWidth, clippedEnd, clippedStart, css, displayBuffer, endPosition, lineHeight, name, needAdjustment, region, startPosition, text, textEditor, textEditorElement, value, _ref, _ref1;
      textEditor = colorMarker.colorBuffer.editor;
      textEditorElement = atom.views.getView(textEditor);
      displayBuffer = colorMarker.marker.displayBuffer;
      lineHeight = textEditor.getLineHeightInPixels();
      charWidth = textEditor.getDefaultCharWidth();
      clippedStart = {
        row: start.row,
        column: (_ref = screenLine != null ? screenLine.clipScreenColumn(start.column) : void 0) != null ? _ref : start.column
      };
      clippedEnd = {
        row: end.row,
        column: (_ref1 = screenLine != null ? screenLine.clipScreenColumn(end.column) : void 0) != null ? _ref1 : end.column
      };
      bufferRange = displayBuffer.bufferRangeForScreenRange({
        start: clippedStart,
        end: clippedEnd
      });
      needAdjustment = (screenLine != null ? screenLine.isSoftWrapped() : void 0) && end.column >= (screenLine != null ? screenLine.text.length : void 0) - (screenLine != null ? screenLine.softWrapIndentationDelta : void 0);
      if (needAdjustment) {
        bufferRange.end.column++;
      }
      startPosition = textEditorElement.pixelPositionForScreenPosition(clippedStart);
      endPosition = textEditorElement.pixelPositionForScreenPosition(clippedEnd);
      text = displayBuffer.buffer.getTextInRange(bufferRange);
      css = {};
      css.left = startPosition.left;
      css.top = startPosition.top;
      css.width = endPosition.left - startPosition.left;
      if (needAdjustment) {
        css.width += charWidth;
      }
      css.height = lineHeight;
      region = document.createElement('div');
      region.className = 'region';
      if (this.includeTextInRegion) {
        region.textContent = text;
      }
      if (startPosition.left === endPosition.left) {
        region.invalid = true;
      }
      for (name in css) {
        value = css[name];
        region.style[name] = value + 'px';
      }
      return region;
    };

    return RegionRenderer;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9yZW5kZXJlcnMvcmVnaW9uLXJlbmRlcmVyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxjQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtnQ0FDSjs7QUFBQSw2QkFBQSxtQkFBQSxHQUFxQixLQUFyQixDQUFBOztBQUFBLDZCQUVBLGFBQUEsR0FBZSxTQUFDLFdBQUQsR0FBQTtBQUNiLFVBQUEsNERBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxXQUFXLENBQUMsY0FBWixDQUFBLENBQVIsQ0FBQTtBQUNBLE1BQUEsSUFBYSxLQUFLLENBQUMsT0FBTixDQUFBLENBQWI7QUFBQSxlQUFPLEVBQVAsQ0FBQTtPQURBO0FBQUEsTUFHQSxPQUFBLEdBQVUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFWLEdBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FIdEMsQ0FBQTtBQUFBLE1BSUEsT0FBQSxHQUFVLEVBSlYsQ0FBQTtBQUFBLE1BTUEsYUFBQSxHQUFnQixXQUFXLENBQUMsTUFBTSxDQUFDLGFBTm5DLENBQUE7QUFRQSxNQUFBLElBQUcsT0FBQSxLQUFXLENBQWQ7QUFDRSxRQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBQyxDQUFBLFlBQUQsQ0FBYyxLQUFLLENBQUMsS0FBcEIsRUFBMkIsS0FBSyxDQUFDLEdBQWpDLEVBQXNDLFdBQXRDLENBQWIsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFDLENBQUEsWUFBRCxDQUNYLEtBQUssQ0FBQyxLQURLLEVBRVg7QUFBQSxVQUNFLEdBQUEsRUFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBRG5CO0FBQUEsVUFFRSxNQUFBLEVBQVEsUUFGVjtTQUZXLEVBTVgsV0FOVyxFQU9YLGFBQWEsQ0FBQyxXQUFZLENBQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFaLENBUGYsQ0FBYixDQUFBLENBQUE7QUFTQSxRQUFBLElBQUcsT0FBQSxHQUFVLENBQWI7QUFDRSxlQUFXLHdJQUFYLEdBQUE7QUFDRSxZQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBQyxDQUFBLFlBQUQsQ0FDWDtBQUFBLGNBQUMsS0FBQSxHQUFEO0FBQUEsY0FBTSxNQUFBLEVBQVEsQ0FBZDthQURXLEVBRVg7QUFBQSxjQUFDLEtBQUEsR0FBRDtBQUFBLGNBQU0sTUFBQSxFQUFRLFFBQWQ7YUFGVyxFQUdYLFdBSFcsRUFJWCxhQUFhLENBQUMsV0FBWSxDQUFBLEdBQUEsQ0FKZixDQUFiLENBQUEsQ0FERjtBQUFBLFdBREY7U0FUQTtBQUFBLFFBa0JBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBQyxDQUFBLFlBQUQsQ0FDWDtBQUFBLFVBQUMsR0FBQSxFQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBaEI7QUFBQSxVQUFxQixNQUFBLEVBQVEsQ0FBN0I7U0FEVyxFQUVYLEtBQUssQ0FBQyxHQUZLLEVBR1gsV0FIVyxFQUlYLGFBQWEsQ0FBQyxXQUFZLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFWLENBSmYsQ0FBYixDQWxCQSxDQUhGO09BUkE7YUFvQ0EsUUFyQ2E7SUFBQSxDQUZmLENBQUE7O0FBQUEsNkJBeUNBLFlBQUEsR0FBYyxTQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWEsV0FBYixFQUEwQixVQUExQixHQUFBO0FBQ1osVUFBQSxtTUFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBckMsQ0FBQTtBQUFBLE1BQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLFVBQW5CLENBRHBCLENBQUE7QUFBQSxNQUVBLGFBQUEsR0FBZ0IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxhQUZuQyxDQUFBO0FBQUEsTUFJQSxVQUFBLEdBQWEsVUFBVSxDQUFDLHFCQUFYLENBQUEsQ0FKYixDQUFBO0FBQUEsTUFLQSxTQUFBLEdBQVksVUFBVSxDQUFDLG1CQUFYLENBQUEsQ0FMWixDQUFBO0FBQUEsTUFPQSxZQUFBLEdBQWU7QUFBQSxRQUNiLEdBQUEsRUFBSyxLQUFLLENBQUMsR0FERTtBQUFBLFFBRWIsTUFBQSxvR0FBcUQsS0FBSyxDQUFDLE1BRjlDO09BUGYsQ0FBQTtBQUFBLE1BV0EsVUFBQSxHQUFhO0FBQUEsUUFDWCxHQUFBLEVBQUssR0FBRyxDQUFDLEdBREU7QUFBQSxRQUVYLE1BQUEsb0dBQW1ELEdBQUcsQ0FBQyxNQUY1QztPQVhiLENBQUE7QUFBQSxNQWdCQSxXQUFBLEdBQWMsYUFBYSxDQUFDLHlCQUFkLENBQXdDO0FBQUEsUUFDcEQsS0FBQSxFQUFPLFlBRDZDO0FBQUEsUUFFcEQsR0FBQSxFQUFLLFVBRitDO09BQXhDLENBaEJkLENBQUE7QUFBQSxNQXFCQSxjQUFBLHlCQUFpQixVQUFVLENBQUUsYUFBWixDQUFBLFdBQUEsSUFBZ0MsR0FBRyxDQUFDLE1BQUosMEJBQWMsVUFBVSxDQUFFLElBQUksQ0FBQyxnQkFBakIseUJBQTBCLFVBQVUsQ0FBRSxrQ0FyQnJHLENBQUE7QUF1QkEsTUFBQSxJQUE0QixjQUE1QjtBQUFBLFFBQUEsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFoQixFQUFBLENBQUE7T0F2QkE7QUFBQSxNQXlCQSxhQUFBLEdBQWdCLGlCQUFpQixDQUFDLDhCQUFsQixDQUFpRCxZQUFqRCxDQXpCaEIsQ0FBQTtBQUFBLE1BMEJBLFdBQUEsR0FBYyxpQkFBaUIsQ0FBQyw4QkFBbEIsQ0FBaUQsVUFBakQsQ0ExQmQsQ0FBQTtBQUFBLE1BNEJBLElBQUEsR0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLGNBQXJCLENBQW9DLFdBQXBDLENBNUJQLENBQUE7QUFBQSxNQThCQSxHQUFBLEdBQU0sRUE5Qk4sQ0FBQTtBQUFBLE1BK0JBLEdBQUcsQ0FBQyxJQUFKLEdBQVcsYUFBYSxDQUFDLElBL0J6QixDQUFBO0FBQUEsTUFnQ0EsR0FBRyxDQUFDLEdBQUosR0FBVSxhQUFhLENBQUMsR0FoQ3hCLENBQUE7QUFBQSxNQWlDQSxHQUFHLENBQUMsS0FBSixHQUFZLFdBQVcsQ0FBQyxJQUFaLEdBQW1CLGFBQWEsQ0FBQyxJQWpDN0MsQ0FBQTtBQWtDQSxNQUFBLElBQTBCLGNBQTFCO0FBQUEsUUFBQSxHQUFHLENBQUMsS0FBSixJQUFhLFNBQWIsQ0FBQTtPQWxDQTtBQUFBLE1BbUNBLEdBQUcsQ0FBQyxNQUFKLEdBQWEsVUFuQ2IsQ0FBQTtBQUFBLE1BcUNBLE1BQUEsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQXJDVCxDQUFBO0FBQUEsTUFzQ0EsTUFBTSxDQUFDLFNBQVAsR0FBbUIsUUF0Q25CLENBQUE7QUF1Q0EsTUFBQSxJQUE2QixJQUFDLENBQUEsbUJBQTlCO0FBQUEsUUFBQSxNQUFNLENBQUMsV0FBUCxHQUFxQixJQUFyQixDQUFBO09BdkNBO0FBd0NBLE1BQUEsSUFBeUIsYUFBYSxDQUFDLElBQWQsS0FBc0IsV0FBVyxDQUFDLElBQTNEO0FBQUEsUUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixJQUFqQixDQUFBO09BeENBO0FBeUNBLFdBQUEsV0FBQTswQkFBQTtBQUFBLFFBQUEsTUFBTSxDQUFDLEtBQU0sQ0FBQSxJQUFBLENBQWIsR0FBcUIsS0FBQSxHQUFRLElBQTdCLENBQUE7QUFBQSxPQXpDQTthQTJDQSxPQTVDWTtJQUFBLENBekNkLENBQUE7OzBCQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/renderers/region-renderer.coffee
