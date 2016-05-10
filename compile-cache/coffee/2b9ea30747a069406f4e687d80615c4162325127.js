(function() {
  var BufferedProcess, GitOps, path;

  GitOps = require('../lib/git/shellout');

  BufferedProcess = require('atom').BufferedProcess;

  path = require('path');

  describe('GitBridge', function() {
    var context, gitWorkDir;
    gitWorkDir = "/fake/gitroot/";
    context = [][0];
    beforeEach(function() {
      atom.config.set('merge-conflicts.gitPath', '/usr/bin/git');
      return waitsForPromise(function() {
        return GitOps.getGitContext().then(function(c) {
          context = c;
          return context.workingDirPath = gitWorkDir;
        });
      });
    });
    it('checks git status for merge conflicts', function() {
      var a, c, conflicts, o, _ref;
      _ref = [], c = _ref[0], a = _ref[1], o = _ref[2];
      context.mockProcess(function(_arg) {
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
      });
      conflicts = [];
      waitsForPromise(function() {
        return context.readConflicts().then(function(cs) {
          return conflicts = cs;
        })["catch"](function(e) {
          throw e;
        });
      });
      return runs(function() {
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
    });
    describe('isStaged', function() {
      var statusMeansStaged;
      statusMeansStaged = function(status, checkPath) {
        if (checkPath == null) {
          checkPath = 'lib/file2.txt';
        }
        context.mockProcess(function(_arg) {
          var exit, stdout;
          stdout = _arg.stdout, exit = _arg.exit;
          stdout("" + status + " lib/file2.txt");
          exit(0);
          return {
            process: {
              on: function(callback) {}
            }
          };
        });
        return context.isStaged(checkPath);
      };
      it('is true if already resolved', function() {
        return waitsForPromise(function() {
          return statusMeansStaged('M ').then(function(s) {
            return expect(s).toBe(true);
          });
        });
      });
      it('is true if resolved as ours', function() {
        return waitsForPromise(function() {
          return statusMeansStaged(' M', 'lib/file1.txt').then(function(s) {
            return expect(s).toBe(true);
          });
        });
      });
      it('is false if still in conflict', function() {
        return waitsForPromise(function() {
          return statusMeansStaged('UU').then(function(s) {
            return expect(s).toBe(false);
          });
        });
      });
      return it('is false if resolved, but then modified', function() {
        return waitsForPromise(function() {
          return statusMeansStaged('MM').then(function(s) {
            return expect(s).toBe(false);
          });
        });
      });
    });
    it('checks out "our" version of a file from the index', function() {
      var a, c, called, o, _ref;
      _ref = [], c = _ref[0], a = _ref[1], o = _ref[2];
      context.mockProcess(function(_arg) {
        var args, command, exit, options, _ref1;
        command = _arg.command, args = _arg.args, options = _arg.options, exit = _arg.exit;
        _ref1 = [command, args, options], c = _ref1[0], a = _ref1[1], o = _ref1[2];
        exit(0);
        return {
          process: {
            on: function(callback) {}
          }
        };
      });
      called = false;
      waitsForPromise(function() {
        return context.checkoutSide('ours', 'lib/file1.txt').then(function() {
          return called = true;
        });
      });
      return runs(function() {
        expect(called).toBe(true);
        expect(c).toBe('/usr/bin/git');
        expect(a).toEqual(['checkout', '--ours', 'lib/file1.txt']);
        return expect(o).toEqual({
          cwd: gitWorkDir
        });
      });
    });
    it('stages changes to a file', function() {
      var called, p;
      p = "";
      context.repository.repo.add = function(path) {
        return p = path;
      };
      called = false;
      waitsForPromise(function() {
        return context.add('lib/file1.txt').then(function() {
          return called = true;
        });
      });
      return runs(function() {
        expect(called).toBe(true);
        return expect(p).toBe('lib/file1.txt');
      });
    });
    return describe('rebase detection', function() {
      var withRoot;
      withRoot = function(gitDir, callback) {
        var fullDir, saved;
        fullDir = path.join(atom.project.getDirectories()[0].getPath(), gitDir);
        saved = context.repository.getPath;
        context.repository.getPath = function() {
          return fullDir;
        };
        callback();
        return context.repository.getPath = saved;
      };
      it('recognizes a non-interactive rebase', function() {
        return withRoot('rebasing.git', function() {
          return expect(context.isRebasing()).toBe(true);
        });
      });
      it('recognizes an interactive rebase', function() {
        return withRoot('irebasing.git', function() {
          return expect(context.isRebasing()).toBe(true);
        });
      });
      return it('returns false if not rebasing', function() {
        return withRoot('merging.git', function() {
          return expect(context.isRebasing()).toBe(false);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9zcGVjL2dpdC1zaGVsbG91dC1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2QkFBQTs7QUFBQSxFQUFBLE1BQUEsR0FBUyxPQUFBLENBQVEscUJBQVIsQ0FBVCxDQUFBOztBQUFBLEVBQ0Msa0JBQW1CLE9BQUEsQ0FBUSxNQUFSLEVBQW5CLGVBREQsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJQSxRQUFBLENBQVMsV0FBVCxFQUFzQixTQUFBLEdBQUE7QUFFcEIsUUFBQSxtQkFBQTtBQUFBLElBQUEsVUFBQSxHQUFhLGdCQUFiLENBQUE7QUFBQSxJQUVDLFVBQVcsS0FGWixDQUFBO0FBQUEsSUFJQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IseUJBQWhCLEVBQTJDLGNBQTNDLENBQUEsQ0FBQTthQUVBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsTUFBTSxDQUFDLGFBQVAsQ0FBQSxDQUNBLENBQUMsSUFERCxDQUNNLFNBQUMsQ0FBRCxHQUFBO0FBQ0osVUFBQSxPQUFBLEdBQVUsQ0FBVixDQUFBO2lCQUNBLE9BQU8sQ0FBQyxjQUFSLEdBQXlCLFdBRnJCO1FBQUEsQ0FETixFQURjO01BQUEsQ0FBaEIsRUFIUztJQUFBLENBQVgsQ0FKQSxDQUFBO0FBQUEsSUFhQSxFQUFBLENBQUcsdUNBQUgsRUFBNEMsU0FBQSxHQUFBO0FBQzFDLFVBQUEsd0JBQUE7QUFBQSxNQUFBLE9BQVksRUFBWixFQUFDLFdBQUQsRUFBSSxXQUFKLEVBQU8sV0FBUCxDQUFBO0FBQUEsTUFDQSxP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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/spec/git-shellout-spec.coffee
