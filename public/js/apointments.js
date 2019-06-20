
window.onload = () => {
  const userId = Cookies.get('userId');

  if (!userId) {
    window.location.href = './LoginNutri.html';

  } else {
    var objToday = new Date(),
      weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
      dayOfWeek = weekday[objToday.getDay()],
      domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
      dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
      months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      curMonth = months[objToday.getMonth()],
      curYear = objToday.getFullYear(),
      curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
      curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
      curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
      curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;


    document.getElementById("title").innerHTML += '<li>\
    '+ curMonth + '<br>\
    <span style="font-size:18px">'+ curYear + '</span><br>\
  </li>';

    document.getElementById("week").innerHTML += '<li>' + weekday[objToday.getDay() % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 1) % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 2) % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 3) % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 4) % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 5) % 7] + '</li>\
    <li>'+ weekday[(objToday.getDay() + 6) % 7] + '</li>';

    let day = objToday.getDate();
    db.collection('appointments').where("id_nutri", "==", userId).where("isAccepted", "==", true).get().then(querySnapshot => {
      querySnapshot.forEach(function (doc) {
        const appointments = doc.data();
        var objApp = appointments.date.toDate(),
          weekdayA = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
          dayOfWeekA = weekdayA[objApp.getDay()],
          domEnderA = function () { var a = objApp; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
          dayOfMonthA = todayA + (objApp.getDate() < 10) ? '0' + objApp.getDate() + domEnder : objApp.getDate() + domEnder,
          monthsA = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
          curMonthA = monthsA[objApp.getMonth()],
          curYearA = objApp.getFullYear(),
          curHourA = objApp.getHours() > 12 ? objApp.getHours() - 12 : (objApp.getHours() < 10 ? "0" + objApp.getHours() : objApp.getHours()),
          curMinuteA = objApp.getMinutes() < 10 ? "0" + objApp.getMinutes() : objApp.getMinutes(),
          curSecondsA = objApp.getSeconds() < 10 ? "0" + objApp.getSeconds() : objApp.getSeconds(),
          curMeridiemA = objApp.getHours() > 12 ? "PM" : "AM";
        var todayA = curHourA + ":" + curMinuteA + "." + curSecondsA + curMeridiemA + " " + dayOfWeekA + " " + dayOfMonthA + " of " + curMonthA + ", " + curYearA;


        if (curMonthA == curMonth && curYearA == curYear && objApp.getDate() < day + 7) {
          let h;
          if (curMeridiemA == "PM")
            h = curHourA + 12;
          else h = curHourA;
          db.collection('users').doc(appointments.id_user).get().then(doc => {
            if (doc.exists) {
              const user = doc.data();
              if (parseInt(h) <= 19 && parseInt(h) >= 8) {
                let d = (parseInt(objApp.getDate()) - parseInt(day)) + 1;
                document.getElementById(h + d.toString()).innerHTML += '<a href="./ProfileClient.html?userId=' + doc.id + '">' + user.username + '</a>';

              }
            }
          });
        }
      });
    });

  }
}
// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}
function logout() {
  const userId = Cookies.get('userId');
  if (userId) {
    Cookies.remove('userId');
    window.location.href = './LoginClient.html';

  }
}