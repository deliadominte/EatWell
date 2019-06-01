
// Make connection
var socket = io.connect('http://localhost:5500');

// Query DOM
var message = document.getElementById('message'),
      handle,isClient,
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
const userId = Cookies.get('userId');
db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
          const user = doc.data();
          handle = user.username;
          isClient=true;
          
          console.log(isClient);
        }});
db.collection('nutritionists').doc(userId).get().then(doc => {
          if (doc.exists) {
            const user = doc.data();
            handle = user.username;
            isClient=false;
            
            console.log(isClient);
          }});
// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle
    });
    message.value = "";
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle);
})

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    let objToday = new Date(), curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes();
    if(isClient==false)
    output.innerHTML += '\
    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
            <img src="./media/avatar_doctor.png" alt="Avatar" class="w3-left w3-circle w3-margin-right" style="width:60px">\
            <span class="w3-right w3-opacity w3-margin-bottom">'+curHour+':'+curMinute+'</span><br>\
            <p><strong>' + data.handle + ': </strong>' + data.message + '</p>\
            </div>  \
    ';
    else output.innerHTML += '\
    <div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
    <img src="./media/avatar.png" alt="Avatar" class="w3-right w3-circle w3-margin-left" style="width:60px">\
    <span class="w3-left w3-opacity w3-margin-bottom">'+curHour+':'+curMinute+'</span><br>\
            <p><strong>' + data.handle + ': </strong>' + data.message + '</p>\
            </div>  \
    ';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
function openForm(i) {
  if (i==1)
    document.getElementById("myForm").style.display = "block";
  else document.getElementById("myFormC").style.display = "block";
  }
  
  function closeForm(i) {
    if (i==1)
    document.getElementById("myForm").style.display = "none";
    else 
    document.getElementById("myFormC").style.display = "none";
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
  
 function openClientM(){
    openForm(2);

  }