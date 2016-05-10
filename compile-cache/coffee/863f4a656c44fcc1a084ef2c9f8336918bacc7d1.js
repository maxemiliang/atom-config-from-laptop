(function() {
  var CompositeDisposable, CoveringView, NavigationView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  CoveringView = require('./covering-view').CoveringView;

  NavigationView = (function(_super) {
    __extends(NavigationView, _super);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.content = function(navigator, editor) {
      return this.div({
        "class": 'controls navigation'
      }, (function(_this) {
        return function() {
          _this.text(' ');
          return _this.span({
            "class": 'pull-right'
          }, function() {
            _this.button({
              "class": 'btn btn-xs',
              click: 'up',
              outlet: 'prevBtn'
            }, 'prev');
            return _this.button({
              "class": 'btn btn-xs',
              click: 'down',
              outlet: 'nextBtn'
            }, 'next');
          });
        };
      })(this));
    };

    NavigationView.prototype.initialize = function(navigator, editor) {
      this.navigator = navigator;
      this.subs = new CompositeDisposable;
      NavigationView.__super__.initialize.call(this, editor);
      this.prependKeystroke('merge-conflicts:previous-unresolved', this.prevBtn);
      this.prependKeystroke('merge-conflicts:next-unresolved', this.nextBtn);
      return this.subs.add(this.navigator.conflict.onDidResolveConflict((function(_this) {
        return function() {
          _this.deleteMarker(_this.cover());
          _this.remove();
          return _this.cleanup();
        };
      })(this)));
    };

    NavigationView.prototype.cleanup = function() {
      NavigationView.__super__.cleanup.apply(this, arguments);
      return this.subs.dispose();
    };

    NavigationView.prototype.cover = function() {
      return this.navigator.separatorMarker;
    };

    NavigationView.prototype.up = function() {
      var _ref;
      return this.scrollTo((_ref = this.navigator.previousUnresolved()) != null ? _ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.down = function() {
      var _ref;
      return this.scrollTo((_ref = this.navigator.nextUnresolved()) != null ? _ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.conflict = function() {
      return this.navigator.conflict;
    };

    NavigationView.prototype.toString = function() {
      return "{NavView of: " + (this.conflict()) + "}";
    };

    return NavigationView;

  })(CoveringView);

  module.exports = {
    NavigationView: NavigationView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9uYXZpZ2F0aW9uLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNDLGVBQWdCLE9BQUEsQ0FBUSxpQkFBUixFQUFoQixZQURELENBQUE7O0FBQUEsRUFHTTtBQUVKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxTQUFELEVBQVksTUFBWixHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHFCQUFQO09BQUwsRUFBbUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqQyxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFlBQUEsT0FBQSxFQUFPLFlBQVA7V0FBTixFQUEyQixTQUFBLEdBQUE7QUFDekIsWUFBQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLGNBQXFCLEtBQUEsRUFBTyxJQUE1QjtBQUFBLGNBQWtDLE1BQUEsRUFBUSxTQUExQzthQUFSLEVBQTZELE1BQTdELENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLGNBQXFCLEtBQUEsRUFBTyxNQUE1QjtBQUFBLGNBQW9DLE1BQUEsRUFBUSxTQUE1QzthQUFSLEVBQStELE1BQS9ELEVBRnlCO1VBQUEsQ0FBM0IsRUFGaUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDZCQU9BLFVBQUEsR0FBWSxTQUFFLFNBQUYsRUFBYSxNQUFiLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxZQUFBLFNBQ1osQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxHQUFBLENBQUEsbUJBQVIsQ0FBQTtBQUFBLE1BRUEsK0NBQU0sTUFBTixDQUZBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixxQ0FBbEIsRUFBeUQsSUFBQyxDQUFBLE9BQTFELENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLGdCQUFELENBQWtCLGlDQUFsQixFQUFxRCxJQUFDLENBQUEsT0FBdEQsQ0FMQSxDQUFBO2FBT0EsSUFBQyxDQUFBLElBQUksQ0FBQyxHQUFOLENBQVUsSUFBQyxDQUFBLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQXBCLENBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDakQsVUFBQSxLQUFDLENBQUEsWUFBRCxDQUFjLEtBQUMsQ0FBQSxLQUFELENBQUEsQ0FBZCxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxNQUFELENBQUEsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxPQUFELENBQUEsRUFIaUQ7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxDQUFWLEVBUlU7SUFBQSxDQVBaLENBQUE7O0FBQUEsNkJBb0JBLE9BQUEsR0FBUyxTQUFBLEdBQUE7QUFDUCxNQUFBLDZDQUFBLFNBQUEsQ0FBQSxDQUFBO2FBQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxPQUFOLENBQUEsRUFGTztJQUFBLENBcEJULENBQUE7O0FBQUEsNkJBd0JBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLGdCQUFkO0lBQUEsQ0F4QlAsQ0FBQTs7QUFBQSw2QkEwQkEsRUFBQSxHQUFJLFNBQUEsR0FBQTtBQUFHLFVBQUEsSUFBQTthQUFBLElBQUMsQ0FBQSxRQUFELDREQUF5QyxDQUFFLFlBQWpDLENBQUEsVUFBVixFQUFIO0lBQUEsQ0ExQkosQ0FBQTs7QUFBQSw2QkE0QkEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUFHLFVBQUEsSUFBQTthQUFBLElBQUMsQ0FBQSxRQUFELHdEQUFxQyxDQUFFLFlBQTdCLENBQUEsVUFBVixFQUFIO0lBQUEsQ0E1Qk4sQ0FBQTs7QUFBQSw2QkE4QkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsU0FBZDtJQUFBLENBOUJWLENBQUE7O0FBQUEsNkJBZ0NBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBSSxlQUFBLEdBQWMsQ0FBQyxJQUFDLENBQUEsUUFBRCxDQUFBLENBQUQsQ0FBZCxHQUEyQixJQUEvQjtJQUFBLENBaENWLENBQUE7OzBCQUFBOztLQUYyQixhQUg3QixDQUFBOztBQUFBLEVBdUNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGNBQUEsRUFBZ0IsY0FBaEI7R0F4Q0YsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/navigation-view.coffee
