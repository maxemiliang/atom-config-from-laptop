(function() {
  module.exports = {
    apply: function() {
      var checkPacks, root, setAccentColor, setAltCmdPalette, setAnimationStatus, setCompactTreeView, setDepth, setFontSize, setPanelContrast, setRippleAccentColor, setRobotoFont, setRobotoUIFont, setShowTabIcons, setSlimScrollbars, setTabMinWidth, setTabSize;
      root = document.documentElement;
      checkPacks = function() {
        var iconPacks, loadedPackages;
        root.classList.remove('dont-change-icons');
        loadedPackages = atom.packages.getActivePackages();
        iconPacks = ['file-icons', 'file-type-icons', 'seti-icons', 'envygeeks-file-icons'];
        return loadedPackages.forEach(function(pack, i) {
          if (iconPacks.indexOf(pack.name) >= 0) {
            return root.classList.add('dont-change-icons');
          }
        });
      };
      atom.packages.onDidActivatePackage(function() {
        return checkPacks();
      });
      atom.packages.onDidDeactivatePackage(function() {
        return checkPacks();
      });
      setAccentColor = function(currentAccentColor) {
        root.classList.remove('blue');
        root.classList.remove('cyan');
        root.classList.remove('green');
        root.classList.remove('orange');
        root.classList.remove('pink');
        root.classList.remove('purple');
        root.classList.remove('red');
        root.classList.remove('teal');
        root.classList.remove('white');
        root.classList.remove('yellow');
        return root.classList.add(currentAccentColor.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.ui.accentColor', function() {
        return setAccentColor(atom.config.get('atom-material-ui.ui.accentColor'));
      });
      setAccentColor(atom.config.get('atom-material-ui.ui.accentColor'));
      setRobotoFont = function(boolean) {
        if (boolean) {
          return root.classList.add('roboto-mono');
        } else {
          return root.classList.remove('roboto-mono');
        }
      };
      atom.config.onDidChange('atom-material-ui.fonts.useRoboto', function() {
        return setRobotoFont(atom.config.get('atom-material-ui.fonts.useRoboto'));
      });
      setRobotoFont(atom.config.get('atom-material-ui.fonts.useRoboto'));
      setRobotoUIFont = function(boolean) {
        if (boolean) {
          return root.classList.add('roboto');
        } else {
          return root.classList.remove('roboto');
        }
      };
      atom.config.onDidChange('atom-material-ui.fonts.useRobotoInUI', function() {
        return setRobotoUIFont(atom.config.get('atom-material-ui.fonts.useRobotoInUI'));
      });
      setRobotoUIFont(atom.config.get('atom-material-ui.fonts.useRobotoInUI'));
      setSlimScrollbars = function(boolean) {
        if (boolean) {
          return root.classList.add('slim-scrollbar');
        } else {
          return root.classList.remove('slim-scrollbar');
        }
      };
      atom.config.onDidChange('atom-material-ui.ui.slimScrollbar', function() {
        return setSlimScrollbars(atom.config.get('atom-material-ui.ui.slimScrollbar'));
      });
      setSlimScrollbars(atom.config.get('atom-material-ui.ui.slimScrollbar'));
      setAnimationStatus = function(boolean) {
        if (boolean) {
          return root.classList.add('no-animations');
        } else {
          return root.classList.remove('no-animations');
        }
      };
      atom.config.onDidChange('atom-material-ui.ui.disableAnimations', function() {
        return setAnimationStatus(atom.config.get('atom-material-ui.ui.disableAnimations'));
      });
      setAnimationStatus(atom.config.get('atom-material-ui.ui.disableAnimations'));
      setPanelContrast = function(boolean) {
        if (boolean) {
          return root.classList.add('panel-contrast');
        } else {
          return root.classList.remove('panel-contrast');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.panelContrast', function() {
        return setPanelContrast(atom.config.get('atom-material-ui.panels.panelContrast'));
      });
      setPanelContrast(atom.config.get('atom-material-ui.panels.panelContrast'));
      setDepth = function(boolean) {
        if (boolean) {
          return root.classList.add('panel-depth');
        } else {
          return root.classList.remove('panel-depth');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.depth', function() {
        return setDepth(atom.config.get('atom-material-ui.panels.depth'));
      });
      setDepth(atom.config.get('atom-material-ui.panels.depth'));
      setAltCmdPalette = function(boolean) {
        if (boolean) {
          return root.classList.add('alt-cmd-palette');
        } else {
          return root.classList.remove('alt-cmd-palette');
        }
      };
      atom.config.onDidChange('atom-material-ui.panels.altCmdPalette', function() {
        return setAltCmdPalette(atom.config.get('atom-material-ui.panels.altCmdPalette'));
      });
      setAltCmdPalette(atom.config.get('atom-material-ui.panels.altCmdPalette'));
      setTabSize = function(currentTabSize) {
        root.classList.remove('tab-size-small');
        root.classList.remove('tab-size-normal');
        root.classList.remove('tab-size-big');
        return root.classList.add('tab-size-' + currentTabSize.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.tabs.tabSize', function() {
        return setTabSize(atom.config.get('atom-material-ui.tabs.tabSize'));
      });
      setTabSize(atom.config.get('atom-material-ui.tabs.tabSize'));
      setCompactTreeView = function(boolean) {
        if (boolean) {
          return root.classList.add('compact-tree-view');
        } else {
          return root.classList.remove('compact-tree-view');
        }
      };
      atom.config.onDidChange('atom-material-ui.treeView.compactTreeView', function() {
        return setCompactTreeView(atom.config.get('atom-material-ui.treeView.compactTreeView'));
      });
      setCompactTreeView(atom.config.get('atom-material-ui.treeView.compactTreeView'));
      setFontSize = function(currentFontSize) {
        root.classList.remove('font-size-small');
        root.classList.remove('font-size-regular');
        root.classList.remove('font-size-big');
        root.classList.remove('font-size-huge');
        return root.classList.add('font-size-' + currentFontSize.toLowerCase());
      };
      atom.config.onDidChange('atom-material-ui.fonts.fontSize', function() {
        return setFontSize(atom.config.get('atom-material-ui.fonts.fontSize'));
      });
      setFontSize(atom.config.get('atom-material-ui.fonts.fontSize'));
      setShowTabIcons = function(option) {
        root.classList.remove('tab-icons');
        root.classList.remove('tab-icons-all');
        if (option === 'Show on active tab') {
          return root.classList.add('tab-icons');
        } else if (option === 'Show on all tabs') {
          return root.classList.add('tab-icons-all');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.showTabIcons', function() {
        return setShowTabIcons(atom.config.get('atom-material-ui.tabs.showTabIcons'));
      });
      setShowTabIcons(atom.config.get('atom-material-ui.tabs.showTabIcons'));
      setRippleAccentColor = function(boolean) {
        if (boolean) {
          return root.classList.add('ripple-accent-color');
        } else {
          return root.classList.remove('ripple-accent-color');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.rippleAccentColor', function() {
        return setRippleAccentColor(atom.config.get('atom-material-ui.tabs.rippleAccentColor'));
      });
      setRippleAccentColor(atom.config.get('atom-material-ui.tabs.rippleAccentColor'));
      setTabMinWidth = function(boolean) {
        if (boolean) {
          return root.classList.add('tab-min-width');
        } else {
          return root.classList.remove('tab-min-width');
        }
      };
      atom.config.onDidChange('atom-material-ui.tabs.tabMinWidth', function() {
        return setTabMinWidth(atom.config.get('atom-material-ui.tabs.tabMinWidth'));
      });
      return setTabMinWidth(atom.config.get('atom-material-ui.tabs.tabMinWidth'));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL2F0b20tbWF0ZXJpYWwtdWkvbGliL2NvbmZpZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDSTtBQUFBLElBQUEsS0FBQSxFQUFPLFNBQUEsR0FBQTtBQUNILFVBQUEseVBBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsZUFBaEIsQ0FBQTtBQUFBLE1BSUEsVUFBQSxHQUFhLFNBQUEsR0FBQTtBQUNULFlBQUEseUJBQUE7QUFBQSxRQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBZixDQUFzQixtQkFBdEIsQ0FBQSxDQUFBO0FBQUEsUUFFQSxjQUFBLEdBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWQsQ0FBQSxDQUZsQixDQUFBO0FBQUEsUUFHQSxTQUFBLEdBQVksQ0FBQyxZQUFELEVBQWUsaUJBQWYsRUFBa0MsWUFBbEMsRUFBZ0Qsc0JBQWhELENBSFosQ0FBQTtlQUtBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFNBQUMsSUFBRCxFQUFPLENBQVAsR0FBQTtBQUNuQixVQUFBLElBQUksU0FBUyxDQUFDLE9BQVYsQ0FBa0IsSUFBSSxDQUFDLElBQXZCLENBQUEsSUFBZ0MsQ0FBcEM7bUJBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFmLENBQW1CLG1CQUFuQixFQURKO1dBRG1CO1FBQUEsQ0FBdkIsRUFOUztNQUFBLENBSmIsQ0FBQTtBQUFBLE1BY0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBZCxDQUFtQyxTQUFBLEdBQUE7ZUFBTSxVQUFBLENBQUEsRUFBTjtNQUFBLENBQW5DLENBZEEsQ0FBQTtBQUFBLE1BZUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBZCxDQUFxQyxTQUFBLEdB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

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/atom-material-ui/lib/config.coffee
