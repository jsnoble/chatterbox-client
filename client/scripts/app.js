$('document').ready(function(){


  var $main = $('#main');


  var displayMessages = function() {
    $.ajax ({
      url : 'https://api.parse.com/1/classes/chatterbox' ,
      type : 'GET' ,
      dataType : 'json' ,
      data : {'order':'-createdAt'} ,
      success : function (data) {
          $(".chat").remove();
          _.each (data.results , function (obj) {
            $main.append ('<div class="chat"><span class="username">' + DOMPurify.sanitize(obj.username) + '</span><span class="right">' + DOMPurify.sanitize(obj.roomname) + '</span><div>' + DOMPurify.sanitize(obj.text) + '</div></div>')
          });
      } ,
      error : function () {
        console.log ("we failed");
      } ,
      complete : function () {
        console.log ('ajax ran');
      }
    });
  };



var postMessage = function(messagePost ) {


  $.ajax ({

    url : 'https://api.parse.com/1/classes/chatterbox' ,
    type : 'POST' ,
    data : JSON.stringify(messagePost) ,
    contentType : 'application/json' ,
    success : function (data) {
      console.log ('chatterbox: Message sent');
    } ,
    error : function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error ('chatterbox: Failed to send message');
    }
  });

};
  $('#submit').on('click', function(){
    event.preventDefault ();
    var message ={
      username: $('#username').val(),
      text: $('#text').val(),
      roomname: $('#roomName').val()
    };
    console.log(message);
    postMessage(message);
  });

  displayMessages();


  $('#mesgButton').on('click',function(){ return displayMessages();});


});

