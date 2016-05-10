(function() {
  var DotRenderer;

  module.exports = DotRenderer = (function() {
    function DotRenderer() {}

    DotRenderer.prototype.render = function(colorMarker) {
      var charWidth, column, displayBuffer, index, lineHeight, markers, pixelPosition, range, screenLine, textEditor, textEditorElement;
      range = colorMarker.getScreenRange();
      textEditor = colorMarker.colorBuffer.editor;
      textEditorElement = atom.views.getView(textEditor);
      displayBuffer = colorMarker.marker.displayBuffer;
      charWidth = displayBuffer.getDefaultCharWidth();
      markers = colorMarker.colorBuffer.getMarkerLayer().findMarkers({
        type: 'pigments-color',
        intersectsScreenRowRange: [range.end.row, range.end.row]
      });
      index = markers.indexOf(colorMarker.marker);
      screenLine = displayBuffer.screenLines[range.end.row];
      if (screenLine == null) {
        return {};
      }
      lineHeight = textEditor.getLineHeightInPixels();
      column = (screenLine.getMaxScreenColumn() + 1) * charWidth;
      pixelPosition = textEditorElement.pixelPositionForScreenPosition(range.end);
      return {
        "class": 'dot',
        style: {
          backgroundColor: colorMarker.color.toCSS(),
          top: (pixelPosition.top + lineHeight / 2) + 'px',
          left: (column + index * 18) + 'px'
        }
      };
    };

    return DotRenderer;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9yZW5kZXJlcnMvZG90LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUEsTUFBQSxXQUFBOztBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDTTs2QkFDSjs7QUFBQSwwQkFBQSxNQUFBLEdBQVEsU0FBQyxXQUFELEdBQUE7QUFDTixVQUFBLDZIQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsV0FBVyxDQUFDLGNBQVosQ0FBQSxDQUFSLENBQUE7QUFBQSxNQUVBLFVBQUEsR0FBYSxXQUFXLENBQUMsV0FBVyxDQUFDLE1BRnJDLENBQUE7QUFBQSxNQUdBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixVQUFuQixDQUhwQixDQUFBO0FBQUEsTUFJQSxhQUFBLEdBQWdCLFdBQVcsQ0FBQyxNQUFNLENBQUMsYUFKbkMsQ0FBQTtBQUFBLE1BS0EsU0FBQSxHQUFZLGFBQWEsQ0FBQyxtQkFBZCxDQUFBLENBTFosQ0FBQTtBQUFBLE1BT0EsT0FBQSxHQUFVLFdBQVcsQ0FBQyxXQUFXLENBQUMsY0FBeEIsQ0FBQSxDQUF3QyxDQUFDLFdBQXpDLENBQXFEO0FBQUEsUUFDN0QsSUFBQSxFQUFNLGdCQUR1RDtBQUFBLFFBRTdELHdCQUFBLEVBQTBCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFYLEVBQWdCLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBMUIsQ0FGbUM7T0FBckQsQ0FQVixDQUFBO0FBQUEsTUFZQSxLQUFBLEdBQVEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsV0FBVyxDQUFDLE1BQTVCLENBWlIsQ0FBQTtBQUFBLE1BYUEsVUFBQSxHQUFhLGFBQWEsQ0FBQyxXQUFZLENBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFWLENBYnZDLENBQUE7QUFlQSxNQUFBLElBQWlCLGtCQUFqQjtBQUFBLGVBQU8sRUFBUCxDQUFBO09BZkE7QUFBQSxNQWlCQSxVQUFBLEdBQWEsVUFBVSxDQUFDLHFCQUFYLENBQUEsQ0FqQmIsQ0FBQTtBQUFBLE1Ba0JBLE1BQUEsR0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBWCxDQUFBLENBQUEsR0FBa0MsQ0FBbkMsQ0FBQSxHQUF3QyxTQWxCakQsQ0FBQTtBQUFBLE1BbUJBLGFBQUEsR0FBZ0IsaUJBQWlCLENBQUMsOEJBQWxCLENBQWlELEtBQUssQ0FBQyxHQUF2RCxDQW5CaEIsQ0FBQTthQXFCQTtBQUFBLFFBQUEsT0FBQSxFQUFPLEtBQVA7QUFBQSxRQUNBLEtBQUEsRUFDRTtBQUFBLFVBQUEsZUFBQSxFQUFpQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQWxCLENBQUEsQ0FBakI7QUFBQSxVQUNBLEdBQUEsRUFBSyxDQUFDLGFBQWEsQ0FBQyxHQUFkLEdBQW9CLFVBQUEsR0FBYSxDQUFsQyxDQUFBLEdBQXVDLElBRDVDO0FBQUEsVUFFQSxJQUFBLEVBQU0sQ0FBQyxNQUFBLEdBQVMsS0FBQSxHQUFRLEVBQWxCLENBQUEsR0FBd0IsSUFGOUI7U0FGRjtRQXRCTTtJQUFBLENBQVIsQ0FBQTs7dUJBQUE7O01BRkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/renderers/dot.coffee
