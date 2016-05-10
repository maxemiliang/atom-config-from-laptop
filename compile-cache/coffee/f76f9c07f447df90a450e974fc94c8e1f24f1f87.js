(function() {
  var Conflict, NavigationView, util;

  NavigationView = require('../../lib/view/navigation-view').NavigationView;

  Conflict = require('../../lib/conflict').Conflict;

  util = require('../util');

  describe('NavigationView', function() {
    var conflict, conflicts, editor, editorView, view, _ref;
    _ref = [], view = _ref[0], editorView = _ref[1], editor = _ref[2], conflicts = _ref[3], conflict = _ref[4];
    beforeEach(function() {
      return util.openPath("triple-2way-diff.txt", function(v) {
        editorView = v;
        editor = editorView.getModel();
        conflicts = Conflict.all({}, editor);
        conflict = conflicts[1];
        return view = new NavigationView(conflict.navigator, editor);
      });
    });
    it('deletes the separator line on resolution', function() {
      var c, text, _i, _len;
      for (_i = 0, _len = conflicts.length; _i < _len; _i++) {
        c = conflicts[_i];
        c.ours.resolve();
      }
      text = editor.getText();
      return expect(text).not.toContain("My middle changes\n=======\nYour middle changes");
    });
    it('scrolls to the next diff', function() {
      var p;
      spyOn(editor, "setCursorBufferPosition");
      view.down();
      p = conflicts[2].ours.marker.getTailBufferPosition();
      return expect(editor.setCursorBufferPosition).toHaveBeenCalledWith(p);
    });
    return it('scrolls to the previous diff', function() {
      var p;
      spyOn(editor, "setCursorBufferPosition");
      view.up();
      p = conflicts[0].ours.marker.getTailBufferPosition();
      return expect(editor.setCursorBufferPosition).toHaveBeenCalledWith(p);
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9zcGVjL3ZpZXcvbmF2aWdhdGlvbi12aWV3LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUMsaUJBQWtCLE9BQUEsQ0FBUSxnQ0FBUixFQUFsQixjQUFELENBQUE7O0FBQUEsRUFFQyxXQUFZLE9BQUEsQ0FBUSxvQkFBUixFQUFaLFFBRkQsQ0FBQTs7QUFBQSxFQUdBLElBQUEsR0FBTyxPQUFBLENBQVEsU0FBUixDQUhQLENBQUE7O0FBQUEsRUFLQSxRQUFBLENBQVMsZ0JBQVQsRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLFFBQUEsbURBQUE7QUFBQSxJQUFBLE9BQWtELEVBQWxELEVBQUMsY0FBRCxFQUFPLG9CQUFQLEVBQW1CLGdCQUFuQixFQUEyQixtQkFBM0IsRUFBc0Msa0JBQXRDLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7YUFDVCxJQUFJLENBQUMsUUFBTCxDQUFjLHNCQUFkLEVBQXNDLFNBQUMsQ0FBRCxHQUFBO0FBQ3BDLFFBQUEsVUFBQSxHQUFhLENBQWIsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFTLFVBQVUsQ0FBQyxRQUFYLENBQUEsQ0FEVCxDQUFBO0FBQUEsUUFFQSxTQUFBLEdBQVksUUFBUSxDQUFDLEdBQVQsQ0FBYSxFQUFiLEVBQWlCLE1BQWpCLENBRlosQ0FBQTtBQUFBLFFBR0EsUUFBQSxHQUFXLFNBQVUsQ0FBQSxDQUFBLENBSHJCLENBQUE7ZUFLQSxJQUFBLEdBQVcsSUFBQSxjQUFBLENBQWUsUUFBUSxDQUFDLFNBQXhCLEVBQW1DLE1BQW5DLEVBTnlCO01BQUEsQ0FBdEMsRUFEUztJQUFBLENBQVgsQ0FGQSxDQUFBO0FBQUEsSUFXQSxFQUFBLENBQUcsMENBQUgsRUFBK0MsU0FBQSxHQUFBO0FBQzdDLFVBQUEsaUJBQUE7QUFBQSxXQUFBLGdEQUFBOzBCQUFBO0FBQUEsUUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxPQUFBO0FBQUEsTUFDQSxJQUFBLEdBQU8sTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQURQLENBQUE7YUFFQSxNQUFBLENBQU8sSUFBUCxDQUFZLENBQUMsR0FBRyxDQUFDLFNBQWpCLENBQTJCLGlEQUEzQixFQUg2QztJQUFBLENBQS9DLENBWEEsQ0FBQTtBQUFBLElBZ0JBLEVBQUEsQ0FBRywwQkFBSCxFQUErQixTQUFBLEdBQUE7QUFDN0IsVUFBQSxDQUFBO0FBQUEsTUFBQSxLQUFBLENBQU0sTUFBTixFQUFjLHlCQUFkLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLElBQUwsQ0FBQSxDQURBLENBQUE7QUFBQSxNQUVBLENBQUEsR0FBSSxTQUFVLENBQUEsQ0FBQSxDQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBekIsQ0FBQSxDQUZKLENBQUE7YUFHQSxNQUFBLENBQU8sTUFBTSxDQUFDLHVCQUFkLENBQXNDLENBQUMsb0JBQXZDLENBQTRELENBQTVELEVBSjZCO0lBQUEsQ0FBL0IsQ0FoQkEsQ0FBQTtXQXNCQSxFQUFBLENBQUcsOEJBQUgsRUFBbUMsU0FBQSxHQUFBO0FBQ2pDLFVBQUEsQ0FBQTtBQUFBLE1BQUEsS0FBQSxDQUFNLE1BQU4sRUFBYyx5QkFBZCxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUksQ0FBQyxFQUFMLENBQUEsQ0FEQSxDQUFBO0FBQUEsTUFFQSxDQUFBLEdBQUksU0FBVSxDQUFBLENBQUEsQ0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXpCLENBQUEsQ0FGSixDQUFBO2FBR0EsTUFBQSxDQUFPLE1BQU0sQ0FBQyx1QkFBZCxDQUFzQyxDQUFDLG9CQUF2QyxDQUE0RCxDQUE1RCxFQUppQztJQUFBLENBQW5DLEVBdkJ5QjtFQUFBLENBQTNCLENBTEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/spec/view/navigation-view-spec.coffee
