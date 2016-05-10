(function() {
  var GitNotFoundError, GitNotFoundErrorView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('space-pen').View;

  GitNotFoundError = require('../git-bridge').GitNotFoundError;

  GitNotFoundErrorView = (function(_super) {
    __extends(GitNotFoundErrorView, _super);

    function GitNotFoundErrorView() {
      return GitNotFoundErrorView.__super__.constructor.apply(this, arguments);
    }

    GitNotFoundErrorView.content = function(err) {
      return this.div({
        "class": 'overlay from-top padded merge-conflict-error merge-conflicts-message'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'panel'
          }, function() {
            _this.div({
              "class": 'panel-heading no-path'
            }, function() {
              _this.code('git');
              return _this.text("can't be found in any of the default locations!");
            });
            _this.div({
              "class": 'panel-heading wrong-path'
            }, function() {
              _this.code('git');
              _this.text("can't be found at ");
              _this.code(atom.config.get('merge-conflicts.gitPath'));
              return _this.text('!');
            });
            return _this.div({
              "class": 'panel-body'
            }, function() {
              _this.div({
                "class": 'block'
              }, 'Please specify the correct path in the merge-conflicts package settings.');
              return _this.div({
                "class": 'block'
              }, function() {
                _this.button({
                  "class": 'btn btn-error inline-block-tight',
                  click: 'openSettings'
                }, 'Open Settings');
                return _this.button({
                  "class": 'btn inline-block-tight',
                  click: 'notRightNow'
                }, 'Not Right Now');
              });
            });
          });
        };
      })(this));
    };

    GitNotFoundErrorView.prototype.initialize = function(err) {
      if (atom.config.get('merge-conflicts.gitPath')) {
        this.find('.no-path').hide();
        return this.find('.wrong-path').show();
      } else {
        this.find('.no-path').show();
        return this.find('.wrong-path').hide();
      }
    };

    GitNotFoundErrorView.prototype.openSettings = function() {
      atom.workspace.open('atom://config/packages');
      return this.remove();
    };

    GitNotFoundErrorView.prototype.notRightNow = function() {
      return this.remove();
    };

    return GitNotFoundErrorView;

  })(View);

  module.exports = {
    handleErr: function(err) {
      if (err == null) {
        return false;
      }
      if (err instanceof GitNotFoundError) {
        atom.workspace.addTopPanel({
          item: new GitNotFoundErrorView(err)
        });
      } else {
        atom.notifications.addError(err.message);
        console.error(err.message, err.trace);
      }
      return true;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9lcnJvci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw0Q0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsV0FBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNDLG1CQUFvQixPQUFBLENBQVEsZUFBUixFQUFwQixnQkFERCxDQUFBOztBQUFBLEVBR007QUFFSiwyQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxvQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEdBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxzRUFBUDtPQUFMLEVBQW9GLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2xGLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO1dBQUwsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLFlBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLHVCQUFQO2FBQUwsRUFBcUMsU0FBQSxHQUFBO0FBQ25DLGNBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxLQUFOLENBQUEsQ0FBQTtxQkFDQSxLQUFDLENBQUEsSUFBRCxDQUFNLGlEQUFOLEVBRm1DO1lBQUEsQ0FBckMsQ0FBQSxDQUFBO0FBQUEsWUFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sMEJBQVA7YUFBTCxFQUF3QyxTQUFBLEdBQUE7QUFDdEMsY0FBQSxLQUFDLENBQUEsSUFBRCxDQUFNLEtBQU4sQ0FBQSxDQUFBO0FBQUEsY0FDQSxLQUFDLENBQUEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/error-view.coffee
