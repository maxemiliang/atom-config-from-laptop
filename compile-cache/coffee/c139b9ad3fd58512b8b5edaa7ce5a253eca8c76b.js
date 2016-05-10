(function() {
  var CompositeDisposable, Emitter, GitBridge, MergeConflictsView, handleErr, _ref;

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Emitter = _ref.Emitter;

  GitBridge = require('./git-bridge').GitBridge;

  MergeConflictsView = require('./view/merge-conflicts-view').MergeConflictsView;

  handleErr = require('./view/error-view').handleErr;

  module.exports = {
    activate: function(state) {
      var pkgEmitter;
      this.subs = new CompositeDisposable;
      this.emitter = new Emitter;
      pkgEmitter = {
        onDidResolveConflict: (function(_this) {
          return function(callback) {
            return _this.onDidResolveConflict(callback);
          };
        })(this),
        didResolveConflict: (function(_this) {
          return function(event) {
            return _this.emitter.emit('did-resolve-conflict', event);
          };
        })(this),
        onDidStageFile: (function(_this) {
          return function(callback) {
            return _this.onDidStageFile(callback);
          };
        })(this),
        didStageFile: (function(_this) {
          return function(event) {
            return _this.emitter.emit('did-stage-file', event);
          };
        })(this),
        onDidQuitConflictResolution: (function(_this) {
          return function(callback) {
            return _this.onDidQuitConflictResolution(callback);
          };
        })(this),
        didQuitConflictResolution: (function(_this) {
          return function() {
            return _this.emitter.emit('did-quit-conflict-resolution');
          };
        })(this),
        onDidCompleteConflictResolution: (function(_this) {
          return function(callback) {
            return _this.onDidCompleteConflictResolution(callback);
          };
        })(this),
        didCompleteConflictResolution: (function(_this) {
          return function() {
            return _this.emitter.emit('did-complete-conflict-resolution');
          };
        })(this)
      };
      return this.subs.add(atom.commands.add('atom-workspace', 'merge-conflicts:detect', function() {
        return GitBridge.locateGitAnd(function(err) {
          if (err != null) {
            return handleErr(err);
          }
          return MergeConflictsView.detect(pkgEmitter);
        });
      }));
    },
    deactivate: function() {
      this.subs.dispose();
      return this.emitter.dispose();
    },
    config: {
      gitPath: {
        type: 'string',
        "default": '',
        description: 'Absolute path to your git executable.'
      }
    },
    onDidResolveConflict: function(callback) {
      return this.emitter.on('did-resolve-conflict', callback);
    },
    onDidStageFile: function(callback) {
      return this.emitter.on('did-stage-file', callback);
    },
    onDidQuitConflictResolution: function(callback) {
      return this.emitter.on('did-quit-conflict-resolution', callback);
    },
    onDidCompleteConflictResolution: function(callback) {
      return this.emitter.on('did-complete-conflict-resolution', callback);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEVBQUE7O0FBQUEsRUFBQSxPQUFpQyxPQUFBLENBQVEsTUFBUixDQUFqQyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGVBQUEsT0FBdEIsQ0FBQTs7QUFBQSxFQUVDLFlBQWEsT0FBQSxDQUFRLGNBQVIsRUFBYixTQUZELENBQUE7O0FBQUEsRUFJQyxxQkFBc0IsT0FBQSxDQUFRLDZCQUFSLEVBQXRCLGtCQUpELENBQUE7O0FBQUEsRUFLQyxZQUFhLE9BQUEsQ0FBUSxtQkFBUixFQUFiLFNBTEQsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLFVBQUEsVUFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxHQUFBLENBQUEsbUJBQVIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxHQUFBLENBQUEsT0FEWCxDQUFBO0FBQUEsTUFHQSxVQUFBLEdBQ0U7QUFBQSxRQUFBLG9CQUFBLEVBQXNCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxRQUFELEdBQUE7bUJBQWMsS0FBQyxDQUFBLG9CQUFELENBQXNCLFFBQXRCLEVBQWQ7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0QjtBQUFBLFFBQ0Esa0JBQUEsRUFBb0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLEtBQUQsR0FBQTttQkFBVyxLQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxzQkFBZCxFQUFzQyxLQUF0QyxFQUFYO1VBQUEsRUFB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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/main.coffee
