
// Make connection
var socket = io.connect('http://localhost:5500');

const userId = Cookies.get('userId');

// Query DOM
var nutriId = "", usersIds = "", conversation_id;
var handle, isClient;

db.collection('users').doc(userId).get().then(doc => {
  if (doc.exists) {

    const user = doc.data();
    handle = user.username;
    isClient = true;
    nutriId = user.id_nutri;
    console.log(user.id_nutri);
    console.log(isClient);
    conversation_id = userId + nutriId;
    document.getElementById("buttonOpen").setAttribute("onclick", "openForm('" + conversation_id + "')");
    document.getElementById("buttonClose").setAttribute("onclick", "closeForm('" + conversation_id + "')");
    document.getElementById("myFormC").id = "myFormC" + conversation_id;
    document.getElementById("output").id = "output" + conversation_id;
    document.getElementById("feedback").id = "feedback" + conversation_id;
    document.getElementById("message").id = "message" + conversation_id;
    document.getElementById("send").id = "send" + conversation_id;
    socket.emit('subscribe', conversation_id);
    // Emit events
    document.getElementById('send' + conversation_id).addEventListener('click', function () {
      socket.emit('send_chat', {
        room: conversation_id,
        message: document.getElementById('message' + conversation_id).value,
        handle: handle
      });
      document.getElementById('message' + conversation_id).value = "";
      console.log(conversation_id);
      document.getElementById('message' + conversation_id).addEventListener('keypress', function () {
        socket.emit('typing', handle);
      })
    });
  }
});
db.collection('nutritionists').doc(userId).get().then(doc => {
  if (doc.exists) {
    const user = doc.data();
    handle = user.username;
    isClient = false;
    usersIds = user.id_users;
    var i;
    console.log(usersIds);
    for (i = 0; i < usersIds.length; ) {
      db.collection('users').doc(usersIds[i]).get().then(doc => {
        if (doc.exists) {
          const user = doc.data();
          console.log(user.username);
          conversation_id = usersIds[i] + userId;
          console.log(conversation_id);
          document.getElementById("people").innerHTML += '<div id="' + usersIds[i] + '"class="w3-container w3-card w3-white w3-round w3-margin"><br>\
          <img src="./media/avatar.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">\
          <h4>'+ user.username + '</h4>\
          <button onclick="openForm('+ "'" + conversation_id + "'" + ')"   class="w3-button w3-theme-d1 w3-margin-bottom w3-right"> See Messages <i class="	fa fa-angle-right"></i></button>\
        </div>';
        //   document.getElementById("chat_people").innerHTML += '<button class="open-button" onclick="openForm(' + "'" + conversation_id + "'" + ')">Chat</button>\
        // <div class="chat-popup" id="myFormC'+ conversation_id + '" style="display: none">\
        //   <form class="form-container" id="form-container">\
        //     <h1 id="name">Chat '+ user.username + '</h1>\
        //      <div id="output'+ conversation_id + '"></div>\
        //      <div id="feedback'+ conversation_id + '"></div>\
        //     <textarea id="message'+ conversation_id + '" placeholder="Type message.." name="msg" required></textarea>\
        //     <button type="submit" id="send'+ conversation_id + '" class="btn">Send</button>\
        //     <button  type="button" class="btn cancel" onclick="closeForm('+ "'" + conversation_id + "'" + ')">Close</button>\
        //   </form>\
        // </div>';
          socket.emit('subscribe', conversation_id);
          
          document.getElementById('message' + conversation_id).addEventListener('click', function () {
            socket.emit('send_chat', {
              room: conversation_id,
              message: document.getElementById('message' + conversation_id).value,
              handle: handle
            })
          });
          document.getElementById('message' + conversation_id).value = "";
          
          document.getElementById('message' + conversation_id).addEventListener('keypress', function () {
            socket.emit('typing', handle);
          });
        }
        i++;
      });
    }
    console.log(isClient);
    // Emit events

  }
});






// Listen for events
socket.on('chat', function (data) {
  if (data.message != "") {
    document.getElementById("feedback" + conversation_id).innerHTML = '';
    let objToday = new Date(), curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
      curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes();
    if (isClient == false)
      document.getElementById("output" + conversation_id).innerHTML += '\
    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
            <img src="./media/avatar_doctor.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">\
            <span class="w3-right w3-opacity w3-margin-bottom">'+ curHour + ':' + curMinute + '</span><br>\
            <p><strong>' + data.handle + ': </strong>' + data.message + '</p>\
            </div>  \
    ';
    else document.getElementById("output" + conversation_id).innerHTML += '\
    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
    <img src="./media/avatar.png" alt="Avatar" class="w3-right w3-circle w3-margin-left" style="width:60px">\
    <span class="w3-left w3-opacity w3-margin-bottom">'+ curHour + ':' + curMinute + '</span><br>\
            <p><strong>' + data.handle + ': </strong>' + data.message + '</p>\
            </div>  \
    ';
  }
});

socket.on('typing', function (data) {
  // if(data.room==conversation_id){
  document.getElementById("feedback" + conversation_id).innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';

});
function openForm(i) {
  if (i == 1)
    document.getElementById("myForm").style.display = "block";
  else {
    document.getElementById("myFormC" + i).style.display = "block";
    if (document.getElementById("myForm"))
      document.getElementById("myForm").style.display = "none";
  }
}

function closeForm(i) {
  if (i == 1)
    document.getElementById("myForm").style.display = "none";
  else
    document.getElementById("myFormC" + i).style.display = "none";
}

// const out = document.getElementById("form-container");
// let c = 0;
// setInterval(function() {
//     // allow 1px inaccuracy by adding 1
//     const isScrolledToBottom = out.scrollHeight - out.clientHeight >= out.scrollTop + 1;

//     // scroll to bottom if isScrolledToBottom is true
//     if (isScrolledToBottom) {
//       out.scrollTop = out.scrollHeight - out.clientHeight;
//     }
// }, 500)

function openClientM() {
  openForm(2);

}