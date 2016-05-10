(function() {
  var OurSide, Side, TheirSide,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Side = (function() {
    function Side(originalText, ref, marker, refBannerMarker, position) {
      this.originalText = originalText;
      this.ref = ref;
      this.marker = marker;
      this.refBannerMarker = refBannerMarker;
      this.position = position;
      this.conflict = null;
      this.isDirty = false;
      this.followingMarker = null;
    }

    Side.prototype.resolve = function() {
      return this.conflict.resolveAs(this);
    };

    Side.prototype.wasChosen = function() {
      return this.conflict.resolution === this;
    };

    Side.prototype.lineClass = function() {
      if (this.wasChosen()) {
        return 'conflict-resolved';
      } else if (this.isDirty) {
        return 'conflict-dirty';
      } else {
        return "conflict-" + (this.klass());
      }
    };

    Side.prototype.markers = function() {
      return [this.marker, this.refBannerMarker];
    };

    Side.prototype.toString = function() {
      var chosenMark, dirtyMark, text;
      text = this.originalText.replace(/[\n\r]/, ' ');
      if (text.length > 20) {
        text = text.slice(0, 18) + "...";
      }
      dirtyMark = this.isDirty ? ' dirty' : '';
      chosenMark = this.wasChosen() ? ' chosen' : '';
      return "[" + (this.klass()) + ": " + text + " :" + dirtyMark + chosenMark + "]";
    };

    return Side;

  })();

  OurSide = (function(_super) {
    __extends(OurSide, _super);

    function OurSide() {
      return OurSide.__super__.constructor.apply(this, arguments);
    }

    OurSide.prototype.site = function() {
      return 1;
    };

    OurSide.prototype.klass = function() {
      return 'ours';
    };

    OurSide.prototype.description = function() {
      return 'our changes';
    };

    OurSide.prototype.eventName = function() {
      return 'merge-conflicts:accept-ours';
    };

    return OurSide;

  })(Side);

  TheirSide = (function(_super) {
    __extends(TheirSide, _super);

    function TheirSide() {
      return TheirSide.__super__.constructor.apply(this, arguments);
    }

    TheirSide.prototype.site = function() {
      return 2;
    };

    TheirSide.prototype.klass = function() {
      return 'theirs';
    };

    TheirSide.prototype.description = function() {
      return 'their changes';
    };

    TheirSide.prototype.eventName = function() {
      return 'merge-conflicts:accept-theirs';
    };

    return TheirSide;

  })(Side);

  module.exports = {
    Side: Side,
    OurSide: OurSide,
    TheirSide: TheirSide
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiZmlsZTovLy9DOi9Vc2Vycy9NYXhlbWlsaWFuLy5hdG9tL3BhY2thZ2VzL21lcmdlLWNvbmZsaWN0cy9saWIvc2lkZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFNO0FBQ1MsSUFBQSxjQUFFLFlBQUYsRUFBaUIsR0FBakIsRUFBdUIsTUFBdkIsRUFBZ0MsZUFBaEMsRUFBa0QsUUFBbEQsR0FBQTtBQUNYLE1BRFksSUFBQyxDQUFBLGVBQUEsWUFDYixDQUFBO0FBQUEsTUFEMkIsSUFBQyxDQUFBLE1BQUEsR0FDNUIsQ0FBQTtBQUFBLE1BRGlDLElBQUMsQ0FBQSxTQUFBLE1BQ2xDLENBQUE7QUFBQSxNQUQwQyxJQUFDLENBQUEsa0JBQUEsZUFDM0MsQ0FBQTtBQUFBLE1BRDRELElBQUMsQ0FBQSxXQUFBLFFBQzdELENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBWixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLEtBRFgsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGVBQUQsR0FBbUIsSUFGbkIsQ0FEVztJQUFBLENBQWI7O0FBQUEsbUJBS0EsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxRQUFRLENBQUMsU0FBVixDQUFvQixJQUFwQixFQUFIO0lBQUEsQ0FMVCxDQUFBOztBQUFBLG1CQU9BLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsUUFBUSxDQUFDLFVBQVYsS0FBd0IsS0FBM0I7SUFBQSxDQVBYLENBQUE7O0FBQUEsbUJBU0EsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxvQkFERjtPQUFBLE1BRUssSUFBRyxJQUFDLENBQUEsT0FBSjtlQUNILGlCQURHO09BQUEsTUFBQTtlQUdGLFdBQUEsR0FBVSxDQUFDLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBRCxFQUhSO09BSEk7SUFBQSxDQVRYLENBQUE7O0FBQUEsbUJBaUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFBRyxDQUFDLElBQUMsQ0FBQSxNQUFGLEVBQVUsSUFBQyxDQUFBLGVBQVgsRUFBSDtJQUFBLENBakJULENBQUE7O0FBQUEsbUJBbUJBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLDJCQUFBO0FBQUEsTUFBQSxJQUFBLEdBQU8sSUFBQyxDQUFBLFlBQVksQ0FBQyxPQUFkLENBQXNCLFFBQXRCLEVBQWdDLEdBQWhDLENBQVAsQ0FBQTtBQUNBLE1BQUEsSUFBRyxJQUFJLENBQUMsTUFBTCxHQUFjLEVBQWpCO0FBQ0UsUUFBQSxJQUFBLEdBQU8sSUFBSyxhQUFMLEdBQWMsS0FBckIsQ0FERjtPQURBO0FBQUEsTUFHQSxTQUFBLEdBQWUsSUFBQyxDQUFBLE9BQUosR0FBaUIsUUFBakIsR0FBK0IsRUFIM0MsQ0FBQTtBQUFBLE1BSUEsVUFBQSxHQUFnQixJQUFDLENBQUEsU0FBRCxDQUFBLENBQUgsR0FBcUIsU0FBckIsR0FBb0MsRUFKakQsQ0FBQTthQUtDLEdBQUEsR0FBRSxDQUFDLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBRCxDQUFGLEdBQVksSUFBWixHQUFnQixJQUFoQixHQUFxQixJQUFyQixHQUF5QixTQUF6QixHQUFxQyxVQUFyQyxHQUFnRCxJQU56QztJQUFBLENBbkJWLENBQUE7O2dCQUFBOztNQURGLENBQUE7O0FBQUEsRUE2Qk07QUFFSiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsc0JBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUFHLEVBQUg7SUFBQSxDQUFOLENBQUE7O0FBQUEsc0JBRUEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUFHLE9BQUg7SUFBQSxDQUZQLENBQUE7O0FBQUEsc0JBSUEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUFHLGNBQUg7SUFBQSxDQUpiLENBQUE7O0FBQUEsc0JBTUEsU0FBQSxHQUFXLFNBQUEsR0FBQTthQUFHLDhCQUFIO0lBQUEsQ0FOWCxDQUFBOzttQkFBQTs7S0FGb0IsS0E3QnRCLENBQUE7O0FBQUEsRUF1Q007QUFFSixnQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsd0JBQUEsSUFBQSxHQUFNLFNBQUEsR0FBQTthQUFHLEVBQUg7SUFBQSxDQUFOLENBQUE7O0FBQUEsd0JBRUEsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUFHLFNBQUg7SUFBQSxDQUZQLENBQUE7O0FBQUEsd0JBSUEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUFHLGdCQUFIO0lBQUEsQ0FKYixDQUFBOztBQUFBLHdCQU1BLFNBQUEsR0FBVyxTQUFBLEdBQUE7YUFBRyxnQ0FBSDtJQUFBLENBTlgsQ0FBQTs7cUJBQUE7O0tBRnNCLEtBdkN4QixDQUFBOztBQUFBLEVBaURBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsSUFDQSxPQUFBLEVBQVMsT0FEVDtBQUFBLElBRUEsU0FBQSxFQUFXLFNBRlg7R0FsREYsQ0FBQTtBQUFBIgp9

//# sourceURL=/C:/Users/Maxemilian/.atom/packages/merge-conflicts/lib/side.coffee
