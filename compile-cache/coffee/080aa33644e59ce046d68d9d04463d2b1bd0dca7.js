(function() {
  var CompositeDisposable, PigmentsProvider, Range, variablesRegExp, _, _ref;

  _ = require('underscore-plus');

  _ref = require('atom'), CompositeDisposable = _ref.CompositeDisposable, Range = _ref.Range;

  variablesRegExp = require('./regexes').variables;

  module.exports = PigmentsProvider = (function() {
    function PigmentsProvider(pigments) {
      this.pigments = pigments;
      this.subscriptions = new CompositeDisposable;
      this.selector = atom.config.get('pigments.autocompleteScopes').join(',');
      this.subscriptions.add(atom.config.observe('pigments.autocompleteScopes', (function(_this) {
        return function(scopes) {
          return _this.selector = scopes.join(',');
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.extendAutocompleteToVariables', (function(_this) {
        return function(extendAutocompleteToVariables) {
          _this.extendAutocompleteToVariables = extendAutocompleteToVariables;
        };
      })(this)));
    }

    PigmentsProvider.prototype.dispose = function() {
      this.disposed = true;
      this.subscriptions.dispose();
      return this.pigments = null;
    };

    PigmentsProvider.prototype.getProject = function() {
      if (this.disposed) {
        return;
      }
      return this.pigments.getProject();
    };

    PigmentsProvider.prototype.getSuggestions = function(_arg) {
      var bufferPosition, editor, prefix, project, suggestions, variables;
      editor = _arg.editor, bufferPosition = _arg.bufferPosition;
      if (this.disposed) {
        return;
      }
      prefix = this.getPrefix(editor, bufferPosition);
      project = this.getProject();
      if (!(prefix != null ? prefix.length : void 0)) {
        return;
      }
      if (project == null) {
        return;
      }
      if (this.extendAutocompleteToVariables) {
        variables = project.getVariables();
      } else {
        variables = project.getColorVariables();
      }
      suggestions = this.findSuggestionsForPrefix(variables, prefix);
      return suggestions;
    };

    PigmentsProvider.prototype.getPrefix = function(editor, bufferPosition) {
      var line, _ref1;
      line = editor.getTextInRange([[bufferPosition.row, 0], bufferPosition]);
      return ((_ref1 = line.match(new RegExp(variablesRegExp + '$'))) != null ? _ref1[0] : void 0) || '';
    };

    PigmentsProvider.prototype.findSuggestionsForPrefix = function(variables, prefix) {
      var matchedVariables, suggestions;
      if (variables == null) {
        return [];
      }
      suggestions = [];
      matchedVariables = variables.filter(function(v) {
        return RegExp("^" + (_.escapeRegExp(prefix))).test(v.name);
      });
      matchedVariables.forEach(function(v) {
        if (v.isColor) {
          return suggestions.push({
            text: v.name,
            rightLabelHTML: "<span class='color-suggestion-preview' style='background: " + (v.color.toCSS()) + "'></span>",
            replacementPrefix: prefix,
            className: 'color-suggestion'
          });
        } else {
          return suggestions.push({
            text: v.name,
            rightLabel: v.value,
            replacementPrefix: prefix,
            className: 'pigments-suggestion'
          });
        }
      });
      return suggestions;
    };

    return PigmentsProvider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9waWdtZW50cy1wcm92aWRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsc0VBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLE9BQWdDLE9BQUEsQ0FBUSxNQUFSLENBQWhDLEVBQUMsMkJBQUEsbUJBQUQsRUFBc0IsYUFBQSxLQUR0QixDQUFBOztBQUFBLEVBRVksa0JBQW1CLE9BQUEsQ0FBUSxXQUFSLEVBQTlCLFNBRkQsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLDBCQUFFLFFBQUYsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLFdBQUEsUUFDYixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDZCQUFoQixDQUE4QyxDQUFDLElBQS9DLENBQW9ELEdBQXBELENBRFosQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQiw2QkFBcEIsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsTUFBRCxHQUFBO2lCQUNwRSxLQUFDLENBQUEsUUFBRCxHQUFZLE1BQU0sQ0FBQyxJQUFQLENBQVksR0FBWixFQUR3RDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5ELENBQW5CLENBSEEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLGFBQWEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/pigments-provider.coffee
