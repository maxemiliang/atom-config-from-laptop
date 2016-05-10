(function() {
  var BufferedProcess, GitBridge, GitCmd, GitNotFoundError, fs, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BufferedProcess = require('atom').BufferedProcess;

  fs = require('fs');

  path = require('path');

  GitNotFoundError = (function(_super) {
    __extends(GitNotFoundError, _super);

    function GitNotFoundError(message) {
      this.name = 'GitNotFoundError';
      GitNotFoundError.__super__.constructor.call(this, message);
    }

    return GitNotFoundError;

  })(Error);

  GitCmd = null;

  GitBridge = (function() {
    GitBridge.process = function(args) {
      return new BufferedProcess(args);
    };

    function GitBridge() {}

    GitBridge.locateGitAnd = function(callback) {
      var errorHandler, exitHandler, possiblePath, search;
      possiblePath = atom.config.get('merge-conflicts.gitPath');
      if (possiblePath) {
        GitCmd = possiblePath;
        callback(null);
        return;
      }
      search = ['git', '/usr/local/bin/git', '"%PROGRAMFILES%\\Git\\bin\\git"', '"%LOCALAPPDATA%\\Programs\\Git\\bin\\git"'];
      possiblePath = search.shift();
      exitHandler = (function(_this) {
        return function(code) {
          if (code === 0) {
            GitCmd = possiblePath;
            callback(null);
            return;
          }
          return errorHandler();
        };
      })(this);
      errorHandler = (function(_this) {
        return function(e) {
          if (e != null) {
            e.handle();
            e.error.code = "NOTENOENT";
          }
          possiblePath = search.shift();
          if (possiblePath == null) {
            callback(new GitNotFoundError("Please set the 'Git Path' correctly in the Atom settings ", "for the Merge Conflicts package."));
            return;
          }
          return _this.process({
            command: possiblePath,
            args: ['--version'],
            exit: exitHandler
          }).onWillThrowError(errorHandler);
        };
      })(this);
      return this.process({
        command: possiblePath,
        args: ['--version'],
        exit: exitHandler
      }).onWillThrowError(errorHandler);
    };

    GitBridge._getActivePath = function() {
      var _ref;
      return (_ref = atom.workspace.getActivePaneItem()) != null ? typeof _ref.getPath === "function" ? _ref.getPath() : void 0 : void 0;
    };

    GitBridge.getActiveRepo = function(filepath) {
      var repo, rootDir, rootDirIndex;
      rootDir = atom.project.relativizePath(filepath || this._getActivePath())[0];
      if (rootDir != null) {
        rootDirIndex = atom.project.getPaths().indexOf(rootDir);
        repo = atom.project.getRepositories()[rootDirIndex];
      } else {
        repo = atom.project.getRepositories()[0];
      }
      return repo;
    };

    GitBridge._repoWorkDir = function(filepath) {
      return this.getActiveRepo(filepath).getWorkingDirectory();
    };

    GitBridge._repoGitDir = function(filepath) {
      return this.getActiveRepo(filepath).getPath();
    };

    GitBridge._statusCodesFrom = function(chunk, handler) {
      var indexCode, line, m, p, workCode, __, _i, _len, _ref, _results;
      _ref = chunk.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        m = line.match(/^(.)(.) (.+)$/);
        if (m) {
          __ = m[0], indexCode = m[1], workCode = m[2], p = m[3];
          _results.push(handler(indexCode, workCode, p));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    GitBridge._checkHealth = function(callback) {
      if (!GitCmd) {
        console.trace("GitBridge method called before locateGitAnd");
        callback(new Error("GitBridge.locateGitAnd has not been called yet"));
        return false;
      }
      return true;
    };

    GitBridge.withConflicts = function(repo, handler) {
      var conflicts, errMessage, exitHandler, proc, stderrHandler, stdoutHandler;
      if (!this._checkHealth(handler)) {
        return;
      }
      conflicts = [];
      errMessage = [];
      stdoutHandler = (function(_this) {
        return function(chunk) {
          return _this._statusCodesFrom(chunk, function(index, work, p) {
            if (index === 'U' && work === 'U') {
              conflicts.push({
                path: p,
                message: 'both modified'
              });
            }
            if (index === 'A' && work === 'A') {
              return conflicts.push({
                path: p,
                message: 'both added'
              });
            }
          });
        };
      })(this);
      stderrHandler = function(line) {
        return errMessage.push(line);
      };
      exitHandler = function(code) {
        if (code === 0) {
          return handler(null, conflicts);
        } else {
          return handler(new Error(("abnormal git exit: " + code + "\n") + errMessage.join("\n")), null);
        }
      };
      proc = this.process({
        command: GitCmd,
        args: ['status', '--porcelain'],
        options: {
          cwd: repo.getWorkingDirectory()
        },
        stdout: stdoutHandler,
        stderr: stderrHandler,
        exit: exitHandler
      });
      return proc.process.on('error', function(err) {
        return handler(new GitNotFoundError(errMessage.join("\n")), null);
      });
    };

    GitBridge.isStaged = function(repo, filepath, handler) {
      var exitHandler, proc, staged, stderrHandler, stdoutHandler;
      if (!this._checkHealth(handler)) {
        return;
      }
      staged = true;
      stdoutHandler = (function(_this) {
        return function(chunk) {
          return _this._statusCodesFrom(chunk, function(index, work, p) {
            if (p === filepath) {
              return staged = index === 'M' && work === ' ';
            }
          });
        };
      })(this);
      stderrHandler = function(chunk) {
        return console.log("git status error: " + chunk);
      };
      exitHandler = function(code) {
        if (code === 0) {
          return handler(null, staged);
        } else {
          return handler(new Error("git status exit: " + code), null);
        }
      };
      proc = this.process({
        command: GitCmd,
        args: ['status', '--porcelain', filepath],
        options: {
          cwd: repo.getWorkingDirectory()
        },
        stdout: stdoutHandler,
        stderr: stderrHandler,
        exit: exitHandler
      });
      return proc.process.on('error', function(err) {
        return handler(new GitNotFoundError, null);
      });
    };

    GitBridge.checkoutSide = function(repo, sideName, filepath, callback) {
      var proc;
      if (!this._checkHealth(callback)) {
        return;
      }
      proc = this.process({
        command: GitCmd,
        args: ['checkout', "--" + sideName, filepath],
        options: {
          cwd: repo.getWorkingDirectory()
        },
        stdout: function(line) {
          return console.log(line);
        },
        stderr: function(line) {
          return console.log(line);
        },
        exit: function(code) {
          if (code === 0) {
            return callback(null);
          } else {
            return callback(new Error("git checkout exit: " + code));
          }
        }
      });
      return proc.process.on('error', function(err) {
        return callback(new GitNotFoundError);
      });
    };

    GitBridge.add = function(repo, filepath, callback) {
      repo.repo.add(filepath);
      return callback(null);
    };

    GitBridge.isRebasing = function() {
      var irebaseDir, irebaseStat, rebaseDir, rebaseStat, root;
      if (!this._checkHealth(function(e) {
        return atom.notifications.addError(e.message);
      })) {
        return;
      }
      root = this._repoGitDir();
      if (root == null) {
        return false;
      }
      rebaseDir = path.join(root, 'rebase-apply');
      rebaseStat = fs.statSyncNoException(rebaseDir);
      if (rebaseStat && rebaseStat.isDirectory()) {
        return true;
      }
      irebaseDir = path.join(root, 'rebase-merge');
      irebaseStat = fs.statSyncNoException(irebaseDir);
      return irebaseStat && irebaseStat.isDirectory();
    };

    return GitBridge;

  })();

  module.exports = {
    GitBridge: GitBridge,
    GitNotFoundError: GitNotFoundError
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvZ2l0LWJyaWRnZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsOERBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlNO0FBRUosdUNBQUEsQ0FBQTs7QUFBYSxJQUFBLDBCQUFDLE9BQUQsR0FBQTtBQUNYLE1BQUEsSUFBQyxDQUFBLElBQUQsR0FBUSxrQkFBUixDQUFBO0FBQUEsTUFDQSxrREFBTSxPQUFOLENBREEsQ0FEVztJQUFBLENBQWI7OzRCQUFBOztLQUY2QixNQUovQixDQUFBOztBQUFBLEVBV0EsTUFBQSxHQUFTLElBWFQsQ0FBQTs7QUFBQSxFQWNNO0FBR0osSUFBQSxTQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsSUFBRCxHQUFBO2FBQWMsSUFBQSxlQUFBLENBQWdCLElBQWhCLEVBQWQ7SUFBQSxDQUFWLENBQUE7O0FBRWEsSUFBQSxtQkFBQSxHQUFBLENBRmI7O0FBQUEsSUFJQSxTQUFDLENBQUEsWUFBRCxHQUFlLFNBQUMsUUFBRCxHQUFBO0FBRWIsVUFBQSwrQ0FBQTtBQUFBLE1BQUEsWUFBQSxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5QkFBaEIsQ0FBZixDQUFBO0FBQ0EsTUFBQSxJQUFHLFlBQUg7QUFDRSxRQUFBLE1BQUEsR0FBUyxZQUFULENBQUE7QUFBQSxRQUNBLFFBQUEsQ0FBUyxJQUFULENBREEsQ0FBQTtB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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/git-bridge.coffee
