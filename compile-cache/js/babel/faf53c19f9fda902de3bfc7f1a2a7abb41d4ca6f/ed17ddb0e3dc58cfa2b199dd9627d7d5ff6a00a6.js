Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _main = require('./main');

var _main2 = _interopRequireDefault(_main);

var _helpers = require('./helpers');

var _tinycolor2 = require('tinycolor2');

var _tinycolor22 = _interopRequireDefault(_tinycolor2);

var _colorTemplates = require('./color-templates');

var _colorTemplates2 = _interopRequireDefault(_colorTemplates);

'use babel';
'use strict';

function apply() {

    atom.config.onDidChange('atom-material-ui.colors.accentColor', function () {
        return _main2['default'].writeConfig();
    });

    atom.config.onDidChange('atom-material-ui.colors.abaseColor', function (value) {
        var baseColor = (0, _tinycolor22['default'])(value.newValue.toRGBAString());

        if (atom.config.get('atom-material-ui.colors.genAccent')) {
            var accentColor = baseColor.complement().saturate(20).lighten(5);
            return atom.config.set('atom-material-ui.colors.accentColor', accentColor.toRgbString());
        }

        _main2['default'].writeConfig();
    });

    atom.config.onDidChange('atom-material-ui.colors.predefinedColor', function (value) {
        var newValue = (0, _helpers.toCamelCase)(value.newValue);

        atom.config.set('atom-material-ui.colors.abaseColor', _colorTemplates2['default'][newValue].base);
        atom.config.set('atom-material-ui.colors.accentColor', _colorTemplates2['default'][newValue].accent);
    });
}

exports['default'] = { apply: apply };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvY29sb3Itc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUdnQixRQUFROzs7O3VCQUNJLFdBQVc7OzBCQUNqQixZQUFZOzs7OzhCQUNQLG1CQUFtQjs7OztBQU45QyxXQUFXLENBQUM7QUFDWixZQUFZLENBQUM7O0FBT2IsU0FBUyxLQUFLLEdBQUc7O0FBRWIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMscUNBQXFDLEVBQUU7ZUFBTSxrQkFBSSxXQUFXLEVBQUU7S0FBQSxDQUFDLENBQUM7O0FBRXhGLFFBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3JFLFlBQUksU0FBUyxHQUFHLDZCQUFVLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzs7QUFFekQsWUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxFQUFFO0FBQ3RELGdCQUFJLFdBQVcsR0FBRyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM1Rjs7QUFFRCwwQkFBSSxXQUFXLEVBQUUsQ0FBQztLQUNyQixDQUFDLENBQUM7O0FBRUgsUUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMseUNBQXlDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDMUUsWUFBSSxRQUFRLEdBQUcsMEJBQVksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUUzQyxZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSw0QkFBZSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRixZQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSw0QkFBZSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMzRixDQUFDLENBQUM7Q0FDTjs7cUJBRWMsRUFBRSxLQUFLLEVBQUwsS0FBSyxFQUFFIiwiZmlsZSI6IkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvY29sb3Itc2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGFtdSBmcm9tICcuL21haW4nO1xuaW1wb3J0IHsgdG9DYW1lbENhc2UgfSBmcm9tICcuL2hlbHBlcnMnO1xuaW1wb3J0IHRpbnljb2xvciBmcm9tICd0aW55Y29sb3IyJztcbmltcG9ydCBjb2xvclRlbXBsYXRlcyBmcm9tICcuL2NvbG9yLXRlbXBsYXRlcyc7XG5cbmZ1bmN0aW9uIGFwcGx5KCkge1xuXG4gICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFjY2VudENvbG9yJywgKCkgPT4gYW11LndyaXRlQ29uZmlnKCkpO1xuXG4gICAgYXRvbS5jb25maWcub25EaWRDaGFuZ2UoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFiYXNlQ29sb3InLCAodmFsdWUpID0+IHtcbiAgICAgICAgdmFyIGJhc2VDb2xvciA9IHRpbnljb2xvcih2YWx1ZS5uZXdWYWx1ZS50b1JHQkFTdHJpbmcoKSk7XG5cbiAgICAgICAgaWYgKGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuZ2VuQWNjZW50JykpIHtcbiAgICAgICAgICAgIGxldCBhY2NlbnRDb2xvciA9IGJhc2VDb2xvci5jb21wbGVtZW50KCkuc2F0dXJhdGUoMjApLmxpZ2h0ZW4oNSk7XG4gICAgICAgICAgICByZXR1cm4gYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpLmNvbG9ycy5hY2NlbnRDb2xvcicsIGFjY2VudENvbG9yLnRvUmdiU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYW11LndyaXRlQ29uZmlnKCk7XG4gICAgfSk7XG5cbiAgICBhdG9tLmNvbmZpZy5vbkRpZENoYW5nZSgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMucHJlZGVmaW5lZENvbG9yJywgKHZhbHVlKSA9PiB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvQ2FtZWxDYXNlKHZhbHVlLm5ld1ZhbHVlKTtcblxuICAgICAgICBhdG9tLmNvbmZpZy5zZXQoJ2F0b20tbWF0ZXJpYWwtdWkuY29sb3JzLmFiYXNlQ29sb3InLCBjb2xvclRlbXBsYXRlc1tuZXdWYWx1ZV0uYmFzZSk7XG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS5jb2xvcnMuYWNjZW50Q29sb3InLCBjb2xvclRlbXBsYXRlc1tuZXdWYWx1ZV0uYWNjZW50KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBhcHBseSB9O1xuIl19
//# sourceURL=/C:/Users/Maxemilian/.atom/packages/atom-material-ui/lib/color-settings.js
