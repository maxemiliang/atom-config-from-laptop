(function() {
  var GitBridge, ResolverView, util,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ResolverView = require('../../lib/view/resolver-view').ResolverView;

  GitBridge = require('../../lib/git-bridge').GitBridge;

  util = require('../util');

  describe('ResolverView', function() {
    var fakeEditor, pkg, state, view, _ref;
    _ref = [], view = _ref[0], fakeEditor = _ref[1], pkg = _ref[2];
    state = {
      repo: {
        getWorkingDirectory: function() {
          return "/fake/gitroot/";
        },
        relativize: function(filepath) {
          return filepath.slice("/fake/gitroot/".length);
        },
        repo: {
          add: function(filepath) {}
        }
      }
    };
    beforeEach(function() {
      var done;
      pkg = util.pkgEmitter();
      fakeEditor = {
        isModified: function() {
          return true;
        },
        getURI: function() {
          return '/fake/gitroot/lib/file1.txt';
        },
        save: function() {},
        onDidSave: function() {}
      };
      atom.config.set('merge-conflicts.gitPath', 'git');
      done = false;
      GitBridge.locateGitAnd(function(err) {
        if (err != null) {
          throw err;
        }
        return done = true;
      });
      waitsFor(function() {
        return done;
      });
      GitBridge.process = function(_arg) {
        var exit, stdout;
        stdout = _arg.stdout, exit = _arg.exit;
        stdout('UU lib/file1.txt');
        exit(0);
        return {
          process: {
            on: function(err) {}
          }
        };
      };
      return view = new ResolverView(fakeEditor, state, pkg);
    });
    it('begins needing both saving and staging', function() {
      view.refresh();
      return expect(view.actionText.text()).toBe('Save and stage');
    });
    it('shows if the file only needs staged', function() {
      fakeEditor.isModified = function() {
        return false;
      };
      view.refresh();
      return expect(view.actionText.text()).toBe('Stage');
    });
    return it('saves and stages the file', function() {
      var p;
      p = null;
      state.repo.repo.add = function(filepath) {
        return p = filepath;
      };
      GitBridge.process = function(_arg) {
        var args, command, exit, options, stdout;
        command = _arg.command, args = _arg.args, options = _arg.options, stdout = _arg.stdout, exit = _arg.exit;
        if (__indexOf.call(args, 'status') >= 0) {
          stdout('M  lib/file1.txt');
          exit(0);
        }
        return {
          process: {
            on: function(err) {}
          }
        };
      };
      spyOn(fakeEditor, 'save');
      view.resolve();
      expect(fakeEditor.save).toHaveBeenCalled();
      return expect(p).toBe('lib/file1.txt');
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9zcGVjL3ZpZXcvcmVzb2x2ZXItdmlldy1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSw2QkFBQTtJQUFBLHFKQUFBOztBQUFBLEVBQUMsZUFBZ0IsT0FBQSxDQUFRLDhCQUFSLEVBQWhCLFlBQUQsQ0FBQTs7QUFBQSxFQUVDLFlBQWEsT0FBQSxDQUFRLHNCQUFSLEVBQWIsU0FGRCxDQUFBOztBQUFBLEVBR0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxTQUFSLENBSFAsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyxjQUFULEVBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLGtDQUFBO0FBQUEsSUFBQSxPQUEwQixFQUExQixFQUFDLGNBQUQsRUFBTyxvQkFBUCxFQUFtQixhQUFuQixDQUFBO0FBQUEsSUFFQSxLQUFBLEdBQ0U7QUFBQSxNQUFBLElBQUEsRUFDRTtBQUFBLFFBQUEsbUJBQUEsRUFBcUIsU0FBQSxHQUFBO2lCQUFHLGlCQUFIO1FBQUEsQ0FBckI7QUFBQSxRQUNBLFVBQUEsRUFBWSxTQUFDLFFBQUQsR0FBQTtpQkFBYyxRQUFTLGdDQUF2QjtRQUFBLENBRFo7QUFBQSxRQUVBLElBQUEsRUFDRTtBQUFBLFVBQUEsR0FBQSxFQUFLLFNBQUMsUUFBRCxHQUFBLENBQUw7U0FIRjtPQURGO0tBSEYsQ0FBQTtBQUFBLElBU0EsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULFVBQUEsSUFBQTtBQUFBLE1BQUEsR0FBQSxHQUFNLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FBTixDQUFBO0FBQUEsTUFDQSxVQUFBLEdBQWE7QUFBQSxRQUNYLFVBQUEsRUFBWSxTQUFBLEdBQUE7aUJBQUcsS0FBSDtRQUFBLENBREQ7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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/spec/view/resolver-view-spec.coffee
