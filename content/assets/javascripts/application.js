//= require jquery
//= require jquery-ui
//= require modernizr
//= require respond
//= require moment
//= require underscore
//= require slider

(function($, undefined) {

  var isOfficeOpen = function() {
    // set UTC 2
    // moment().zone(120);

    var hour = moment().hour();
    var day = moment().day();
    var date = moment().format('L');
    var week_of_year = moment().week();

    if((day === 6) || (day === 0)) {
      return false;
    } else if((hour < 9) || (hour > 16)) {
      return false;
    } else if((week_of_year % 2 == 0) && (day === 5)) {
      return false;
    }

    return true;
  }

  var menuAvatar = function() {
    var active_avatar = $('.avatar').find('a.active');

    $('.avatar > .col-md-2 > a').mouseover(function() {
      var current_avatar = $(this).data('avatarValue');
      var current_avatar_name = $(".avatar .col-md-2 div[data-avatar-value='"+ current_avatar +"']");

      current_avatar_name.find('p').css('color', '#0078de');
    }).mouseout(function() {
      var current_avatar = $(this).data('avatarValue');
      var current_avatar_name = $(".avatar .col-md-2 div[data-avatar-value='"+ current_avatar +"']");

      current_avatar_name.find('p.name').css('color', '#404040');
      current_avatar_name.find('p.nickname').css('color', '#777777');
    });
  }



  // init function
  $(function(){
    if (isOfficeOpen()) {
      $('article.email').addClass('opacity');
    } else {
      $('article.phone').addClass('opacity');
    }

    menuAvatar();

    // init slider
    var slider = new Slider();
  });
})(jQuery);
