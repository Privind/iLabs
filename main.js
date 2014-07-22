global.$ = $;

var course = require('course');
var login = require('login');

$(document).ready(function() {

  login.init_app();

});


function processForm(e) {
  if (e.preventDefault) e.preventDefault();
  var form = document.getElementById('login-form');
  login.loginuser(form.username.value, form.password.value);

  return false;
}


function chkuser(){

  if (login.loginuser()){

    $('#content').html = "";
    $('#content').append(course.render());

  }

}

var video_source = new Array();
var audio_source = new Array();

/*function failure(e) {
  console.log("Failure");
  alert(e.name)
}*/

function start() {
  MediaStreamTrack.getSources(gotSources);
}

//function gotStream(stream) {
//  console.log("Gotstream");
//  video.src = webkitURL.createObjectURL(stream);
//}

/*function sourceChanged()
{
  var selectList = document.getElementById("sources");

  console.log("Trying to turn on cam: " + sourceIDs[selectList.selectedIndex]);

  //Try to set the video based on this source:
  navigator.webkitGetUserMedia({video: {optional: [{sourceId: videoList.selectedIndex[0].value}]}},
                               gotStream, function() {});
}*/

function gotSources(sourceInfos)
{
  var videoList = document.getElementById("video-list");
  var audioList = document.getElementById("audio-list");

  videoList.options.length = 0;
  audioList.options.length = 0;

  for (var i=0; i < sourceInfos.length; i++) {
    console.log(sourceInfos[i])
    if (sourceInfos[i].kind == 'video') {
      videoList.options.add(new Option(sourceInfos[i].label), sourceInfos[i].id);
    } else if (sourceInfos[i].kind == 'audio') {
      audioList.options.add(new Option(sourceInfos[i].label), sourceInfos[i].id);
    }
  }
}

//video = document.getElementById("videofeed");

//ffmpeg -f dshow -i video="Integrated Webcam":audio="Microphone (High Definition Aud" output.mkv
