$('document').ready(function(){


  var $main = $('#main');


  var displayMessages = function(obj) {
    obj = obj || {};
    $.ajax ({
      url : 'https://api.parse.com/1/classes/chatterbox' ,
      type : 'GET' ,
      dataType : 'json' ,
      data : {'order':'-createdAt', 'limit': 50, "where": obj} ,
      success : function (data) {
          $(".chat").remove();
          _.each (data.results , function (obj) {
            $main.append ('<div class="chat"><a href="#" class="username" name='+ DOMPurify.sanitize(obj.username)+'>' + DOMPurify.sanitize(obj.username) + '</a><span class="right">' + DOMPurify.sanitize(obj.roomname) + '</span><div id ="myText">' + DOMPurify.sanitize(obj.text) + '</div></div>')
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


$('#mesgButton').on('click',function(){
  //if room name is empty
if($('#roomName').val().length ===0){
    displayMessages();
} else{
  var roomname = $('#roomName').val();
  var obj = {'roomname': roomname};
  displayMessages(obj)}
});

  $('#joinRoom').on('click',function(){
   var roomname = $('#roomName').val();
    var obj = {'roomname': roomname};
     displayMessages(obj);});


$('div').on('click','a', function(event){
  event.preventDefault();
  var pName = this.text;
  $("[name=" + pName+ "]").siblings().toggleClass("friend");

});



});

