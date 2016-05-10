(function() {
  var GitBridge, MergeState;

  GitBridge = require('./git-bridge').GitBridge;

  MergeState = (function() {
    function MergeState(conflicts, repo, isRebase) {
      this.conflicts = conflicts;
      this.repo = repo;
      this.isRebase = isRebase;
    }

    MergeState.prototype.conflictPaths = function() {
      var c, _i, _len, _ref, _results;
      _ref = this.conflicts;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push(c.path);
      }
      return _results;
    };

    MergeState.prototype.reread = function(callback) {
      return GitBridge.withConflicts(this.repo, (function(_this) {
        return function(err, conflicts) {
          _this.conflicts = conflicts;
          return callback(err, _this);
        };
      })(this));
    };

    MergeState.prototype.isEmpty = function() {
      return this.conflicts.length === 0;
    };

    MergeState.read = function(repo, callback) {
      var isr;
      isr = GitBridge.isRebasing();
      return GitBridge.withConflicts(repo, function(err, cs) {
        if (err != null) {
          return callback(err, null);
        } else {
          return callback(null, new MergeState(cs, repo, isr));
        }
      });
    };

    return MergeState;

  })();

  module.exports = {
    MergeState: MergeState
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvbWVyZ2Utc3RhdGUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUMsWUFBYSxPQUFBLENBQVEsY0FBUixFQUFiLFNBQUQsQ0FBQTs7QUFBQSxFQUVNO0FBRVMsSUFBQSxvQkFBRSxTQUFGLEVBQWMsSUFBZCxFQUFxQixRQUFyQixHQUFBO0FBQWdDLE1BQS9CLElBQUMsQ0FBQSxZQUFBLFNBQThCLENBQUE7QUFBQSxNQUFuQixJQUFDLENBQUEsT0FBQSxJQUFrQixDQUFBO0FBQUEsTUFBWixJQUFDLENBQUEsV0FBQSxRQUFXLENBQWhDO0lBQUEsQ0FBYjs7QUFBQSx5QkFFQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQUcsVUFBQSwyQkFBQTtBQUFBO0FBQUE7V0FBQSwyQ0FBQTtxQkFBQTtBQUFBLHNCQUFBLENBQUMsQ0FBQyxLQUFGLENBQUE7QUFBQTtzQkFBSDtJQUFBLENBRmYsQ0FBQTs7QUFBQSx5QkFJQSxNQUFBLEdBQVEsU0FBQyxRQUFELEdBQUE7YUFDTixTQUFTLENBQUMsYUFBVixDQUF3QixJQUFDLENBQUEsSUFBekIsRUFBK0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxFQUFPLFNBQVAsR0FBQTtBQUM3QixVQURtQyxLQUFDLENBQUEsWUFBQSxTQUNwQyxDQUFBO2lCQUFBLFFBQUEsQ0FBUyxHQUFULEVBQWMsS0FBZCxFQUQ2QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQS9CLEVBRE07SUFBQSxDQUpSLENBQUE7O0FBQUEseUJBUUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsTUFBWCxLQUFxQixFQUF4QjtJQUFBLENBUlQsQ0FBQTs7QUFBQSxJQVVBLFVBQUMsQ0FBQSxJQUFELEdBQU8sU0FBQyxJQUFELEVBQU8sUUFBUCxHQUFBO0FBQ0wsVUFBQSxHQUFBO0FBQUEsTUFBQSxHQUFBLEdBQU0sU0FBUyxDQUFDLFVBQVYsQ0FBQSxDQUFOLENBQUE7YUFDQSxTQUFTLENBQUMsYUFBVixDQUF3QixJQUF4QixFQUE4QixTQUFDLEdBQUQsRUFBTSxFQUFOLEdBQUE7QUFDNUIsUUFBQSxJQUFHLFdBQUg7aUJBQ0UsUUFBQSxDQUFTLEdBQVQsRUFBYyxJQUFkLEVBREY7U0FBQSxNQUFBO2lCQUdFLFFBQUEsQ0FBUyxJQUFULEVBQW1CLElBQUEsVUFBQSxDQUFXLEVBQVgsRUFBZSxJQUFmLEVBQXFCLEdBQXJCLENBQW5CLEVBSEY7U0FENEI7TUFBQSxDQUE5QixFQUZLO0lBQUEsQ0FWUCxDQUFBOztzQkFBQTs7TUFKRixDQUFBOztBQUFBLEVBc0JBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFVBQUEsRUFBWSxVQUFaO0dBdkJGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/merge-state.coffee
