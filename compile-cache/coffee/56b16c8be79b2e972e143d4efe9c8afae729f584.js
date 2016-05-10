(function() {
  var $, CompositeDisposable, ConflictedEditor, GitBridge, MergeConflictsView, MergeState, ResolverView, View, handleErr, path, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('space-pen'), $ = _ref.$, View = _ref.View;

  CompositeDisposable = require('atom').CompositeDisposable;

  _ = require('underscore-plus');

  path = require('path');

  GitBridge = require('../git-bridge').GitBridge;

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
          p = _this.state.repo.relativize(event.file);
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
      fullPath = path.join(this.state.repo.getWorkingDirectory(), repoPath);
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
          return GitBridge.checkoutSide(_this.state.repo, side, p, function(err) {
            var full;
            if (handleErr(err)) {
              return;
            }
            full = path.join(_this.state.repo.getWorkingDirectory(), p);
            _this.pkg.didResolveConflict({
              file: full,
              total: 1,
              resolved: 1
            });
            return atom.workspace.open(p);
          });
        };
      })(this);
    };

    MergeConflictsView.prototype.stageFile = function(event, element) {
      var e, filePath, repoPath, _i, _len, _ref1;
      repoPath = element.closest('li').data('path');
      filePath = path.join(GitBridge.getActiveRepo().getWorkingDirectory(), repoPath);
      _ref1 = atom.workspace.getTextEditors();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        e = _ref1[_i];
        if (e.getPath() === filePath) {
          e.save();
        }
      }
      return GitBridge.add(this.state.repo, repoPath, (function(_this) {
        return function(err) {
          if (handleErr(err)) {
            return;
          }
          return _this.pkg.didStageFile({
            file: filePath
          });
        };
      })(this));
    };

    MergeConflictsView.detect = function(pkg) {
      var repo;
      if (this.instance != null) {
        return;
      }
      repo = GitBridge.getActiveRepo();
      if (repo == null) {
        atom.notifications.addWarning("No git repository found", {
          detail: "Tip: if you have multiple projects open, open an editor in the one containing conflicts."
        });
        return;
      }
      return MergeState.read(repo, (function(_this) {
        return function(err, state) {
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
        };
      })(this));
    };

    MergeConflictsView.markConflictsIn = function(state, editor, pkg) {
      var e, fullPath, repoPath;
      if (state.isEmpty()) {
        return;
      }
      fullPath = editor.getPath();
      repoPath = state.repo.relativize(fullPath);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvdmlldy9tZXJnZS1jb25mbGljdHMtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUlBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFBLE9BQVksT0FBQSxDQUFRLFdBQVIsQ0FBWixFQUFDLFNBQUEsQ0FBRCxFQUFJLFlBQUEsSUFBSixDQUFBOztBQUFBLEVBQ0Msc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQURELENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBRkosQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUhQLENBQUE7O0FBQUEsRUFLQyxZQUFhLE9BQUEsQ0FBUSxlQUFSLEVBQWIsU0FMRCxDQUFBOztBQUFBLEVBTUMsYUFBYyxPQUFBLENBQVEsZ0JBQVIsRUFBZCxVQU5ELENBQUE7O0FBQUEsRUFPQyxtQkFBb0IsT0FBQSxDQUFRLHNCQUFSLEVBQXBCLGdCQVBELENBQUE7O0FBQUEsRUFTQyxlQUFnQixPQUFBLENBQVEsaUJBQVIsRUFBaEIsWUFURCxDQUFBOztBQUFBLEVBVUMsWUFBYSxPQUFBLENBQVEsY0FBUixFQUFiLFNBVkQsQ0FBQTs7QUFBQSxFQVlNO0FBRUoseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLFFBQUEsR0FBVSxJQUFWLENBQUE7O0FBQUEsSUFFQSxrQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsRUFBUSxHQUFSLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8seURBQVA7T0FBTCxFQUF1RSxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/view/merge-conflicts-view.coffee
