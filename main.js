global.$ = $;

var jade = require('jade');
var course = require('course');

var __viewdir = "./views/";

var Datastore = require('nedb')
  , path = require('path')
  , db = new Datastore({ filename: path.join(require('nw.gui').App.dataPath, 'local.db') });

$(document).ready(function() {

  initDS();

  if(!sessionStorage['user']){

    $('#content').append(jade.renderFile(__viewdir + './userlogin.jade'));

    var form = document.getElementById('login-form');
    if (form.attachEvent) {
      form.attachEvent("submit", processLogin);
    } else {
      form.addEventListener("submit", processLogin);
    }

  }else{

    $('#content').append(course.render());

  }

});

function processLogin(e) {
  if (e.preventDefault) e.preventDefault();
  var form = document.getElementById('login-form');
  //console.log('Before find...');
  db.find({ $and: [{user: form.username.value}, {password: form.password.value}]}, function (err, docs) {
  //               console.log(err);
                  if(docs){
                    $('#content').append(course.render());
                  } else {
                    $('#content').append(jade.renderFile(__viewdir + './userlogin.jade', {error:'User doesnot exist.'}));
                  }

                });

  return false;
}

function initDS(){

  var doc = { user: 'demo',
             password: 'demo',
             points: null,
             coursePending: ['course001.json'],
             courseCompleted: [{course_id: '', course_file: ''}]
            };

  db.insert(doc);
  db.ensureIndex({ fieldName: 'somefield', unique: true });
}
