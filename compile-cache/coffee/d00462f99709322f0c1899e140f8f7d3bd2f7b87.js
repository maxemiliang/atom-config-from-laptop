(function() {
  var Navigator;

  Navigator = (function() {
    function Navigator(separatorMarker) {
      var _ref;
      this.separatorMarker = separatorMarker;
      _ref = [null, null, null], this.conflict = _ref[0], this.previous = _ref[1], this.next = _ref[2];
    }

    Navigator.prototype.linkToPrevious = function(c) {
      this.previous = c;
      if (c != null) {
        return c.navigator.next = this.conflict;
      }
    };

    Navigator.prototype.nextUnresolved = function() {
      var current;
      current = this.next;
      while ((current != null) && current.isResolved()) {
        current = current.navigator.next;
      }
      return current;
    };

    Navigator.prototype.previousUnresolved = function() {
      var current;
      current = this.previous;
      while ((current != null) && current.isResolved()) {
        current = current.navigator.previous;
      }
      return current;
    };

    Navigator.prototype.markers = function() {
      return [this.separatorMarker];
    };

    return Navigator;

  })();

  module.exports = {
    Navigator: Navigator
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvbmF2aWdhdG9yLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxTQUFBOztBQUFBLEVBQU07QUFFUyxJQUFBLG1CQUFFLGVBQUYsR0FBQTtBQUNYLFVBQUEsSUFBQTtBQUFBLE1BRFksSUFBQyxDQUFBLGtCQUFBLGVBQ2IsQ0FBQTtBQUFBLE1BQUEsT0FBZ0MsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsQ0FBaEMsRUFBQyxJQUFDLENBQUEsa0JBQUYsRUFBWSxJQUFDLENBQUEsa0JBQWIsRUFBdUIsSUFBQyxDQUFBLGNBQXhCLENBRFc7SUFBQSxDQUFiOztBQUFBLHdCQUdBLGNBQUEsR0FBZ0IsU0FBQyxDQUFELEdBQUE7QUFDZCxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBWixDQUFBO0FBQ0EsTUFBQSxJQUFnQyxTQUFoQztlQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBWixHQUFtQixJQUFDLENBQUEsU0FBcEI7T0FGYztJQUFBLENBSGhCLENBQUE7O0FBQUEsd0JBT0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxJQUFDLENBQUEsSUFBWCxDQUFBO0FBQ0EsYUFBTSxpQkFBQSxJQUFhLE9BQU8sQ0FBQyxVQUFSLENBQUEsQ0FBbkIsR0FBQTtBQUNFLFFBQUEsT0FBQSxHQUFVLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBNUIsQ0FERjtNQUFBLENBREE7YUFHQSxRQUpjO0lBQUEsQ0FQaEIsQ0FBQTs7QUFBQSx3QkFhQSxrQkFBQSxHQUFvQixTQUFBLEdBQUE7QUFDbEIsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsSUFBQyxDQUFBLFFBQVgsQ0FBQTtBQUNBLGFBQU0saUJBQUEsSUFBYSxPQUFPLENBQUMsVUFBUixDQUFBLENBQW5CLEdBQUE7QUFDRSxRQUFBLE9BQUEsR0FBVSxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQTVCLENBREY7TUFBQSxDQURBO2FBR0EsUUFKa0I7SUFBQSxDQWJwQixDQUFBOztBQUFBLHdCQW1CQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQUcsQ0FBQyxJQUFDLENBQUEsZUFBRixFQUFIO0lBQUEsQ0FuQlQsQ0FBQTs7cUJBQUE7O01BRkYsQ0FBQTs7QUFBQSxFQXVCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxTQUFBLEVBQVcsU0FBWDtHQXhCRixDQUFBO0FBQUEiCn0=

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/navigator.coffee
