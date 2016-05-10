(function() {
  var $, CompositeDisposable, CoveringView, View, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('space-pen'), View = _ref.View, $ = _ref.$;

  _ = require('underscore-plus');

  CoveringView = (function(_super) {
    __extends(CoveringView, _super);

    function CoveringView() {
      return CoveringView.__super__.constructor.apply(this, arguments);
    }

    CoveringView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.coverSubs = new CompositeDisposable;
      this.overlay = this.editor.decorateMarker(this.cover(), {
        type: 'overlay',
        item: this,
        position: 'tail'
      });
      return this.coverSubs.add(this.editor.onDidDestroy((function(_this) {
        return function() {
          return _this.cleanup();
        };
      })(this)));
    };

    CoveringView.prototype.attached = function() {
      var view;
      view = atom.views.getView(this.editor);
      this.parent().css({
        right: view.getVerticalScrollbarWidth()
      });
      this.css({
        'margin-top': -this.editor.getLineHeightInPixels()
      });
      return this.height(this.editor.getLineHeightInPixels());
    };

    CoveringView.prototype.cleanup = function() {
      var _ref1;
      this.coverSubs.dispose();
      if ((_ref1 = this.overlay) != null) {
        _ref1.destroy();
      }
      return this.overlay = null;
    };

    CoveringView.prototype.cover = function() {
      return null;
    };

    CoveringView.prototype.conflict = function() {
      return null;
    };

    CoveringView.prototype.isDirty = function() {
      return false;
    };

    CoveringView.prototype.detectDirty = function() {
      return null;
    };

    CoveringView.prototype.decorate = function() {
      return null;
    };

    CoveringView.prototype.getModel = function() {
      return null;
    };

    CoveringView.prototype.buffer = function() {
      return this.editor.getBuffer();
    };

    CoveringView.prototype.includesCursor = function(cursor) {
      return false;
    };

    CoveringView.prototype.deleteMarker = function(marker) {
      this.buffer()["delete"](marker.getBufferRange());
      return marker.destroy();
    };

    CoveringView.prototype.scrollTo = function(positionOrNull) {
      if (positionOrNull != null) {
        return this.editor.setCursorBufferPosition(positionOrNull);
      }
    };

    CoveringView.prototype.prependKeystroke = function(eventName, element) {
      var bindings, e, original, _i, _len, _results;
      bindings = atom.keymaps.findKeyBindings({
        command: eventName
      });
      _results = [];
      for (_i = 0, _len = bindings.length; _i < _len; _i++) {
        e = bindings[_i];
        original = element.text();
        _results.push(element.text(_.humanizeKeystroke(e.keystrokes) + (" " + original)));
      }
      return _results;
    };

    return CoveringView;

  })(View);

  module.exports = {
    CoveringView: CoveringView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9jb3ZlcmluZy12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtREFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxPQUFZLE9BQUEsQ0FBUSxXQUFSLENBQVosRUFBQyxZQUFBLElBQUQsRUFBTyxTQUFBLENBRFAsQ0FBQTs7QUFBQSxFQUVBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FGSixDQUFBOztBQUFBLEVBS007QUFFSixtQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsMkJBQUEsVUFBQSxHQUFZLFNBQUUsTUFBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsU0FBQSxNQUNaLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsR0FBQSxDQUFBLG1CQUFiLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxjQUFSLENBQXVCLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBdkIsRUFDVDtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLElBQUEsRUFBTSxJQUROO0FBQUEsUUFFQSxRQUFBLEVBQVUsTUFGVjtPQURTLENBRFgsQ0FBQTthQU1BLElBQUMsQ0FBQSxTQUFTLENBQUMsR0FBWCxDQUFlLElBQUMsQ0FBQSxNQUFNLENBQUMsWUFBUixDQUFxQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxPQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJCLENBQWYsRUFQVTtJQUFBLENBQVosQ0FBQTs7QUFBQSwyQkFTQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUMsQ0FBQSxNQUFwQixDQUFQLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FBUyxDQUFDLEdBQVYsQ0FBYztBQUFBLFFBQUEsS0FBQSxFQUFPLElBQUksQ0FBQyx5QkFBTCxDQUFBLENBQVA7T0FBZCxDQURBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLFlBQUEsRUFBYyxDQUFBLElBQUUsQ0FBQSxNQUFNLENBQUMscUJBQVIsQ0FBQSxDQUFmO09BQUwsQ0FIQSxDQUFBO2FBSUEsSUFBQyxDQUFBLE1BQUQsQ0FBUSxJQUFDLENBQUEsTUFBTSxDQUFDLHFCQUFSLENBQUEsQ0FBUixFQUxRO0lBQUEsQ0FUVixDQUFBOztBQUFBLDJCQWdCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsVUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FBQSxDQUFBLENBQUE7O2FBRVEsQ0FBRSxPQUFWLENBQUE7T0FGQTthQUdBLElBQUMsQ0FBQSxPQUFELEdBQVcsS0FKSjtJQUFBLENBaEJULENBQUE7O0FBQUEsMkJBdUJBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0F2QlAsQ0FBQTs7QUFBQSwyQkEwQkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQTFCVixDQUFBOztBQUFBLDJCQTRCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQUcsTUFBSDtJQUFBLENBNUJULENBQUE7O0FBQUEsMkJBK0JBLFdBQUEsR0FBYSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0EvQmIsQ0FBQTs7QUFBQSwyQkFrQ0EsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLEtBQUg7SUFBQSxDQWxDVixDQUFBOztBQUFBLDJCQW9DQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsS0FBSDtJQUFBLENBcENWLENBQUE7O0FBQUEsMkJBc0NBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBQSxFQUFIO0lBQUEsQ0F0Q1IsQ0FBQTs7QUFBQSwyQkF3Q0EsY0FBQSxHQUFnQixTQUFDLE1BQUQsR0FBQTthQUFZLE1BQVo7SUFBQSxDQXhDaEIsQ0FBQTs7QUFBQSwyQkEwQ0EsWUFBQSxHQUFjLFNBQUMsTUFBRCxHQUFBO0FBQ1osTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyxRQUFELENBQVQsQ0FBaUIsTUFBTSxDQUFDLGNBQVAsQ0FBQSxDQUFqQixDQUFBLENBQUE7YUFDQSxNQUFNLENBQUMsT0FBUCxDQUFBLEVBRlk7SUFBQSxDQTFDZCxDQUFBOztBQUFBLDJCQThDQSxRQUFBLEdBQVUsU0FBQyxjQUFELEdBQUE7QUFDUixNQUFBLElBQWtELHNCQUFsRDtlQUFBLElBQUMsQ0FBQSxNQUFNLENBQUMsdUJBQVIsQ0FBZ0MsY0FBaEMsRUFBQTtPQURRO0lBQUEsQ0E5Q1YsQ0FBQTs7QUFBQSwyQkFpREEsZ0JBQUEsR0FBa0IsU0FBQyxTQUFELEVBQVksT0FBWixHQUFBO0FBQ2hCLFVBQUEseUNBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWIsQ0FBNkI7QUFBQSxRQUFBLE9BQUEsRUFBUyxTQUFUO09BQTdCLENBQVgsQ0FBQTtBQUVBO1dBQUEsK0NBQUE7eUJBQUE7QUFDRSxRQUFBLFFBQUEsR0FBVyxPQUFPLENBQUMsSUFBUixDQUFBLENBQVgsQ0FBQTtBQUFBLHNCQUNBLE9BQU8sQ0FBQyxJQUFSLENBQWEsQ0FBQyxDQUFDLGlCQUFGLENBQW9CLENBQUMsQ0FBQyxVQUF0QixDQUFBLEdBQW9DLENBQUMsR0FBQSxHQUFHLFFBQUosQ0FBakQsRUFEQSxDQURGO0FBQUE7c0JBSGdCO0lBQUEsQ0FqRGxCLENBQUE7O3dCQUFBOztLQUZ5QixLQUwzQixDQUFBOztBQUFBLEVBK0RBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFlBQUEsRUFBYyxZQUFkO0dBaEVGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/covering-view.coffee
