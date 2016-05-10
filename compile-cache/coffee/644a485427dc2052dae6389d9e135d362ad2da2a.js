(function() {
  module.exports = {
    config: {
      ui: {
        order: 1,
        type: 'object',
        properties: {
          accentColor: {
            order: 1,
            title: 'Accent color',
            description: 'Sets the accent color for the UI theme.',
            type: 'string',
            "default": 'Teal',
            "enum": ['Blue', 'Cyan', 'Green', 'Orange', 'Pink', 'Purple', 'Red', 'Teal', 'White', 'Yellow']
          },
          slimScrollbar: {
            title: 'Slim scrollbars',
            type: 'boolean',
            "default": false
          },
          disableAnimations: {
            title: 'Disable animations',
            description: 'Reduces visual distractions when switching tabs or giving focus to text fields.',
            type: 'boolean',
            "default": false
          }
        }
      },
      tabs: {
        order: 2,
        type: 'object',
        properties: {
          tabSize: {
            title: 'Tab bar size',
            description: 'Sets the height for the tab bar',
            type: 'string',
            "default": 'Normal',
            "enum": ['Small', 'Normal', 'Big']
          },
          tabMinWidth: {
            title: 'Tab minimum width',
            type: 'boolean',
            "default": false
          },
          showTabIcons: {
            title: 'Icons in tabs',
            description: 'Shows the file-type icon for focused tabs.',
            type: 'string',
            "default": 'Hide',
            "enum": ['Hide', 'Show on active tab', 'Show on all tabs']
          },
          rippleAccentColor: {
            title: 'Use accent color in tabs\' ripple effect',
            type: 'boolean',
            "default": false
          }
        }
      },
      fonts: {
        order: 3,
        type: 'object',
        properties: {
          useRoboto: {
            title: 'Use Roboto Mono font in text editors',
            type: 'boolean',
            "default": false
          },
          fontSize: {
            title: 'UI font size',
            description: 'Set the font size used through the user interface. It doesn\'t override the text editor font size setting.',
            type: 'string',
            "default": 'Regular',
            "enum": ['Small', 'Regular', 'Big', 'Huge']
          },
          useRobotoInUI: {
            title: 'Use Roboto font for UI',
            type: 'boolean',
            "default": false
          }
        }
      },
      treeView: {
        order: 4,
        type: 'object',
        properties: {
          compactTreeView: {
            title: 'Compact Tree View',
            description: 'Reduces line-height in the tree view component.',
            type: 'boolean',
            "default": false
          }
        }
      },
      panels: {
        order: 5,
        type: 'object',
        properties: {
          panelContrast: {
            title: 'Contrasting panels',
            description: 'Makes panels\' background darker. Applies to tabs, search & replace, tree-view, etc.',
            type: 'boolean',
            "default": false
          },
          depth: {
            title: 'Add depth',
            description: 'Adds a few shadows here and there to add depth to the UI.',
            type: 'boolean',
            "default": false
          },
          altCmdPalette: {
            title: 'Alternative command palette background',
            description: 'Use a syntax\' background color for the command palette and fuzzy finder.',
            type: 'boolean',
            "default": true
          }
        }
      }
    },
    activate: function(state) {
      return atom.themes.onDidChangeActiveThemes(function() {
        var Bindings, Config;
        Config = require('./config');
        Bindings = require('./bindings');
        Config.apply();
        return Bindings.apply();
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvbGliL3NldHRpbmdzLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxNQUFBLEVBQ0k7QUFBQSxNQUFBLEVBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLENBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxRQUROO0FBQUEsUUFFQSxVQUFBLEVBQ0k7QUFBQSxVQUFBLFdBQUEsRUFDSTtBQUFBLFlBQUEsS0FBQSxFQUFPLENBQVA7QUFBQSxZQUNBLEtBQUEsRUFBTyxjQURQO0FBQUEsWUFFQSxXQUFBLEVBQWEseUNBRmI7QUFBQSxZQUdBLElBQUEsRUFBTSxRQUhOO0FBQUEsWUFJQSxTQUFBLEVBQVMsTUFKVDtBQUFBLFlBS0EsTUFBQSxFQUFNLENBQUMsTUFBRCxFQUFTLE1BQVQsRUFBaUIsT0FBakIsRUFBMEIsUUFBMUIsRUFBb0MsTUFBcEMsRUFBNEMsUUFBNUMsRUFBc0QsS0FBdEQsRUFBNkQsTUFBN0QsRUFBcUUsT0FBckUsRUFBOEUsUUFBOUUsQ0FMTjtXQURKO0FBQUEsVUFPQSxhQUFBLEVBQ0k7QUFBQSxZQUFBLEtBQUEsRUFBTyxpQkFBUDtBQUFBLFlBQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxZQUVBLFNBQUEsRUFBUyxLQUZUO1dBUko7QUFBQSxVQVdBLGlCQUFBLEVBQ0k7QUFBQSxZQUFBLEtBQUEsRUFBTyxvQkFBUDtBQUFBLFlBQ0EsV0FBQSxFQUFhLGlGQURiO0FBQUEsWUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLFlBR0EsU0FBQSxFQUFTLEtBSFQ7V0FaSjtTQUhKO09BREo7QUFBQSxNQW9CQSxJQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEs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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/atom-material-ui/lib/settings.coffee
