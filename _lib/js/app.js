// app.js
jQuery(document).ready(function() {
  var siteUrl = 'http://'+(document.location.hostname||document.location.host);
  $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
    e.preventDefault();
    History.pushState({}, "", this.pathname);
  });

  History.Adapter.bind(window, 'statechange', function() {
    var State = History.getState();
    $.get(State.url, function(data) {
      document.title = data.match(/<title>(.*?)<\/title>/)[1];
      $('.content').html($(data).find('.content'));
    });
  });
});
