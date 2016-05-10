(function() {
  var $, CompositeDisposable, ConflictedEditor, GitOps, MergeConflictsView, MergeState, ResolverView, View, handleErr, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('space-pen'), $ = _ref.$, View = _ref.View;

  CompositeDisposable = require('atom').CompositeDisposable;

  _ = require('underscore-plus');

  GitOps = require('../git').GitOps;

  MergeState = require('../merge-state').MergeState;

  ConflictedEditor = require('../conflicted-editor').ConflictedEditor;

  ResolverView = require('./resolver-view').ResolverView;

  handleErr = require('./error-view').handleErr;

  MergeConflictsView = (function(_super) {
    __extends(MergeConflictsView, _super);

    function MergeConflictsView() {
      return MergeConflictsView.__super__.constructor.apply(this, arguments);
    }

    MergeConflictsView.prototype.instance = null;

    MergeConflictsView.content = function(state, pkg) {
      return this.div({
        "class": 'merge-conflicts tool-panel panel-bottom padded clearfix'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, function() {
            _this.text('Conflicts');
            _this.span({
              "class": 'pull-right icon icon-fold',
              click: 'minimize'
            }, 'Hide');
            return _this.span({
              "class": 'pull-right icon icon-unfold',
              click: 'restore'
            }, 'Show');
          });
          return _this.div({
            outlet: 'body'
          }, function() {
            _this.div({
              "class": 'conflict-list'
            }, function() {
              return _this.ul({
                "class": 'block list-group',
                outlet: 'pathList'
              }, function() {
                var message, p, _i, _len, _ref1, _ref2, _results;
                _ref1 = state.conflicts;
                _results = [];
                for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                  _ref2 = _ref1[_i], p = _ref2.path, message = _ref2.message;
                  _results.push(_this.li({
                    click: 'navigate',
                    "data-path": p,
                    "class": 'list-item navigate'
                  }, function() {
                    _this.span({
                      "class": 'inline-block icon icon-diff-modified status-modified path'
                    }, p);
                    return _this.div({
                      "class": 'pull-right'
                    }, function() {
                      _this.button({
                        click: 'stageFile',
                        "class": 'btn btn-xs btn-success inline-block-tight stage-ready',
                        style: 'display: none'
                      }, 'Stage');
                      _this.span({
                        "class": 'inline-block text-subtle'
                      }, message);
                      _this.progress({
                        "class": 'inline-block',
                        max: 100,
                        value: 0
                      });
                      return _this.span({
                        "class": 'inline-block icon icon-dash staged'
                      });
                    });
                  }));
                }
                return _results;
              });
            });
            return _this.div({
              "class": 'footer block pull-right'
            }, function() {
              return _this.button({
                "class": 'btn btn-sm',
                click: 'quit'
              }, 'Quit');
            });
          });
        };
      })(this));
    };

    MergeConflictsView.prototype.initialize = function(state, pkg) {
      this.state = state;
      this.pkg = pkg;
      this.subs = new CompositeDisposable;
      this.subs.add(this.pkg.onDidResolveConflict((function(_this) {
        return function(event) {
          var found, li, listElement, p, progress, _i, _len, _ref1;
          p = _this.state.relativize(event.file);
          found = false;
          _ref1 = _this.pathList.children();
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            listElement = _ref1[_i];
            li = $(listElement);
            if (li.data('path') === p) {
              found = true;
              progress = li.find('progress')[0];
              progress.max = event.total;
              progress.value = event.resolved;
              if (event.total === event.resolved) {
                li.find('.stage-ready').show();
              }
            }
          }
          if (!found) {
            return console.error("Unrecognized conflict path: " + p);
          }
        };
      })(this)));
      this.subs.add(this.pkg.onDidStageFile((function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this)));
      return this.subs.add(atom.commands.add(this.element, {
        'merge-conflicts:entire-file-ours': this.sideResolver('ours'),
        'merge-conflicts:entire-file-theirs': this.sideResolver('theirs')
      }));
    };

    MergeConflictsView.prototype.navigate = function(event, element) {
      var fullPath, repoPath;
      repoPath = element.find(".path").text();
      fullPath = this.state.join(repoPath);
      return atom.workspace.open(fullPath);
    };

    MergeConflictsView.prototype.minimize = function() {
      this.addClass('minimized');
      return this.body.hide('fast');
    };

    MergeConflictsView.prototype.restore = function() {
      this.removeClass('minimized');
      return this.body.show('fast');
    };

    MergeConflictsView.prototype.quit = function() {
      var detail;
      this.pkg.didQuitConflictResolution();
      detail = "Careful, you've still got conflict markers left!\n";
      if (this.state.isRebase) {
        detail += '"git rebase --abort"';
      } else {
        detail += '"git merge --abort"';
      }
      detail += " if you just want to give up on this one.";
      return this.finish(function() {
        return atom.notifications.addWarning("Maybe Later", {
          detail: detail,
          dismissable: true
        });
      });
    };

    MergeConflictsView.prototype.refresh = function() {
      return this.state.reread((function(_this) {
        return function(err, state) {
          var detail, icon, item, p, _i, _len, _ref1;
          if (handleErr(err)) {
            return;
          }
          _ref1 = _this.pathList.find('li');
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            item = _ref1[_i];
            p = $(item).data('path');
            icon = $(item).find('.staged');
            icon.removeClass('icon-dash icon-check text-success');
            if (_.contains(_this.state.conflictPaths(), p)) {
              icon.addClass('icon-dash');
            } else {
              icon.addClass('icon-check text-success');
              _this.pathList.find("li[data-path='" + p + "'] .stage-ready").hide();
            }
          }
          if (_this.state.isEmpty()) {
            _this.pkg.didCompleteConflictResolution();
            detail = "That's everything. ";
            if (_this.state.isRebase) {
              detail += '"git rebase --continue" at will to resume rebasing.';
            } else {
              detail += '"git commit" at will to finish the merge.';
            }
            return _this.finish(function() {
              return atom.notifications.addSuccess("Merge Complete", {
                detail: detail,
                dismissable: true
              });
            });
          }
        };
      })(this));
    };

    MergeConflictsView.prototype.finish = function(andThen) {
      this.subs.dispose();
      this.hide('fast', (function(_this) {
        return function() {
          MergeConflictsView.instance = null;
          return _this.remove();
        };
      })(this));
      return andThen();
    };

    MergeConflictsView.prototype.sideResolver = function(side) {
      return (function(_this) {
        return function(event) {
          var p;
          p = $(event.target).closest('li').data('path');
          return _this.state.context.checkoutSide(side, p).then(function() {
            var full;
            full = this.state.join(p);
            this.pkg.didResolveConflict({
              file: full,
              total: 1,
              resolved: 1
            });
            return atom.workspace.open(p);
          })["catch"](function(err) {
            return handleErr(err);
          });
        };
      })(this);
    };

    MergeConflictsView.prototype.stageFile = function(event, element) {
      var e, filePath, repoPath, _i, _len, _ref1;
      repoPath = element.closest('li').data('path');
      filePath = this.state.join(repoPath);
      _ref1 = atom.workspace.getTextEditors();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        e = _ref1[_i];
        if (e.getPath() === filePath) {
          e.save();
        }
      }
      return this.state.context.add(repoPath).then((function(_this) {
        return function() {
          return _this.pkg.didStageFile({
            file: filePath
          });
        };
      })(this))["catch"](function(err) {
        return handleErr(err);
      });
    };

    MergeConflictsView.detect = function(pkg) {
      if (this.instance != null) {
        return;
      }
      return GitOps.getGitContext().then((function(_this) {
        return function(context) {
          if (context == null) {
            atom.notifications.addWarning("No git repository found", {
              detail: "Tip: if you have multiple projects open, open an editor in the one containing conflicts."
            });
            return;
          }
          return MergeState.read(context, function(err, state) {
            var view;
            if (handleErr(err)) {
              return;
            }
            if (!state.isEmpty()) {
              view = new MergeConflictsView(state, pkg);
              _this.instance = view;
              atom.workspace.addBottomPanel({
                item: view
              });
              return _this.instance.subs.add(atom.workspace.observeTextEditors(function(editor) {
                return _this.markConflictsIn(state, editor, pkg);
              }));
            } else {
              return atom.notifications.addInfo("Nothing to Merge", {
                detail: "No conflicts here!",
                dismissable: true
              });
            }
          });
        };
      })(this));
    };

    MergeConflictsView.markConflictsIn = function(state, editor, pkg) {
      var e, fullPath, repoPath;
      if (state.isEmpty()) {
        return;
      }
      fullPath = editor.getPath();
      repoPath = state.relativize(fullPath);
      if (repoPath == null) {
        return;
      }
      if (!_.contains(state.conflictPaths(), repoPath)) {
        return;
      }
      e = new ConflictedEditor(state, pkg, editor);
      return e.mark();
    };

    return MergeConflictsView;

  })(View);

  module.exports = {
    MergeConflictsView: MergeConflictsView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9tZXJnZS1jb25mbGljdHMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0hBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE9BQVksT0FBQSxDQUFRLFdBQVIsQ0FBWixFQUFDLFNBQUEsQ0FBRCxFQUFJLFlBQUEsSUFBSixDQUFBOztBQUFBLEVBQ0Msc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQURELENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBRkosQ0FBQTs7QUFBQSxFQUlDLFNBQVUsT0FBQSxDQUFRLFFBQVIsRUFBVixNQUpELENBQUE7O0FBQUEsRUFLQyxhQUFjLE9BQUEsQ0FBUSxnQkFBUixFQUFkLFVBTEQsQ0FBQTs7QUFBQSxFQU1DLG1CQUFvQixPQUFBLENBQVEsc0JBQVIsRUFBcEIsZ0JBTkQsQ0FBQTs7QUFBQSxFQVFDLGVBQWdCLE9BQUEsQ0FBUSxpQkFBUixFQUFoQixZQVJELENBQUE7O0FBQUEsRUFTQyxZQUFhLE9BQUEsQ0FBUSxjQUFSLEVBQWIsU0FURCxDQUFBOztBQUFBLEVBV007QUFFSix5Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsaUNBQUEsUUFBQSxHQUFVLElBQVYsQ0FBQTs7QUFBQSxJQUVBLGtCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsS0FBRCxFQUFRLEdBQVIsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyx5REFBUDtPQUFMLEVBQXVFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDckUsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/merge-conflicts-view.coffee
