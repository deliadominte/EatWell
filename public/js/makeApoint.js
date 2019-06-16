toastr.options = {"positionClass": "toast-bottom-left"};
window.onload = () => {
  const userId = Cookies.get('userId');
  const profileId = new URLSearchParams(window.location.search).get('userId');
  if (userId) {
    document.getElementById('apForum').onsubmit = e => {
      e.preventDefault();

      const p1 = document.getElementById('date').value;
      const p2 = document.getElementById('time').value;
      const p3 = document.getElementById("dets").value;
      const p4 = new Date(p1 + " " + p2);

      const apoint = {
        id_user: profileId,
        id_nutri: userId,
        date: p4,
        details: p3,
        isAccepted: false
      }

      let flag = 0;
      db.collection('appointments').where('id_nutri', '==', userId).get().then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
          const apoint = doc.data();
          if (!(apoint.date.toDate() < p4) && !(apoint.date.toDate() > p4)) {
            flag = 1;
          }
        });
      });
      setTimeout(function () {
        if (flag == 1) {
          toastr.warning("There is another appointment at this date and time!");
        }
        else {
          console.log("incepe");
          db.collection('appointments').add(apoint).then(docRef => {
            index++;
            document.getElementById("active").innerHTML += '<div class="w3-card w3-round w3-white w3-center">\
                <div class="w3-container"  id="apoint">\
                  <p>Appointment</p>\
                  <img src="./media/calendar.png" alt="Calendar" style="width:50%"><br>\
                  <span>'+ p1 + ' ' + p2 + '</span><br>\
                  <span>Details: '+ p3 + '</span><br>\
                  <span>Client accepted: '+ false + '</span>\
                  <div class="w3-row w3-opacity">\
                    <div class="w3-center">\
                      <button onclick="deleteA('+ "'" + docRef.id + "'" + ', ' + "'" + index + "'" + ')" class="w3-button w3-block w3-red w3-section" title="Delete"><i class="fa fa-remove"></i></button>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <br>';
          });
          const notif={
            id_user: profileId,
            text:"New Appointment! Please accept or decline!",
            date: new Date(),
            to_check_date: false,
            href: "./index.html"
          }
          db.collection('notifications').add(notif).then();

        }}, 1000);
    
  }
  let today = new Date();
  db.collection('appointments').where('id_nutri', '==', userId).where('id_user', '==', profileId).get().then(querySnapshot => {
    querySnapshot.forEach(function (doc) {

      const apoint = doc.data();
      const date = apoint.date.toDate();
      index++;
      if(!(date < today)){
      document.getElementById("active").innerHTML += '<div class="w3-card w3-round w3-white w3-center">\
                <div class="w3-container"  id="apoint'+ index + '">\
                  <p>Appointment</p>\
                  <img src="./media/calendar.png" alt="Calendar" style="width:50%"><br>\
                  <span>'+ formatDate(apoint.date.toDate()) + '</span><br>\
                  <span>Details: '+ apoint.details + '</span><br>\
                  <span>Client accepted: '+ apoint.isAccepted + '</span>\
                  <div class="w3-row w3-opacity">\
                    <div class="w3-center">\
                      <button onclick="deleteA('+ "'" + doc.id + "'" + ', ' + "'" + index + "'" + ')" class="w3-button w3-block w3-red w3-section" title="Delete"><i class="fa fa-remove"></i></button>\
                    </div>\
                  </div>\
                </div>\
              </div>\
              <br>';
      }
      else{
        db.collection("appointments").doc(doc.id).delete().then();
      }
    });
  });

} else { window.location.href = './Login.html'; }
}
var index = 0;
function deleteA(id, i) {
  db.collection("appointments").doc(id).delete().then(document.getElementById('apoint' + i.toString()).style.display = 'none');

}
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minutes = date.getMinutes();

  if (minutes == 0)
    minutes = "00";
  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minutes;
}
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var time = today.getTime();
var yyyy = today.getFullYear();
if (dd < 10) {
  dd = '0' + dd
}
if (mm < 10) {
  mm = '0' + mm
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("date").setAttribute("min", today);

// console.log(document.getElementById("timefield").nodeValue);
// if (document.getElementById("datefield").value==today)
//     document.getElementById("timefield").setAttribute("min", time);



// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
function logout(){
  const userId = Cookies.get('userId');
  if(userId){
    Cookies.remove('userId');
    window.location.href = './LoginClient.html';

  }
}