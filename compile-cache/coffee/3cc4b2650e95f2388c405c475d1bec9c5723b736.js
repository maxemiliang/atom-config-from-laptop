(function() {
  var Conflict, GitBridge, MergeConflictsView, MergeState, path, util, _;

  path = require('path');

  _ = require('underscore-plus');

  MergeConflictsView = require('../../lib/view/merge-conflicts-view').MergeConflictsView;

  MergeState = require('../../lib/merge-state').MergeState;

  Conflict = require('../../lib/conflict').Conflict;

  GitBridge = require('../../lib/git-bridge').GitBridge;

  util = require('../util');

  describe('MergeConflictsView', function() {
    var fullPath, pkg, repoPath, state, view, _ref;
    _ref = [], view = _ref[0], state = _ref[1], pkg = _ref[2];
    fullPath = function(fname) {
      return path.join(atom.project.getPaths()[0], 'path', fname);
    };
    repoPath = function(fname) {
      return atom.project.getRepositories()[0].relativize(fullPath(fname));
    };
    beforeEach(function() {
      var conflicts, done;
      pkg = util.pkgEmitter();
      GitBridge.process = function(_arg) {
        var exit;
        exit = _arg.exit;
        exit(0);
        return {
          process: {
            on: function(err) {}
          },
          onWillThrowError: function() {}
        };
      };
      done = false;
      GitBridge.locateGitAnd(function(err) {
        return done = true;
      });
      waitsFor(function() {
        return done;
      });
      conflicts = _.map(['file1.txt', 'file2.txt'], function(fname) {
        return {
          path: repoPath(fname),
          message: 'both modified'
        };
      });
      return util.openPath('triple-2way-diff.txt', function(editorView) {
        var repo;
        repo = atom.project.getRepositories()[0];
        state = new MergeState(conflicts, repo, false);
        conflicts = Conflict.all(state, editorView.getModel());
        return view = new MergeConflictsView(state, pkg);
      });
    });
    afterEach(function() {
      return pkg.dispose();
    });
    describe('conflict resolution progress', function() {
      var progressFor;
      progressFor = function(filename) {
        return view.pathList.find("li[data-path='" + (repoPath(filename)) + "'] progress")[0];
      };
      it('starts at zero', function() {
        expect(progressFor('file1.txt').value).toBe(0);
        return expect(progressFor('file2.txt').value).toBe(0);
      });
      return it('advances when requested', function() {
        var progress1;
        pkg.didResolveConflict({
          file: fullPath('file1.txt'),
          total: 3,
          resolved: 2
        });
        progress1 = progressFor('file1.txt');
        expect(progress1.value).toBe(2);
        return expect(progress1.max).toBe(3);
      });
    });
    describe('tracking the progress of staging', function() {
      var isMarkedWith;
      isMarkedWith = function(filename, icon) {
        var rs;
        rs = view.pathList.find("li[data-path='" + (repoPath(filename)) + "'] span.icon-" + icon);
        return rs.length !== 0;
      };
      it('starts without files marked as staged', function() {
        expect(isMarkedWith('file1.txt', 'dash')).toBe(true);
        return expect(isMarkedWith('file2.txt', 'dash')).toBe(true);
      });
      return it('marks files as staged on events', function() {
        GitBridge.process = function(_arg) {
          var exit, stdout;
          stdout = _arg.stdout, exit = _arg.exit;
          stdout("UU " + (repoPath('file2.txt')));
          exit(0);
          return {
            process: {
              on: function(err) {}
            }
          };
        };
        pkg.didStageFile({
          file: fullPath('file1.txt')
        });
        expect(isMarkedWith('file1.txt', 'check')).toBe(true);
        return expect(isMarkedWith('file2.txt', 'dash')).toBe(true);
      });
    });
    return it('minimizes and restores the view on request', function() {
      expect(view.hasClass('minimized')).toBe(false);
      view.minimize();
      expect(view.hasClass('minimized')).toBe(true);
      view.restore();
      return expect(view.hasClass('minimized')).toBe(false);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9zcGVjL3ZpZXcvbWVyZ2UtY29uZmxpY3RzLXZpZXctc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0VBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFHQyxxQkFBc0IsT0FBQSxDQUFRLHFDQUFSLEVBQXRCLGtCQUhELENBQUE7O0FBQUEsRUFLQyxhQUFjLE9BQUEsQ0FBUSx1QkFBUixFQUFkLFVBTEQsQ0FBQTs7QUFBQSxFQU1DLFdBQVksT0FBQSxDQUFRLG9CQUFSLEVBQVosUUFORCxDQUFBOztBQUFBLEVBT0MsWUFBYSxPQUFBLENBQVEsc0JBQVIsRUFBYixTQVBELENBQUE7O0FBQUEsRUFRQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFNBQVIsQ0FSUCxDQUFBOztBQUFBLEVBVUEsUUFBQSxDQUFTLG9CQUFULEVBQStCLFNBQUEsR0FBQTtBQUM3QixRQUFBLDBDQUFBO0FBQUEsSUFBQSxPQUFxQixFQUFyQixFQUFDLGNBQUQsRUFBTyxlQUFQLEVBQWMsYUFBZCxDQUFBO0FBQUEsSUFFQSxRQUFBLEdBQVcsU0FBQyxLQUFELEdBQUE7YUFDVCxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBYixDQUFBLENBQXdCLENBQUEsQ0FBQSxDQUFsQyxFQUFzQyxNQUF0QyxFQUE4QyxLQUE5QyxFQURTO0lBQUEsQ0FGWCxDQUFBO0FBQUEsSUFLQSxRQUFBLEdBQVcsU0FBQyxLQUFELEdBQUE7YUFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWIs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/spec/view/merge-conflicts-view-spec.coffee
