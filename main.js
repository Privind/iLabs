global.$ = $;

var course = require('course');

$(document).ready(function() {
  $('#course').append(course.render());
});
