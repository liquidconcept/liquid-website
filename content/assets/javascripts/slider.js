/* Slider class */

var Slider = function() {
  this._initialize();
}
_.extend(Slider.prototype, {

  items: [],

  _timer: null,
  _activeSlide: false,

  // init function
  _initialize: function() {
    // get all items & randomize
    this.items = $('.member');
    //$('#sliders > .slider').html(this.items);

    // get container width
    this.width = $('section.team').outerWidth();

    // show only first item
    $(this.items).hide().first().show();

    // bind avatar click
    var that = this;
    $('.nav_team a').on('click', function(event) {
      event.preventDefault();

      var index = $(this).parent().siblings().andSelf().index($(this).parent());

      var next_item = $('.member').slice(index, index + 1);
      
      if ($(window).width() < 960) {} else {
        that.slide(next_item);
      }
    });


    // bind arrows click
    $('nav.next, nav.previous').on('click', function(event) {
      event.preventDefault();
      var direction = $(this).hasClass('next') ? 'next' : 'previous';
      var visibleItem = $('nav').siblings('section.members').children('.member').filter(':visible');
      var next_item = visibleItem.next();

      if (direction === 'next') {
        if (next_item.length === 0) {
          next_item = that.items.first();
        }
      } else {
        next_item = visibleItem.prev();
        if (next_item.length === 0) {
          next_item = that.items.last();
        }
      }

      that.slide(next_item, direction);
    });

    // bind
    _.bindAll(this);
  },

  // slide function
  slide: function(nextItem, direction) {
    var that = this;

    this._activeSlide = true; // slide is active

    // get current item
    var visibleItem = $(this.items).filter(':visible');

    // get previous item
    var previousItem = visibleItem.prev();

    // get item following current item if not set
    if (nextItem === undefined) {
      nextItem = visibleItem.next();

      if (nextItem.length === 0) {
        nextItem = $(this.items).first();
      }
    // interupt slide if next item is already visible
    } else if (nextItem.is(':visible')) {
      this._activeSlide = false; // slide is no more active
      return;
    // else ensure next item is a jQuery collection
    } else {
      nextItem = $(nextItem);
    }

    // move next item at right of current item
    nextItem.css('left', (direction === 'previous' ? '-' : '') + this.width + 'px');

    // find index of avatar for current & next item
    var visibleAvatarIndex = $(this.items).index(visibleItem);
    var nextAvatarIndex = $(this.items).index(nextItem);

    // animate avatar
    _.each([$('.nav_team .col-md-2').slice(visibleAvatarIndex, visibleAvatarIndex + 1), $('.nav_team .col-md-2').slice(nextAvatarIndex, nextAvatarIndex + 1)], function(avatar) {
      avatar.toggleClass('active');
    }, this);

    // animate items
    _.each([visibleItem, nextItem], function(item) {
      item.show().animate({
        left:  (direction === 'previous' ? '+=' : '-=') + this.width + 'px'
      },

      function() {
        visibleItem.hide();         // ensure old current item is hidden
        that._activeSlide = false;  // slide is no more active
      });
    }, this);
  }
});