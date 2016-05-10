(function() {
  var CompositeDisposable, GitBridge, ResolverView, View, handleErr,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  View = require('space-pen').View;

  GitBridge = require('../git-bridge').GitBridge;

  handleErr = require('./error-view').handleErr;

  ResolverView = (function(_super) {
    __extends(ResolverView, _super);

    function ResolverView() {
      return ResolverView.__super__.constructor.apply(this, arguments);
    }

    ResolverView.content = function(editor, state, pkg) {
      return this.div({
        "class": 'overlay from-top resolver'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'block text-highlight'
          }, "We're done here");
          _this.div({
            "class": 'block'
          }, function() {
            _this.div({
              "class": 'block text-info'
            }, function() {
              return _this.text("You've dealt with all of the conflicts in this file.");
            });
            return _this.div({
              "class": 'block text-info'
            }, function() {
              _this.span({
                outlet: 'actionText'
              }, 'Save and stage');
              return _this.text(' this file for commit?');
            });
          });
          _this.div({
            "class": 'pull-left'
          }, function() {
            return _this.button({
              "class": 'btn btn-primary',
              click: 'dismiss'
            }, 'Maybe Later');
          });
          return _this.div({
            "class": 'pull-right'
          }, function() {
            return _this.button({
              "class": 'btn btn-primary',
              click: 'resolve'
            }, 'Stage');
          });
        };
      })(this));
    };

    ResolverView.prototype.initialize = function(editor, state, pkg) {
      this.editor = editor;
      this.state = state;
      this.pkg = pkg;
      this.subs = new CompositeDisposable();
      this.refresh();
      this.subs.add(this.editor.onDidSave((function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this)));
      return this.subs.add(atom.commands.add(this.element, 'merge-conflicts:quit', (function(_this) {
        return function() {
          return _this.dismiss();
        };
      })(this)));
    };

    ResolverView.prototype.detached = function() {
      return this.subs.dispose();
    };

    ResolverView.prototype.getModel = function() {
      return null;
    };

    ResolverView.prototype.relativePath = function() {
      return this.state.repo.relativize(this.editor.getURI());
    };

    ResolverView.prototype.refresh = function() {
      return GitBridge.isStaged(this.state.repo, this.relativePath(), (function(_this) {
        return function(err, staged) {
          var modified, needsSaved, needsStaged;
          if (handleErr(err)) {
            return;
          }
          modified = _this.editor.isModified();
          needsSaved = modified;
          needsStaged = modified || !staged;
          if (!(needsSaved || needsStaged)) {
            _this.hide('fast', function() {
              return this.remove();
            });
            _this.pkg.didStageFile({
              file: _this.editor.getURI()
            });
            return;
          }
          if (needsSaved) {
            return _this.actionText.text('Save and stage');
          } else if (needsStaged) {
            return _this.actionText.text('Stage');
          }
        };
      })(this));
    };

    ResolverView.prototype.resolve = function() {
      this.editor.save();
      return GitBridge.add(this.state.repo, this.relativePath(), (function(_this) {
        return function(err) {
          if (handleErr(err)) {
            return;
          }
          return _this.refresh();
        };
      })(this));
    };

    ResolverView.prototype.dismiss = function() {
      return this.hide('fast', (function(_this) {
        return function() {
          return _this.remove();
        };
      })(this));
    };

    return ResolverView;

  })(View);

  module.exports = {
    ResolverView: ResolverView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9yZXNvbHZlci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2REFBQTtJQUFBO21TQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQyxPQUFRLE9BQUEsQ0FBUSxXQUFSLEVBQVIsSUFERCxDQUFBOztBQUFBLEVBR0MsWUFBYSxPQUFBLENBQVEsZUFBUixFQUFiLFNBSEQsQ0FBQTs7QUFBQSxFQUtDLFlBQWEsT0FBQSxDQUFRLGNBQVIsRUFBYixTQUxELENBQUE7O0FBQUEsRUFRTTtBQUVKLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixHQUFoQixHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDJCQUFQO09BQUwsRUFBeUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN2QyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxzQkFBUDtXQUFMLEVBQW9DLGlCQUFwQyxDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO1dBQUwsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLFlBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLGlCQUFQO2FBQUwsRUFBK0IsU0FBQSxHQUFBO3FCQUM3QixLQUFDLENBQUEsSUFBRCxDQUFNLHNEQUFOLEVBRDZCO1lBQUEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/resolver-view.coffee
