(function() {
  var BufferedProcess, GitBridge, path;

  GitBridge = require('../lib/git-bridge').GitBridge;

  BufferedProcess = require('atom').BufferedProcess;

  path = require('path');

  describe('GitBridge', function() {
    var gitWorkDir, repo;
    gitWorkDir = "/fake/gitroot/";
    repo = {
      getWorkingDirectory: function() {
        return gitWorkDir;
      },
      relativize: function(fullpath) {
        if (fullpath.startsWith(gitWorkDir)) {
          return fullpath.slice(gitWorkDir.length);
        } else {
          return fullpath;
        }
      }
    };
    beforeEach(function() {
      var done;
      done = false;
      atom.config.set('merge-conflicts.gitPath', '/usr/bin/git');
      GitBridge.locateGitAnd(function(err) {
        if (err != null) {
          throw err;
        }
        return done = true;
      });
      return waitsFor(function() {
        return done;
      });
    });
    it('checks git status for merge conflicts', function() {
      var a, c, conflicts, o, _ref;
      _ref = [], c = _ref[0], a = _ref[1], o = _ref[2];
      GitBridge.process = function(_arg) {
        var args, command, exit, options, stderr, stdout, _ref1;
        command = _arg.command, args = _arg.args, options = _arg.options, stdout = _arg.stdout, stderr = _arg.stderr, exit = _arg.exit;
        _ref1 = [command, args, options], c = _ref1[0], a = _ref1[1], o = _ref1[2];
        stdout('UU lib/file0.rb');
        stdout('AA lib/file1.rb');
        stdout('M  lib/file2.rb');
        exit(0);
        return {
          process: {
            on: function(callback) {}
          }
        };
      };
      conflicts = [];
      GitBridge.withConflicts(repo, function(err, cs) {
        if (err) {
          throw err;
        }
        return conflicts = cs;
      });
      expect(conflicts).toEqual([
        {
          path: 'lib/file0.rb',
          message: 'both modified'
        }, {
          path: 'lib/file1.rb',
          message: 'both added'
        }
      ]);
      expect(c).toBe('/usr/bin/git');
      expect(a).toEqual(['status', '--porcelain']);
      return expect(o).toEqual({
        cwd: gitWorkDir
      });
    });
    describe('isStaged', function() {
      var statusMeansStaged;
      statusMeansStaged = function(status, checkPath) {
        var staged;
        if (checkPath == null) {
          checkPath = 'lib/file2.txt';
        }
        GitBridge.process = function(_arg) {
          var exit, stdout;
          stdout = _arg.stdout, exit = _arg.exit;
          stdout("" + status + " lib/file2.txt");
          exit(0);
          return {
            process: {
              on: function(callback) {}
            }
          };
        };
        staged = null;
        GitBridge.isStaged(repo, checkPath, function(err, b) {
          if (err) {
            throw err;
          }
          return staged = b;
        });
        return staged;
      };
      it('is true if already resolved', function() {
        return expect(statusMeansStaged('M ')).toBe(true);
      });
      it('is true if resolved as ours', function() {
        return expect(statusMeansStaged(' M', 'lib/file1.txt')).toBe(true);
      });
      it('is false if still in conflict', function() {
        return expect(statusMeansStaged('UU')).toBe(false);
      });
      return it('is false if resolved, but then modified', function() {
        return expect(statusMeansStaged('MM')).toBe(false);
      });
    });
    it('checks out "our" version of a file from the index', function() {
      var a, c, called, o, _ref;
      _ref = [], c = _ref[0], a = _ref[1], o = _ref[2];
      GitBridge.process = function(_arg) {
        var args, command, exit, options, _ref1;
        command = _arg.command, args = _arg.args, options = _arg.options, exit = _arg.exit;
        _ref1 = [command, args, options], c = _ref1[0], a = _ref1[1], o = _ref1[2];
        exit(0);
        return {
          process: {
            on: function(callback) {}
          }
        };
      };
      called = false;
      GitBridge.checkoutSide(repo, 'ours', 'lib/file1.txt', function(err) {
        if (err) {
          throw err;
        }
        return called = true;
      });
      expect(called).toBe(true);
      expect(c).toBe('/usr/bin/git');
      expect(a).toEqual(['checkout', '--ours', 'lib/file1.txt']);
      return expect(o).toEqual({
        cwd: gitWorkDir
      });
    });
    it('stages changes to a file', function() {
      var called, p;
      p = "";
      repo.repo = {
        add: function(path) {
          return p = path;
        }
      };
      called = false;
      GitBridge.add(repo, 'lib/file1.txt', function(err) {
        if (err) {
          throw err;
        }
        return called = true;
      });
      expect(called).toBe(true);
      return expect(p).toBe('lib/file1.txt');
    });
    return describe('rebase detection', function() {
      var withRoot;
      withRoot = function(gitDir, callback) {
        var fullDir, saved;
        fullDir = path.join(atom.project.getDirectories()[0].getPath(), gitDir);
        saved = GitBridge._repoGitDir;
        GitBridge._repoGitDir = function() {
          return fullDir;
        };
        callback();
        return GitBridge._repoGitDir = saved;
      };
      it('recognizes a non-interactive rebase', function() {
        return withRoot('rebasing.git', function() {
          return expect(GitBridge.isRebasing()).toBe(true);
        });
      });
      it('recognizes an interactive rebase', function() {
        return withRoot('irebasing.git', function() {
          return expect(GitBridge.isRebasing()).toBe(true);
        });
      });
      return it('returns false if not rebasing', function() {
        return withRoot('merging.git', function() {
          return expect(GitBridge.isRebasing()).toBe(false);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9zcGVjL2dpdC1icmlkZ2Utc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0NBQUE7O0FBQUEsRUFBQyxZQUFhLE9BQUEsQ0FBUSxtQkFBUixFQUFiLFNBQUQsQ0FBQTs7QUFBQSxFQUNDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQURELENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBSUEsUUFBQSxDQUFTLFdBQVQsRUFBc0IsU0FBQSxHQUFBO0FBRXBCLFFBQUEsZ0JBQUE7QUFBQSxJQUFBLFVBQUEsR0FBYSxnQkFBYixDQUFBO0FBQUEsSUFFQSxJQUFBLEdBQ0U7QUFBQSxNQUFBLG1CQUFBLEVBQXFCLFNBQUEsR0FBQTtlQUFHLFdBQUg7TUFBQSxDQUFyQjtBQUFBLE1BQ0EsVUFBQSxFQUFZLFNBQUMsUUFBRCxHQUFBO0FBQ1YsUUFBQSxJQUFHLFFBQVEsQ0FBQyxVQUFULENBQW9CLFVBQXBCLENBQUg7aUJBQ0UsUUFBUywwQkFEWDtTQUFBLE1BQUE7aUJBR0UsU0FIRjtTQURVO01BQUEsQ0FEWjtLQUhGLENBQUE7QUFBQSxJQVVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxLQUFQLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5QkFBaEIsRUFBMkMsY0FBM0MsQ0FEQSxDQUFBO0FBQUEsTUFHQSxTQUFTLENBQUMsWUFBVixDQUF1QixTQUFDLEdBQUQsR0FBQTtBQUNyQixRQUFBLElBQWEsV0FBYjtBQUFBLGdCQUFNLEdBQU4sQ0FBQTtT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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/spec/git-bridge-spec.coffee
