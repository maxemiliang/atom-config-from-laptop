(function() {
  var CompositeDisposable, EventsDelegation, Palette, PaletteElement, SpacePenDSL, StickyTitle, THEME_VARIABLES, pigments, registerOrUpdateElement, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CompositeDisposable = require('atom').CompositeDisposable;

  _ref = require('atom-utils'), SpacePenDSL = _ref.SpacePenDSL, EventsDelegation = _ref.EventsDelegation, registerOrUpdateElement = _ref.registerOrUpdateElement;

  THEME_VARIABLES = require('./uris').THEME_VARIABLES;

  pigments = require('./pigments');

  Palette = require('./palette');

  StickyTitle = require('./sticky-title');

  PaletteElement = (function(_super) {
    __extends(PaletteElement, _super);

    function PaletteElement() {
      return PaletteElement.__super__.constructor.apply(this, arguments);
    }

    SpacePenDSL.includeInto(PaletteElement);

    EventsDelegation.includeInto(PaletteElement);

    PaletteElement.content = function() {
      var group, merge, optAttrs, sort;
      sort = atom.config.get('pigments.sortPaletteColors');
      group = atom.config.get('pigments.groupPaletteColors');
      merge = atom.config.get('pigments.mergeColorDuplicates');
      optAttrs = function(bool, name, attrs) {
        if (bool) {
          attrs[name] = name;
        }
        return attrs;
      };
      return this.div({
        "class": 'pigments-palette-panel'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'pigments-palette-controls settings-view pane-item'
          }, function() {
            return _this.div({
              "class": 'pigments-palette-controls-wrapper'
            }, function() {
              _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.label({
                  "for": 'sort-palette-colors'
                }, 'Sort Colors');
                return _this.select({
                  outlet: 'sort',
                  id: 'sort-palette-colors'
                }, function() {
                  _this.option(optAttrs(sort === 'none', 'selected', {
                    value: 'none'
                  }), 'None');
                  _this.option(optAttrs(sort === 'by name', 'selected', {
                    value: 'by name'
                  }), 'By Name');
                  return _this.option(optAttrs(sort === 'by file', 'selected', {
                    value: 'by color'
                  }), 'By Color');
                });
              });
              _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.label({
                  "for": 'sort-palette-colors'
                }, 'Group Colors');
                return _this.select({
                  outlet: 'group',
                  id: 'group-palette-colors'
                }, function() {
                  _this.option(optAttrs(group === 'none', 'selected', {
                    value: 'none'
                  }), 'None');
                  return _this.option(optAttrs(group === 'by file', 'selected', {
                    value: 'by file'
                  }), 'By File');
                });
              });
              return _this.span({
                "class": 'input-group-inline'
              }, function() {
                _this.input(optAttrs(merge, 'checked', {
                  type: 'checkbox',
                  id: 'merge-duplicates',
                  outlet: 'merge'
                }));
                return _this.label({
                  "for": 'merge-duplicates'
                }, 'Merge Duplicates');
              });
            });
          });
          return _this.div({
            "class": 'pigments-palette-list native-key-bindings',
            tabindex: -1
          }, function() {
            return _this.ol({
              outlet: 'list'
            });
          });
        };
      })(this));
    };

    PaletteElement.prototype.createdCallback = function() {
      this.project = pigments.getProject();
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.config.observe('pigments.sortPaletteColors', (function(_this) {
        return function(sortPaletteColors) {
          _this.sortPaletteColors = sortPaletteColors;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.groupPaletteColors', (function(_this) {
        return function(groupPaletteColors) {
          _this.groupPaletteColors = groupPaletteColors;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('pigments.mergeColorDuplicates', (function(_this) {
        return function(mergeColorDuplicates) {
          _this.mergeColorDuplicates = mergeColorDuplicates;
          if ((_this.palette != null) && _this.attached) {
            return _this.renderList();
          }
        };
      })(this)));
      this.subscriptions.add(this.subscribeTo(this.sort, {
        'change': function(e) {
          return atom.config.set('pigments.sortPaletteColors', e.target.value);
        }
      }));
      this.subscriptions.add(this.subscribeTo(this.group, {
        'change': function(e) {
          return atom.config.set('pigments.groupPaletteColors', e.target.value);
        }
      }));
      this.subscriptions.add(this.subscribeTo(this.merge, {
        'change': function(e) {
          return atom.config.set('pigments.mergeColorDuplicates', e.target.checked);
        }
      }));
      return this.subscriptions.add(this.subscribeTo(this.list, '[data-variable-id]', {
        'click': (function(_this) {
          return function(e) {
            var variable, variableId;
            variableId = Number(e.target.dataset.variableId);
            variable = _this.project.getVariableById(variableId);
            return _this.project.showVariableInFile(variable);
          };
        })(this)
      }));
    };

    PaletteElement.prototype.attachedCallback = function() {
      if (this.palette != null) {
        this.renderList();
      }
      return this.attached = true;
    };

    PaletteElement.prototype.getTitle = function() {
      return 'Palette';
    };

    PaletteElement.prototype.getURI = function() {
      return 'pigments://palette';
    };

    PaletteElement.prototype.getIconName = function() {
      return "pigments";
    };

    PaletteElement.prototype.getModel = function() {
      return this.palette;
    };

    PaletteElement.prototype.setModel = function(palette) {
      this.palette = palette;
      if (this.attached) {
        return this.renderList();
      }
    };

    PaletteElement.prototype.getColorsList = function(palette) {
      switch (this.sortPaletteColors) {
        case 'by color':
          return palette.sortedByColor();
        case 'by name':
          return palette.sortedByName();
        default:
          return palette.variables.slice();
      }
    };

    PaletteElement.prototype.renderList = function() {
      var file, li, ol, palette, palettes, _ref1;
      if ((_ref1 = this.stickyTitle) != null) {
        _ref1.dispose();
      }
      this.list.innerHTML = '';
      if (this.groupPaletteColors === 'by file') {
        palettes = this.getFilesPalettes();
        for (file in palettes) {
          palette = palettes[file];
          li = document.createElement('li');
          li.className = 'pigments-color-group';
          ol = document.createElement('ol');
          li.appendChild(this.getGroupHeader(atom.project.relativize(file)));
          li.appendChild(ol);
          this.buildList(ol, this.getColorsList(palette));
          this.list.appendChild(li);
        }
        return this.stickyTitle = new StickyTitle(this.list.querySelectorAll('.pigments-color-group-header-content'), this.querySelector('.pigments-palette-list'));
      } else {
        return this.buildList(this.list, this.getColorsList(this.palette));
      }
    };

    PaletteElement.prototype.getGroupHeader = function(label) {
      var content, header;
      header = document.createElement('div');
      header.className = 'pigments-color-group-header';
      content = document.createElement('div');
      content.className = 'pigments-color-group-header-content';
      if (label === THEME_VARIABLES) {
        content.textContent = 'Atom Themes';
      } else {
        content.textContent = label;
      }
      header.appendChild(content);
      return header;
    };

    PaletteElement.prototype.getFilesPalettes = function() {
      var palettes;
      palettes = {};
      this.palette.eachColor((function(_this) {
        return function(variable) {
          var path;
          path = variable.path;
          if (palettes[path] == null) {
            palettes[path] = new Palette([]);
          }
          return palettes[path].variables.push(variable);
        };
      })(this));
      return palettes;
    };

    PaletteElement.prototype.buildList = function(container, paletteColors) {
      var color, html, id, li, line, name, path, variables, _i, _j, _len, _len1, _ref1, _results;
      paletteColors = this.checkForDuplicates(paletteColors);
      _results = [];
      for (_i = 0, _len = paletteColors.length; _i < _len; _i++) {
        variables = paletteColors[_i];
        li = document.createElement('li');
        li.className = 'pigments-color-item';
        color = variables[0].color;
        html = "<div class=\"pigments-color\">\n  <span class=\"pigments-color-preview\"\n        style=\"background-color: " + (color.toCSS()) + "\">\n  </span>\n  <span class=\"pigments-color-properties\">\n    <span class=\"pigments-color-component\"><strong>R:</strong> " + (Math.round(color.red)) + "</span>\n    <span class=\"pigments-color-component\"><strong>G:</strong> " + (Math.round(color.green)) + "</span>\n    <span class=\"pigments-color-component\"><strong>B:</strong> " + (Math.round(color.blue)) + "</span>\n    <span class=\"pigments-color-component\"><strong>A:</strong> " + (Math.round(color.alpha * 1000) / 1000) + "</span>\n  </span>\n</div>\n<div class=\"pigments-color-details\">";
        for (_j = 0, _len1 = variables.length; _j < _len1; _j++) {
          _ref1 = variables[_j], name = _ref1.name, path = _ref1.path, line = _ref1.line, id = _ref1.id;
          html += "<span class=\"pigments-color-occurence\">\n    <span class=\"name\">" + name + "</span>";
          if (path !== THEME_VARIABLES) {
            html += "<span data-variable-id=\"" + id + "\">\n  <span class=\"path\">" + (atom.project.relativize(path)) + "</span>\n  <span class=\"line\">at line " + (line + 1) + "</span>\n</span>";
          }
          html += '</span>';
        }
        html += '</div>';
        li.innerHTML = html;
        _results.push(container.appendChild(li));
      }
      return _results;
    };

    PaletteElement.prototype.checkForDuplicates = function(paletteColors) {
      var colors, findColor, key, map, results, v, _i, _len;
      results = [];
      if (this.mergeColorDuplicates) {
        map = new Map();
        colors = [];
        findColor = function(color) {
          var col, _i, _len;
          for (_i = 0, _len = colors.length; _i < _len; _i++) {
            col = colors[_i];
            if (col.isEqual(color)) {
              return col;
            }
          }
        };
        for (_i = 0, _len = paletteColors.length; _i < _len; _i++) {
          v = paletteColors[_i];
          if (key = findColor(v.color)) {
            map.get(key).push(v);
          } else {
            map.set(v.color, [v]);
            colors.push(v.color);
          }
        }
        map.forEach(function(vars, color) {
          return results.push(vars);
        });
        return results;
      } else {
        return (function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = paletteColors.length; _j < _len1; _j++) {
            v = paletteColors[_j];
            _results.push([v]);
          }
          return _results;
        })();
      }
    };

    return PaletteElement;

  })(HTMLElement);

  module.exports = PaletteElement = registerOrUpdateElement('pigments-palette', PaletteElement.prototype);

  PaletteElement.registerViewProvider = function(modelClass) {
    return atom.views.addViewProvider(modelClass, function(model) {
      var element;
      element = new PaletteElement;
      element.setModel(model);
      return element;
    });
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL3BpZ21lbnRzL2xpYi9wYWxldHRlLWVsZW1lbnQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtKQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxzQkFBdUIsT0FBQSxDQUFRLE1BQVIsRUFBdkIsbUJBQUQsQ0FBQTs7QUFBQSxFQUNBLE9BQTJELE9BQUEsQ0FBUSxZQUFSLENBQTNELEVBQUMsbUJBQUEsV0FBRCxFQUFjLHdCQUFBLGdCQUFkLEVBQWdDLCtCQUFBLHVCQURoQyxDQUFBOztBQUFBLEVBRUMsa0JBQW1CLE9BQUEsQ0FBUSxRQUFSLEVBQW5CLGVBRkQsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQUhYLENBQUE7O0FBQUEsRUFJQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVIsQ0FKVixDQUFBOztBQUFBLEVBS0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUxkLENBQUE7O0FBQUEsRUFPTTtBQUNKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQVcsQ0FBQyxXQUFaLENBQXdCLGNBQXhCLENBQUEsQ0FBQTs7QUFBQSxJQUNBLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLGNBQTdCLENBREEsQ0FBQTs7QUFBQSxJQUdBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSw0QkFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw0QkFBaEIsQ0FBUCxDQUFBO0FBQUEsTUFDQSxLQUFBLEdBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDZCQUFoQixDQURSLENBQUE7QUFBQSxNQUVBLEtBQUEsR0FBUSxJ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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/pigments/lib/palette-element.coffee