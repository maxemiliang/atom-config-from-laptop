Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _tabsSettings = require('./tabs-settings');

var _tabsSettings2 = _interopRequireDefault(_tabsSettings);

'use babel';
'use strict';

var panels = document.querySelectorAll('atom-panel-container');
var observerConfig = { childList: true };
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function () {
        return toggleBlendTreeView(atom.config.get('atom-material-ui.treeView.blendTabs'));
    });
});

// Observe panels for DOM mutations
Array.prototype.forEach.call(panels, function (panel) {
    return observer.observe(panel, observerConfig);
});

function getTreeViews() {
    var treeViews = [document.querySelector('.tree-view-resizer'), document.querySelector('.remote-ftp-view'), (function () {
        var nuclideTreeView = document.querySelector('.nuclide-file-tree');

        if (nuclideTreeView) {
            return nuclideTreeView.closest('.nuclide-ui-panel-component');
        }
    })()];

    return treeViews;
}

function removeBlendingEl() {
    var treeViews = getTreeViews();

    treeViews.forEach(function (treeView) {
        if (treeView) {
            var blendingEl = treeView.querySelector('.tabBlender');

            if (blendingEl) {
                treeView.removeChild(blendingEl);
            }
        }
    });
}

function toggleBlendTreeView(bool) {
    var treeViews = getTreeViews();

    setImmediate(function () {
        treeViews.forEach(function (treeView) {
            if (treeView) {
                var blendingEl = document.createElement('div');
                var title = document.createElement('span');

                blendingEl.classList.add('tabBlender');
                blendingEl.appendChild(title);

                if (treeView && bool) {
                    if (treeView.querySelector('.tabBlender')) {
                        removeBlendingEl();
                    }
                    treeView.insertBefore(blendingEl, treeView.firstChild);
                } else if (treeView && !bool) {
                    removeBlendingEl();
                } else if (!treeView && bool) {
                    if (atom.packages.getActivePackage('tree-view') || atom.packages.getActivePackage('Remote-FTP') || atom.packages.getActivePackage('nuclide')) {
                        return setTimeout(function () {
                            toggleBlendTreeView(bool);
                            setImmediate(function () {
                                return _tabsSettings2['default'].apply();
                            });
                        }, 2000);
                    }
                }
            }
        });
    });
}

