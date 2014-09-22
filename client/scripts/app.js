// YOUR CODE HERE:
var app = {
  init: function(){
    this.server = 'https://api.parse.com/1/classes/chatterbox';
    this.fetch();
    $('#main').on('click', '.username', function(){
      // console.log(this.text())
      var username1 = $(this).text();
      app.addFriend(username1);
    });
    $('.submit').on('click', function(){
      console.log('triggered') 
      app.handleSubmit();
    });
    $('.update').on('click', function(){
    app.addMessage(app.fetch());
    });
  },
  send: function(message){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function(){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      // dataType: 'string',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received: ' + data);
        return data;
      },
      error: function (data) {
        console.error('chatterbox: Failed to send received');
      }
  })
  },
  clearMessages: function(){
    $('#chats').children().remove();
  },
  addMessage: function(message){
    var temp = "<div><div class='message'>"+message.text+"<div class='username'>"+message.username+"</div>";
    $('#chats').append(temp);
  },
  addRoom: function(room){
    var temp = "<div class="+room+">"+room+"</div>";
    $('#roomSelect').append(temp);
  },
  addFriend: function(friend){},
  handleSubmit: function(){
    var messagepart = $('.text-message').text()
    var userpart = String.prototype.slice.call(window.location.search, 10)
    var message = {
          username: userpart,
          text: messagepart,
          roomname: 'lobby'
        };
    app.send(message)
  }

};
$(document).ready(function() {
    app.init();
});
