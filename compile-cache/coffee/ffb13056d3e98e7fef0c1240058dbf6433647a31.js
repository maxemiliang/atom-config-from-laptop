(function() {
  var CompositeDisposable, CoveringView, SideView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  CoveringView = require('./covering-view').CoveringView;

  SideView = (function(_super) {
    __extends(SideView, _super);

    function SideView() {
      return SideView.__super__.constructor.apply(this, arguments);
    }

    SideView.content = function(side, editor) {
      return this.div({
        "class": "side " + (side.klass()) + " " + side.position + " ui-site-" + (side.site())
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'controls'
          }, function() {
            _this.label({
              "class": 'text-highlight'
            }, side.ref);
            _this.span({
              "class": 'text-subtle'
            }, "// " + (side.description()));
            return _this.span({
              "class": 'pull-right'
            }, function() {
              _this.button({
                "class": 'btn btn-xs inline-block-tight revert',
                click: 'revert',
                outlet: 'revertBtn'
              }, 'Revert');
              return _this.button({
                "class": 'btn btn-xs inline-block-tight',
                click: 'useMe',
                outlet: 'useMeBtn'
              }, 'Use Me');
            });
          });
        };
      })(this));
    };

    SideView.prototype.initialize = function(side, editor) {
      this.side = side;
      this.subs = new CompositeDisposable;
      this.decoration = null;
      SideView.__super__.initialize.call(this, editor);
      this.detectDirty();
      this.prependKeystroke(this.side.eventName(), this.useMeBtn);
      return this.prependKeystroke('merge-conflicts:revert-current', this.revertBtn);
    };

    SideView.prototype.attached = function() {
      SideView.__super__.attached.apply(this, arguments);
      this.decorate();
      return this.subs.add(this.side.conflict.onDidResolveConflict((function(_this) {
        return function() {
          _this.deleteMarker(_this.side.refBannerMarker);
          if (!_this.side.wasChosen()) {
            _this.deleteMarker(_this.side.marker);
          }
          _this.remove();
          return _this.cleanup();
        };
      })(this)));
    };

    SideView.prototype.cleanup = function() {
      SideView.__super__.cleanup.apply(this, arguments);
      return this.subs.dispose();
    };

    SideView.prototype.cover = function() {
      return this.side.refBannerMarker;
    };

    SideView.prototype.decorate = function() {
      var args, _ref;
      if ((_ref = this.decoration) != null) {
        _ref.destroy();
      }
      if (this.side.conflict.isResolved() && !this.side.wasChosen()) {
        return;
      }
      args = {
        type: 'line',
        "class": this.side.lineClass()
      };
      return this.decoration = this.editor.decorateMarker(this.side.marker, args);
    };

    SideView.prototype.conflict = function() {
      return this.side.conflict;
    };

    SideView.prototype.isDirty = function() {
      return this.side.isDirty;
    };

    SideView.prototype.includesCursor = function(cursor) {
      var h, m, p, t, _ref;
      m = this.side.marker;
      _ref = [m.getHeadBufferPosition(), m.getTailBufferPosition()], h = _ref[0], t = _ref[1];
      p = cursor.getBufferPosition();
      return t.isLessThanOrEqual(p) && h.isGreaterThanOrEqual(p);
    };

    SideView.prototype.useMe = function() {
      this.side.resolve();
      return this.decorate();
    };

    SideView.prototype.revert = function() {
      this.editor.setTextInBufferRange(this.side.marker.getBufferRange(), this.side.originalText);
      return this.decorate();
    };

    SideView.prototype.detectDirty = function() {
      var currentText;
      currentText = this.editor.getTextInBufferRange(this.side.marker.getBufferRange());
      this.side.isDirty = currentText !== this.side.originalText;
      this.decorate();
      this.removeClass('dirty');
      if (this.side.isDirty) {
        return this.addClass('dirty');
      }
    };

    SideView.prototype.toString = function() {
      return "{SideView of: " + this.side + "}";
    };

    return SideView;

  })(CoveringView);

  module.exports = {
    SideView: SideView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9zaWRlLXZpZXcuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNDLGVBQWdCLE9BQUEsQ0FBUSxpQkFBUixFQUFoQixZQURELENBQUE7O0FBQUEsRUFHTTtBQUVKLCtCQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxJQUFELEVBQU8sTUFBUCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFRLE9BQUEsR0FBTSxDQUFDLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FBRCxDQUFOLEdBQW9CLEdBQXBCLEdBQXVCLElBQUksQ0FBQyxRQUE1QixHQUFxQyxXQUFyQyxHQUErQyxDQUFDLElBQUksQ0FBQyxJQUFMLENBQUEsQ0FBRCxDQUF2RDtPQUFMLEVBQTRFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzFFLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxVQUFQO1dBQUwsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFlBQUEsS0FBQyxDQUFBLEtBQUQsQ0FBTztBQUFBLGNBQUEsT0FBQSxFQUFPLGdCQUFQO2FBQVAsRUFBZ0MsSUFBSSxDQUFDLEdBQXJDLENBQUEsQ0FBQTtBQUFBLFlBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGNBQUEsT0FBQSxFQUFPLGFBQVA7YUFBTixFQUE2QixLQUFBLEdBQUksQ0FBQyxJQUFJLENBQUMsV0FB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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/side-view.coffee
