// =require jquery
// =require jquery-ui
// =require jquery.h5validate
// =require underscore
//= require slider

(function($, undefined) {

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
    menuAvatar();

    // init slider
    var slider = new Slider();
  });
})(jQuery);