exports['default'] = { toggleBlendTreeView: toggleBlendTreeView };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvdHJlZS12aWV3LXNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs0QkFHeUIsaUJBQWlCOzs7O0FBSDFDLFdBQVcsQ0FBQztBQUNaLFlBQVksQ0FBQzs7QUFJYixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUMvRCxJQUFJLGNBQWMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQUMsU0FBUyxFQUFLO0FBQ2xELGFBQVMsQ0FBQyxPQUFPLENBQUM7ZUFBTSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0tBQUEsQ0FBQyxDQUFDO0NBQ3JHLENBQUMsQ0FBQzs7O0FBR0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQUs7V0FBSyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxjQUFjLENBQUM7Q0FBQSxDQUFDLENBQUM7O0FBRXpGLFNBQVMsWUFBWSxHQUFHO0FBQ3BCLFFBQUksU0FBUyxHQUFHLENBQ1osUUFBUSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUM1QyxRQUFRLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLEVBQzFDLENBQUMsWUFBWTtBQUNULFlBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFbkUsWUFBSSxlQUFlLEVBQUU7QUFDakIsbUJBQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0osQ0FBQSxFQUFHLENBQ1AsQ0FBQzs7QUFFRixXQUFPLFNBQVMsQ0FBQztDQUNwQjs7QUFFRCxTQUFTLGdCQUFnQixHQUFHO0FBQ3hCLFFBQUksU0FBUyxHQUFHLFlBQVksRUFBRSxDQUFDOztBQUUvQixhQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQzVCLFlBQUksUUFBUSxFQUFFO0FBQ1YsZ0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXZELGdCQUFJLFVBQVUsRUFBRTtBQUNaLHdCQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3BDO1NBQ0o7S0FDSixDQUFDLENBQUM7Q0FDTjs7QUFFRCxTQUFTLG1CQUFtQixDQUFDLElBQUksRUFBRTtBQUMvQixRQUFJLFNBQVMsR0FBRyxZQUFZLEVBQUUsQ0FBQzs7QUFFL0IsZ0JBQVksQ0FBQyxZQUFNO0FBQ2YsaUJBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRLEVBQUs7QUFDNUIsZ0JBQUksUUFBUSxFQUFFO0FBQ1Ysb0JBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0Msb0JBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRTNDLDBCQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QywwQkFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFOUIsb0JBQUksUUFBUSxJQUFJLElBQUksRUFBRTtBQUNsQix3QkFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQ3ZDLHdDQUFnQixFQUFFLENBQUM7cUJBQ3RCO0FBQ0QsNEJBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDMUQsTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtBQUMxQixvQ0FBZ0IsRUFBRSxDQUFDO2lCQUN0QixNQUFNLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO0FBQzFCLHdCQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxFQUFFO0FBQzFJLCtCQUFPLFVBQVUsQ0FBQyxZQUFNO0FBQ3BCLCtDQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLHdDQUFZLENBQUM7dUNBQU0sMEJBQWEsS0FBSyxFQUFFOzZCQUFBLENBQUMsQ0FBQzt5QkFDNUMsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDWjtpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0tBQ04sQ0FBQyxDQUFDO0NBQ047O3FCQUVjLEVBQUUsbUJBQW1CLEVBQW5CLG1CQUFtQixFQUFFIiwiZmlsZSI6IkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9saWIvdHJlZS12aWV3LXNldHRpbmdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB0YWJzU2V0dGluZ3MgZnJvbSAnLi90YWJzLXNldHRpbmdzJztcblxudmFyIHBhbmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2F0b20tcGFuZWwtY29udGFpbmVyJyk7XG52YXIgb2JzZXJ2ZXJDb25maWcgPSB7IGNoaWxkTGlzdDogdHJ1ZSB9O1xudmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuXHRtdXRhdGlvbnMuZm9yRWFjaCgoKSA9PiB0b2dnbGVCbGVuZFRyZWVWaWV3KGF0b20uY29uZmlnLmdldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnKSkpO1xufSk7XG5cbi8vIE9ic2VydmUgcGFuZWxzIGZvciBET00gbXV0YXRpb25zXG5BcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHBhbmVscywgKHBhbmVsKSA9PiBvYnNlcnZlci5vYnNlcnZlKHBhbmVsLCBvYnNlcnZlckNvbmZpZykpO1xuXG5mdW5jdGlvbiBnZXRUcmVlVmlld3MoKSB7XG4gICAgdmFyIHRyZWVWaWV3cyA9IFtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRyZWUtdmlldy1yZXNpemVyJyksXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdGUtZnRwLXZpZXcnKSxcbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBudWNsaWRlVHJlZVZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubnVjbGlkZS1maWxlLXRyZWUnKTtcblxuICAgICAgICAgICAgaWYgKG51Y2xpZGVUcmVlVmlldykge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWNsaWRlVHJlZVZpZXcuY2xvc2VzdCgnLm51Y2xpZGUtdWktcGFuZWwtY29tcG9uZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICBdO1xuXG4gICAgcmV0dXJuIHRyZWVWaWV3cztcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQmxlbmRpbmdFbCgpIHtcbiAgICB2YXIgdHJlZVZpZXdzID0gZ2V0VHJlZVZpZXdzKCk7XG5cbiAgICB0cmVlVmlld3MuZm9yRWFjaCgodHJlZVZpZXcpID0+IHtcbiAgICAgICAgaWYgKHRyZWVWaWV3KSB7XG4gICAgICAgICAgICB2YXIgYmxlbmRpbmdFbCA9IHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJyk7XG5cbiAgICAgICAgICAgIGlmIChibGVuZGluZ0VsKSB7XG4gICAgICAgICAgICAgICAgdHJlZVZpZXcucmVtb3ZlQ2hpbGQoYmxlbmRpbmdFbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQmxlbmRUcmVlVmlldyhib29sKSB7XG4gICAgdmFyIHRyZWVWaWV3cyA9IGdldFRyZWVWaWV3cygpO1xuXG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgdHJlZVZpZXdzLmZvckVhY2goKHRyZWVWaWV3KSA9PiB7XG4gICAgICAgICAgICBpZiAodHJlZVZpZXcpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmxlbmRpbmdFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICAgICAgICAgIGJsZW5kaW5nRWwuY2xhc3NMaXN0LmFkZCgndGFiQmxlbmRlcicpO1xuICAgICAgICAgICAgICAgIGJsZW5kaW5nRWwuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3ICYmIGJvb2wpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVWaWV3LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUJsZW5kaW5nRWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmVlVmlldy5pbnNlcnRCZWZvcmUoYmxlbmRpbmdFbCwgdHJlZVZpZXcuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmVlVmlldyAmJiAhYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVCbGVuZGluZ0VsKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdHJlZVZpZXcgJiYgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXRvbS5wYWNrYWdlcy5nZXRBY3RpdmVQYWNrYWdlKCd0cmVlLXZpZXcnKSB8fCBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ1JlbW90ZS1GVFAnKSB8fCBhdG9tLnBhY2thZ2VzLmdldEFjdGl2ZVBhY2thZ2UoJ251Y2xpZGUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZUJsZW5kVHJlZVZpZXcoYm9vbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHRhYnNTZXR0aW5ncy5hcHBseSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyB0b2dnbGVCbGVuZFRyZWVWaWV3IH07XG4iXX0=
//# sourceURL=/C:/Users/Maxemilian/.atom/packages/atom-material-ui/lib/tree-view-settings.js
