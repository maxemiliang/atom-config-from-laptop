(function() {
  var AncestorsMethods, ColorResultsElement, CompositeDisposable, EventsDelegation, Range, SpacePenDSL, fs, path, removeLeadingWhitespace, _, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  fs = require('fs-plus');

  path = require('path');

  _ref = require('atom'), Range = _ref.Range, CompositeDisposable = _ref.CompositeDisposable;

  _ref1 = require('atom-utils'), SpacePenDSL = _ref1.SpacePenDSL, EventsDelegation = _ref1.EventsDelegation, AncestorsMethods = _ref1.AncestorsMethods;

  removeLeadingWhitespace = function(string) {
    return string.replace(/^\s+/, '');
  };

  ColorResultsElement = (function(_super) {
    __extends(ColorResultsElement, _super);

    function ColorResultsElement() {
      return ColorResultsElement.__super__.constructor.apply(this, arguments);
    }

    SpacePenDSL.includeInto(ColorResultsElement);

    EventsDelegation.includeInto(ColorResultsElement);

    ColorResultsElement.content = function() {
      return this.tag('atom-panel', {
        outlet: 'pane',
        "class": 'preview-pane pane-item'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, function() {
            _this.span({
              outlet: 'previewCount',
              "class": 'preview-count inline-block'
            });
            return _this.div({
              outlet: 'loadingMessage',
              "class": 'inline-block'
            }, function() {
              _this.div({
                "class": 'loading loading-spinner-tiny inline-block'
              });
              return _this.div({
                outlet: 'searchedCountBlock',
                "class": 'inline-block'
              }, function() {
                _this.span({
                  outlet: 'searchedCount',
                  "class": 'searched-count'
                });
                return _this.span(' paths searched');
              });
            });
          });
          return _this.ol({
            outlet: 'resultsList',
            "class": 'search-colors-results results-view list-tree focusable-panel has-collapsable-children native-key-bindings',
            tabindex: -1
          });
        };
      })(this));
    };

    ColorResultsElement.prototype.createdCallback = function() {
      this.subscriptions = new CompositeDisposable;
      this.pathMapping = {};
      this.files = 0;
      this.colors = 0;
      this.loadingMessage.style.display = 'none';
      this.subscriptions.add(this.subscribeTo(this, '.list-nested-item > .list-item', {
        click: function(e) {
          var fileItem;
          e.stopPropagation();
          fileItem = AncestorsMethods.parents(e.target, '.list-nested-item')[0];
          return fileItem.classList.toggle('collapsed');
        }
      }));
      return this.subscriptions.add(this.subscribeTo(this, '.search-result', {
        click: (function(_this) {
          return function(e) {
            var fileItem, matchItem, pathAttribute, range;
            e.stopPropagation();
            matchItem = e.target.matches('.search-result') ? e.target : AncestorsMethods.parents(e.target, '.search-result')[0];
            fileItem = AncestorsMethods.parents(matchItem, '.list-nested-item')[0];
            range = Range.fromObject([matchItem.dataset.start.split(',').map(Number), matchItem.dataset.end.split(',').map(Number)]);
            pathAttribute = fileItem.dataset.path;
            return atom.workspace.open(_this.pathMapping[pathAttribute]).then(function(editor) {
              return editor.setSelectedBufferRange(range, {
                autoscroll: true
              });
            });
          };
        })(this)
      }));
    };

    ColorResultsElement.prototype.setModel = function(colorSearch) {
      this.colorSearch = colorSearch;
      this.subscriptions.add(this.colorSearch.onDidFindMatches((function(_this) {
        return function(result) {
          return _this.addFileResult(result);
        };
      })(this)));
      this.subscriptions.add(this.colorSearch.onDidCompleteSearch((function(_this) {
        return function() {
          return _this.searchComplete();
        };
      })(this)));
      return this.colorSearch.search();
    };

    ColorResultsElement.prototype.getTitle = function() {
      return 'Pigments Find Results';
    };

    ColorResultsElement.prototype.getURI = function() {
      return 'pigments://search';
    };

    ColorResultsElement.prototype.getIconName = function() {
      return "pigments";
    };

    ColorResultsElement.prototype.addFileResult = function(result) {
      this.files += 1;
      this.colors += result.matches.length;
      this.resultsList.innerHTML += this.createFileResult(result);
      return this.updateMessage();
    };

    ColorResultsElement.prototype.searchComplete = function() {
      this.updateMessage();
      if (this.colors === 0) {
        this.pane.classList.add('no-results');
        return this.pane.appendChild("<ul class='centered background-message no-results-overlay'>\n  <li>No Results</li>\n</ul>");
      }
    };

    ColorResultsElement.prototype.updateMessage = function() {
      var filesString;
      filesString = this.files === 1 ? 'file' : 'files';
      return this.previewCount.innerHTML = this.colors > 0 ? "<span class='text-info'>\n  " + this.colors + " colors\n</span>\nfound in\n<span class='text-info'>\n  " + this.files + " " + filesString + "\n</span>" : "No colors found in " + this.files + " " + filesString;
    };

    ColorResultsElement.prototype.createFileResult = function(fileResult) {
      var fileBasename, filePath, matches, pathAttribute, pathName;
      filePath = fileResult.filePath, matches = fileResult.matches;
      fileBasename = path.basename(filePath);
      pathAttribute = _.escapeAttribute(filePath);
      this.pathMapping[pathAttribute] = filePath;
      pathName = atom.project.relativize(filePath);
      return "<li class=\"path list-nested-item\" data-path=\"" + pathAttribute + "\">\n  <div class=\"path-details list-item\">\n    <span class=\"disclosure-arrow\"></span>\n    <span class=\"icon icon-file-text\" data-name=\"" + fileBasename + "\"></span>\n    <span class=\"path-name bright\">" + pathName + "</span>\n    <span class=\"path-match-number\">(" + matches.length + ")</span></div>\n  </div>\n  <ul class=\"matches list-tree\">\n    " + (matches.map((function(_this) {
        return function(match) {
          return _this.createMatchResult(match);
        };
      })(this)).join('')) + "\n  </ul>\n</li>";
    };

    ColorResultsElement.prototype.createMatchResult = function(match) {
      var filePath, lineNumber, matchEnd, matchStart, prefix, range, style, suffix, textColor;
      textColor = match.color.luma > 0.43 ? 'black' : 'white';
      filePath = match.filePath, range = match.range;
      range = Range.fromObject(range);
      matchStart = range.start.column - match.lineTextOffset;
      matchEnd = range.end.column - match.lineTextOffset;
      prefix = removeLeadingWhitespace(match.lineText.slice(0, matchStart));
      suffix = match.lineText.slice(matchEnd);
      lineNumber = range.start.row + 1;
      style = '';
      style += "background: " + (match.color.toCSS()) + ";";
      style += "color: " + textColor + ";";
      return "<li class=\"search-result list-item\" data-start=\"" + range.start.row + "," + range.start.column + "\" data-end=\"" + range.end.row + "," + range.end.column + "\">\n  <span class=\"line-number text-subtle\">" + lineNumber + "</span>\n  <span class=\"preview\">\n    " + prefix + "\n    <span class='match color-match' style='" + style + "'>" + match.matchText + "</span>\n    " + suffix + "\n  </span>\n</li>";
    };

    return ColorResultsElement;

  })(HTMLElement);

  module.exports = ColorResultsElement = document.registerElement('pigments-color-results', {
    prototype: ColorResultsElement.prototype
  });

  ColorResultsElement.registerViewProvider = function(modelClass) {
    return atom.views.addViewProvider(modelClass, function(model) {
      var element;
      element = new ColorResultsElement;
      element.setModel(model);
      return element;
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9jb2xvci1yZXN1bHRzLWVsZW1lbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1KQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQURMLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsT0FBK0IsT0FBQSxDQUFRLE1BQVIsQ0FBL0IsRUFBQyxhQUFBLEtBQUQsRUFBUSwyQkFBQSxtQkFIUixDQUFBOztBQUFBLEVBSUEsUUFBb0QsT0FBQSxDQUFRLFlBQVIsQ0FBcEQsRUFBQyxvQkFBQSxXQUFELEVBQWMseUJBQUEsZ0JBQWQsRUFBZ0MseUJBQUEsZ0JBSmhDLENBQUE7O0FBQUEsRUFNQSx1QkFBQSxHQUEwQixTQUFDLE1BQUQsR0FBQTtXQUFZLE1BQU0sQ0FBQyxPQUFQLENBQWUsTUFBZixFQUF1QixFQUF2QixFQUFaO0VBQUEsQ0FOMUIsQ0FBQTs7QUFBQSxFQVFNO0FBQ0osMENBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBVyxDQUFDLFdBQVosQ0FBd0IsbUJBQXhCLENBQUEsQ0FBQTs7QUFBQSxJQUNBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLG1CQUE3QixDQURBLENBQUE7O0FBQUEsSUFHQSxtQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLLFlBQUwsRUFBbUI7QUFBQSxRQUFBLE1BQUEsRUFBUSxNQUFSO0FBQUEsUUFBZ0IsT0FBQSxFQUFPLHdCQUF2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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/color-results-element.coffee
