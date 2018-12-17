// Used below as examples:
// https://www.w3schools.com/howto/howto_js_collapsible.asp
// https://getbootstrap.com/docs/4.0/components/navbar/#responsive-behaviors
// https://stackoverflow.com/questions/27562043/having-different-click-areas-on-sidenav

// Came across mobile-detect.js and device.js interested for future development
$(document).ready(function(){
    // Navigation Menu Slider
    $('#nav-expander').on('click',function(e){
      e.preventDefault();
      $('body').toggleClass('nav-expanded');
    });
    $('.mobile-list').on('click', function(e) {
      console.log('clicked');
      e.preventDefault();
      $('body').toggleClass('nav-expanded');
    })
  });
