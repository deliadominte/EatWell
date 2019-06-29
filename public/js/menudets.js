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
window.onload = () => {
    const userId = Cookies.get('userId');
    const profileId = new URLSearchParams(window.location.search).get('userId');

    if (!userId) {
        window.location.href = './LoginNutri.html';

    } else {

//         menu={
// date: new Date('2019-06-28'),
// description:["breakfast","lunch","dinner"],
// id_nutri:"r4gXABlPsltaCX7RD2k2",
// id_user:"NuGXB2eFg1Lsm2tb7zi7",
// is_done:[true,true,true],
// meals:["VMRD2eacL0rVkfyThoPk","KxveQ21oj8OQC4GooCWK","xZXhBELaa0P8phqsE64G"]
//         }
//         db.collection('menus').add(menu).then(console.log('done'));
        document.getElementById("title").innerHTML += '<li>\
      '+ curMonth + '<br>\
      <span style="font-size:18px">'+ curYear + '</span><br>\
    </li>';
        var firstDay = new Date("01-" + curMonth + "-" + curYear);
        var week = new Array('<li>Su</li>', '<li>Mo</li>', '<li>Tu</li>', '<li>We</li>', '<li>Th</li>', '<li>Fr</li>', '<li>Sa</li>');
        let i;
        for (i = firstDay.getDay(); i < firstDay.getDay() + 7; i++) {
            document.getElementById("weekdays").innerHTML += week[i % 7];

        }
        var maxDay = new Date(curYear, objToday.getMonth() + 1, 0).getDate();
        var d = new Date(curYear, objToday.getMonth(), 1);
        for (i = 1; i < maxDay; i++) {
            f(d, profileId, objToday, i).then(d = new Date(curYear, objToday.getMonth(), i + 1));
        }
        f(d, profileId, objToday, i).then();
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

async function f(d, profileId, today, i) {
    let flag = 0;
    let done = false;
    if ((d.getDate() == today.getDate()) && (d.getMonth() == today.getMonth()) && (d.getFullYear() == today.getFullYear())) {
        document.getElementById("days").innerHTML += '<li id="li' + i + '"><a href="./SetMenu.html?userId=' + profileId + '&date=' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '" title="Set the menu"><span class="active">' + i + '</span></a></li>';
    }
    else if (d > today) {
        document.getElementById("days").innerHTML += '<li id="li' + i + '"><a href="./SetMenu.html?userId=' + profileId + '&date=' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '" title="Set the menu">' + i + '</a></li>';
    } else {
        document.getElementById("days").innerHTML += '<li id="li' + i + '"><a href="" title="No data">' + i + '</a></li>';
    }
    db.collection('menus').where('id_user', '==', profileId).get().then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
            const menu = doc.data();
            var j;
            done = true;
            for (j = 0; j < menu.is_done.length; j++)
                if (menu.is_done[j] == false) { done = false; }
            if ((menu.date.toDate().getDate() == d.getDate()) && (menu.date.toDate().getMonth() == d.getMonth()) && (menu.date.toDate().getFullYear() == d.getFullYear()))//adica e egal
            {
                flag = doc.id;
                if ((d.getDate() == today.getDate()) && (d.getMonth() == today.getMonth()) && (d.getFullYear() == today.getFullYear())) {
                    if (done == true)
                        document.getElementById("li" + i).innerHTML = '<li><a href="./DayMenu.html?menuId=' + flag + '" title="Client finished the menu"><span class="active"><i class="fa fa-check"></i></span></a></li>';
                    else document.getElementById("li" + i).innerHTML = '<li><a href="./DayMenu.html?menuId=' + flag + '" title="Menu was set"><span class="active">' + i + '</span></a></li>';
                }
                else {
                    if (d > today) {
                        if (done == true)
                            document.getElementById("li" + i).innerHTML = '<li><a href="" title="No data"><i class="	fa fa-remove"></i></a></li>';
                        else
                            document.getElementById("li" + i).innerHTML = '<li><a href="./DayMenu.html?menuId=' + flag + '" title="Menu was set"><span class="set">' + i + '</span></a></a></li>';
                    } else {
                        if (done == true)
                            document.getElementById("li" + i).innerHTML = '<li><a href="./DayMenu.html?menuId=' + flag + '" title="Client finished the menu"><i class="fa fa-check"></i></a></li>';
                        else
                            document.getElementById("li" + i).innerHTML = '<li><a href="./DayMenu.html?menuId=' + flag + '" title="Client did not finished the menu"><i class="	fa fa-remove"></i></i></a></li>';
                    }
                }
            }
        });
    });
    return true;
}

function logout() {
    const userId = Cookies.get('userId');
    if (userId) {
        Cookies.remove('userId');
        window.location.href = './LoginClient.html';

    }
}