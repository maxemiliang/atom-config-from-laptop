(function() {
  var MergeState, path;

  path = require('path');

  MergeState = (function() {
    function MergeState(conflicts, context, isRebase) {
      this.conflicts = conflicts;
      this.context = context;
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
      return this.context.readConflicts().then((function(_this) {
        return function(conflicts) {
          _this.conflicts = conflicts;
          return callback(null, _this);
        };
      })(this))["catch"]((function(_this) {
        return function(err) {
          return callback(err, _this);
        };
      })(this));
    };

    MergeState.prototype.isEmpty = function() {
      return this.conflicts.length === 0;
    };

    MergeState.prototype.relativize = function(filePath) {
      return this.context.workingDirectory.relativize(filePath);
    };

    MergeState.prototype.join = function(relativePath) {
      return path.join(this.context.workingDirPath, relativePath);
    };

    MergeState.read = function(context, callback) {
      var isr;
      isr = context.isRebasing();
      return context.readConflicts().then(function(cs) {
        return callback(null, new MergeState(cs, context, isr));
      })["catch"](function(err) {
        return callback(err, null);
      });
    };

    return MergeState;

  })();

  module.exports = {
    MergeState: MergeState
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvbWVyZ2Utc3RhdGUuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUVNO0FBRVMsSUFBQSxvQkFBRSxTQUFGLEVBQWMsT0FBZCxFQUF3QixRQUF4QixHQUFBO0FBQW1DLE1BQWxDLElBQUMsQ0FBQSxZQUFBLFNBQWlDLENBQUE7QUFBQSxNQUF0QixJQUFDLENBQUEsVUFBQSxPQUFxQixDQUFBO0FBQUEsTUFBWixJQUFDLENBQUEsV0FBQSxRQUFXLENBQW5DO0lBQUEsQ0FBYjs7QUFBQSx5QkFFQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQUcsVUFBQSwyQkFBQTtBQUFBO0FBQUE7V0FBQSwyQ0FBQTtxQkFBQTtBQUFBLHNCQUFBLENBQUMsQ0FBQyxLQUFGLENBQUE7QUFBQTtzQkFBSDtJQUFBLENBRmYsQ0FBQTs7QUFBQSx5QkFJQSxNQUFBLEdBQVEsU0FBQyxRQUFELEdBQUE7YUFDTixJQUFDLENBQUEsT0FBTyxDQUFDLGFBQVQsQ0FBQSxDQUNBLENBQUMsSUFERCxDQUNNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFFLFNBQUYsR0FBQTtBQUNKLFVBREssS0FBQyxDQUFBLFlBQUEsU0FDTixDQUFBO2lCQUFBLFFBQUEsQ0FBUyxJQUFULEVBQWUsS0FBZixFQURJO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FETixDQUdBLENBQUMsT0FBRCxDQUhBLENBR08sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxHQUFBO2lCQUNMLFFBQUEsQ0FBUyxHQUFULEVBQWMsS0FBZCxFQURLO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FIUCxFQURNO0lBQUEsQ0FKUixDQUFBOztBQUFBLHlCQVdBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLE1BQVgsS0FBcUIsRUFBeEI7SUFBQSxDQVhULENBQUE7O0FBQUEseUJBYUEsVUFBQSxHQUFZLFNBQUMsUUFBRCxHQUFBO2FBQWMsSUFBQyxDQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxVQUExQixDQUFxQyxRQUFyQyxFQUFkO0lBQUEsQ0FiWixDQUFBOztBQUFBLHlCQWVBLElBQUEsR0FBTSxTQUFDLFlBQUQsR0FBQTthQUFrQixJQUFJLENBQUMsSUFBTCxDQUFVLElBQUMsQ0FBQSxPQUFPLENBQUMsY0FBbkIsRUFBbUMsWUFBbkMsRUFBbEI7SUFBQSxDQWZOLENBQUE7O0FBQUEsSUFpQkEsVUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLE9BQUQsRUFBVSxRQUFWLEdBQUE7QUFDTCxVQUFBLEdBQUE7QUFBQSxNQUFBLEdBQUEsR0FBTSxPQUFPLENBQUMsVUFBUixDQUFBLENBQU4sQ0FBQTthQUNBLE9BQU8sQ0FBQyxhQUFSLENBQUEsQ0FDQSxDQUFDLElBREQsQ0FDTSxTQUFDLEVBQUQsR0FBQTtlQUNKLFFBQUEsQ0FBUyxJQUFULEVBQW1CLElBQUEsVUFBQSxDQUFXLEVBQVgsRUFBZSxPQUFmLEVBQXdCLEdBQXhCLENBQW5CLEVBREk7TUFBQSxDQUROLENBR0EsQ0FBQyxPQUFELENBSEEsQ0FHTyxTQUFDLEdBQUQsR0FBQTtlQUNMLFFBQUEsQ0FBUyxHQUFULEVBQWMsSUFBZCxFQURLO01BQUEsQ0FIUCxFQUZLO0lBQUEsQ0FqQlAsQ0FBQTs7c0JBQUE7O01BSkYsQ0FBQTs7QUFBQSxFQTZCQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxVQUFBLEVBQVksVUFBWjtHQTlCRixDQUFBO0FBQUEiCn0=

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/merge-state.coffee
