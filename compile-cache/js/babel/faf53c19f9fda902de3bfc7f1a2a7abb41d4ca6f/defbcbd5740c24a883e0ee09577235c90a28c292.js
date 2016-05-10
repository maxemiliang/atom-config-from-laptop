'use babel';
'use strict';

var _this = this;

describe('AMU tree-view options', function () {
    beforeEach(function () {
        waitsForPromise('Theme Activation', function () {
            return atom.packages.activatePackage('atom-material-ui');
        });
        waitsForPromise('tree-view activation', function () {
            return atom.packages.activatePackage('tree-view');
        });

        _this.workspace = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(_this.workspace);
    });

    it('should be able to toggle compact tree view items', function () {
        atom.config.set('atom-material-ui.treeView.compactList', false);
        expect(_this.workspace.classList.contains('compact-tree-view')).toBe(false);

        atom.config.set('atom-material-ui.treeView.compactList', true);
        expect(_this.workspace.classList.contains('compact-tree-view')).toBe(true);
    });

    // FIXME: Should pass this test.
    // it('should be able to blend with tab-bar', () => {
    //     atom.config.set('atom-material-ui.treeView.blendTabs', false);
    //     expect(document.querySelector('.tabBlender')).toBe(null);
    //
    //     atom.config.set('atom-material-ui.treeView.blendTabs', true);
    //     expect(document.querySelector('.tabBlender')).not.toBe(null);
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9zcGVjL3NldHRpbmdzLXRyZWV2aWV3LXNwZWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOzs7O0FBRWIsUUFBUSxDQUFDLHVCQUF1QixFQUFFLFlBQU07QUFDcEMsY0FBVSxDQUFDLFlBQU07QUFDYix1QkFBZSxDQUFDLGtCQUFrQixFQUFFLFlBQU07QUFDdEMsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUM1RCxDQUFDLENBQUM7QUFDSCx1QkFBZSxDQUFDLHNCQUFzQixFQUFFLFlBQU07QUFDMUMsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDckQsQ0FBQyxDQUFDOztBQUVILGNBQUssU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNwRCxlQUFPLENBQUMsV0FBVyxDQUFDLE1BQUssU0FBUyxDQUFDLENBQUM7S0FDdkMsQ0FBQyxDQUFDOztBQUVILE1BQUUsQ0FBQyxrREFBa0QsRUFBRSxZQUFNO0FBQ3pELFlBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2hFLGNBQU0sQ0FBQyxNQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTNFLFlBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9ELGNBQU0sQ0FBQyxNQUFLLFNBQVMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0UsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0NBVU4sQ0FBQyxDQUFDIiwiZmlsZSI6IkM6L1VzZXJzL01heGVtaWxpYW4vLmF0b20vcGFja2FnZXMvYXRvbS1tYXRlcmlhbC11aS9zcGVjL3NldHRpbmdzLXRyZWV2aWV3LXNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0JztcblxuZGVzY3JpYmUoJ0FNVSB0cmVlLXZpZXcgb3B0aW9ucycsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgd2FpdHNGb3JQcm9taXNlKCdUaGVtZSBBY3RpdmF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdhdG9tLW1hdGVyaWFsLXVpJyk7XG4gICAgICAgIH0pO1xuICAgICAgICB3YWl0c0ZvclByb21pc2UoJ3RyZWUtdmlldyBhY3RpdmF0aW9uJywgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCd0cmVlLXZpZXcnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53b3Jrc3BhY2UgPSBhdG9tLnZpZXdzLmdldFZpZXcoYXRvbS53b3Jrc3BhY2UpO1xuICAgICAgICBqYXNtaW5lLmF0dGFjaFRvRE9NKHRoaXMud29ya3NwYWNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byB0b2dnbGUgY29tcGFjdCB0cmVlIHZpZXcgaXRlbXMnLCAoKSA9PiB7XG4gICAgICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5jb21wYWN0TGlzdCcsIGZhbHNlKTtcbiAgICAgICAgZXhwZWN0KHRoaXMud29ya3NwYWNlLmNsYXNzTGlzdC5jb250YWlucygnY29tcGFjdC10cmVlLXZpZXcnKSkudG9CZShmYWxzZSk7XG5cbiAgICAgICAgYXRvbS5jb25maWcuc2V0KCdhdG9tLW1hdGVyaWFsLXVpLnRyZWVWaWV3LmNvbXBhY3RMaXN0JywgdHJ1ZSk7XG4gICAgICAgIGV4cGVjdCh0aGlzLndvcmtzcGFjZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbXBhY3QtdHJlZS12aWV3JykpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICAvLyBGSVhNRTogU2hvdWxkIHBhc3MgdGhpcyB0ZXN0LlxuICAgIC8vIGl0KCdzaG91bGQgYmUgYWJsZSB0byBibGVuZCB3aXRoIHRhYi1iYXInLCAoKSA9PiB7XG4gICAgLy8gICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnLCBmYWxzZSk7XG4gICAgLy8gICAgIGV4cGVjdChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFiQmxlbmRlcicpKS50b0JlKG51bGwpO1xuICAgIC8vXG4gICAgLy8gICAgIGF0b20uY29uZmlnLnNldCgnYXRvbS1tYXRlcmlhbC11aS50cmVlVmlldy5ibGVuZFRhYnMnLCB0cnVlKTtcbiAgICAvLyAgICAgZXhwZWN0KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJCbGVuZGVyJykpLm5vdC50b0JlKG51bGwpO1xuICAgIC8vIH0pO1xufSk7XG4iXX0=
//# sourceURL=/C:/Users/Maxemilian/.atom/packages/atom-material-ui/spec/settings-treeview-spec.js
