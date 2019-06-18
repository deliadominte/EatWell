toastr.options = {
  "positionClass": "toast-bottom-left",
  "tapToDismiss": false
};
// Make connection
var socket = io.connect('http://localhost:5500');
const userId = Cookies.get('userId');
socket.emit('login',{userId:userId});
const otherId = new URLSearchParams(window.location.search).get('userId');

window.onload = () => {
        var objToday = new Date();
        if (!userId) {
          window.location.href = './LoginClient.html';
      
        } else {
db.collection('nutritionists').doc(userId).get().then(doc => {
        if (doc.exists) {
            
          const nutri = doc.data();
          console.log(nutri.username);
          handle.value=nutri.username;
        }});
      }
    }

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        type: "nutri",
        message: message.value,
        handle: handle.value,
        id_sender: userId,
        id_reciver: otherId
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', {handle:handle.value, id:userId});
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    if((data.id_reciver==userId || data.id_reciver==otherId) && (data.id_sender==userId || data.id_sender==otherId))
    {
        if(data.type=='nutri'){
            output.innerHTML +='<div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
            <img src="./media/avatar_doctor.png" alt="Avatar" class="w3-right w3-circle w3-margin-left" style="width:60px">\
            <p class="w3-right w3-margin-left"><strong>' + data.handle + ': </strong>' + data.message + '</p>\
           </div>';
        }
        else{
            output.innerHTML +='<div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
            <img src="./media/avatar.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">\
            <p class="w3-left w3-margin-left"><strong>' + data.handle + ': </strong>' + data.message + '</p>\
            </div> ';
        }
    }
});

socket.on('typing', function(data){
  if((data.id_reciver==userId || data.id_reciver==otherId) && (data.id_sender==userId || data.id_sender==otherId))
    feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message...</em></p>';
});

socket.on('not_online', function(data){
  console.log("nu e live boss");
  toastr.error("Client isn't online!");
  const notif={
   id_user: data.id_reciver,
   text:"New Message from "+data.handle+": "+data.message,
   date: new Date(),
   to_check_date: false,
   href: "./MessagesClient.html"
 }
 db.collection('notifications').add(notif).then();
});


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
function logout() {
  const userId = Cookies.get('userId');
  if (userId) {
      Cookies.remove('userId');
      window.location.href = './LoginClient.html';

  }
}
