
toastr.options = { "positionClass": "toast-bottom-left" };
var flag_add = false;
window.onload = function () {
    const userId = Cookies.get('userId');
    if (!userId) {
        window.location.href = './Login.html';

    } else {

        let profileId;
        if (new URLSearchParams(window.location.search).has('userId'))
            profileId = new URLSearchParams(window.location.search).get('userId');
        else profileId = userId;

        document.getElementById('btn').innerHTML = '\
        <button id="btn1" class="w3-button w3-theme-d2 w3-margin-bottom" disabled="true" onclick="make_chart(1,'+ "'" + profileId + "'" + ')">Weight</button>\
        <button id="btn2" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(2,'+ "'" + profileId + "'" + ')">Height</button>\
        <button id="btn3" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(3,'+ "'" + profileId + "'" + ')">BodyFat</button>\
        <button id="btn4" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(4,'+ "'" + profileId + "'" + ')">Arms</button>\
        <button id="btn5" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(5,'+ "'" + profileId + "'" + ')">Waistline</button>\
        <button id="btn6" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(6,'+ "'" + profileId + "'" + ')">Butt</button>\
        <button id="btn7" class="w3-button w3-theme-d2 w3-margin-bottom" onclick="make_chart(7,'+ "'" + profileId + "'" + ')">Thighs</button>';
        make_chart(1, profileId);

        let flag = 0;
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                flag = 1;
                document.getElementById("nav").innerHTML = '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"\
                    href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>\
                  <a href="./index.html" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"\
                    style="font-family: '+ "'Exo'" + ', sans-serif;"><i class="fa fa-home w3-margin-right"></i>EatWell</a>\
                  <a href="./SettingsClient.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
                    title="Account"><i class="fa fa-user"></i></a>\
                    <a href="./MenuDetsClient.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
                    title="Meniu Calendar"><i class="fa fa-bars"></i></a>\
                  <a href="./ProgressClient.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
                    title="Progress"><i class="fa fa-line-chart"></i></a>\
                    <div class="w3-dropdown-hover w3-hide-small">\
                    <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span\
                        id="nrNotif" class="w3-badge w3-right w3-small w3-green"></span></button>\
                    <div id="notif" class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
                      \
                    </div>\
                  </div>\
                  <button onclick="logout()" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-theme-d4" title="Logout">\
        <img src="./media/avatar2.png" class="w3-circle w3-theme-d0" style="height:23px;width:23px" alt="Avatar">\
      </button>';
                document.getElementById("navDemo").innerHTML = '\
                <br><br>\
                    <a href="./SettingsClient.html" class="w3-bar-item w3-button w3-padding-large">Account</a>\
                    <a href="./MenuDetsClient.html" class="w3-bar-item w3-button w3-padding-large">Menu Calendar</a>\
                    <a href="./ProgressClient.html" class="w3-bar-item w3-button w3-padding-large">Progress</a>';

            }
        });
        if (flag == 0) {
            document.getElementById("nav").innerHTML = '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"\
              href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>\
            <a href="./indexNutri.html" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"\
              style="font-family: '+ "'Exo'" + ', sans-serif;"><i class="fa fa-home w3-margin-right"></i>EatWell</a>\
            <a href="./RecipesList.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
              title="Recipes"><i class="fa fa-bars"></i></a>\
            <a href="./Apointments.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
              title="Appointments"><i class="fa fa-calendar"></i></a>\
              <div class="w3-dropdown-hover w3-hide-small">\
              <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span\
                  id="nrNotif" class="w3-badge w3-right w3-small w3-green"></span></button>\
              <div id="notif" class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
                \
              </div>\
            </div>\
            <button onclick="logout()" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-theme-d4" title="Logout">\
        <img src="./media/avatar2.png" class="w3-circle w3-theme-d0" style="height:23px;width:23px" alt="Avatar">\
      </button>';
            document.getElementById("navDemo").innerHTML = '<br><br><a href="./RecipesList.html" class="w3-bar-item w3-button w3-padding-large">Recipes</a>\
              <a href="./Apointments.html" class="w3-bar-item w3-button w3-padding-large">Appointments</a>';
        }
        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                document.getElementById("measures").innerHTML += '\
          <p>Weight: '+ user.weight[user.weight.length - 1] + ' kg</p>\
          <p>Height: '+ user.height[user.height.length - 1] + ' cm</p>\
          <p>Body Fat: '+ user.body_fat[user.body_fat.length - 1] + ' %</p>\
          <p>Arms: '+ user.arms[user.arms.length - 1] + ' cm</p>\
          <p>Waistline: '+ user.waistline[user.waistline.length - 1] + ' cm</p>\
          <p>Butt: '+ user.butt[user.butt.length - 1] + ' cm</p>\
          <p>Thighs: '+ user.thighs[user.thighs.length - 1] + ' cm</p>\
          <p>Level of activity: '+ user.activity[user.activity.length - 1] + '</p>';
                document.getElementById("goal").innerHTML += user.goal[user.goal.length - 1] + " kg";
                document.getElementById("weight").innerHTML += user.weight[user.weight.length - 1] + " kg";
                document.getElementById("maxweight").innerHTML += fmax(user.weight) + " kg";
                document.getElementById("prog").innerHTML += Math.floor(100 - ((user.weight[user.weight.length - 1] - user.goal[user.goal.length - 1]) * 100) / (fmax(user.weight) - user.goal[user.goal.length - 1])) + "%";
                document.getElementById("prog").setAttribute("aria-valuenow", (-1) * user.weight[user.weight.length - 1]);
                document.getElementById("prog").setAttribute("aria-valuemin", (-1) * fmax(user.weight));
                document.getElementById("prog").setAttribute("aria-valuemax", (-1) * user.goal[user.goal.length - 1]);
                document.getElementById("prog").setAttribute("style", "width:" + Math.floor(100 - ((user.weight[user.weight.length - 1] - user.goal[user.goal.length - 1]) * 100) / (fmax(user.weight) - user.goal[user.goal.length - 1])) + "%");

                if (user.time_prog.length >= 2) {
                    var diff_days = Math.floor((user.time_prog[user.time_prog.length - 1].toDate().getTime() - user.time_prog[0].toDate().getTime()) / (1000 * 60 * 60 * 24));
                    var diff_weight_left = Math.abs(user.goal[user.goal.length - 1] - user.weight[user.weight.length - 1]);
                    var diff_weight_done = Math.abs(user.weight[user.weight.length - 1] - user.goal[user.goal.length - 1]);
                    //console.log((diff_days / diff_weight_done) * diff_weight_left);
                    var date_done = new Date();
                    date_done.setDate(toDay.getDate() + (diff_days / diff_weight_done) * diff_weight_left);
                    //console.log(date_done);
                    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                        curMonth = months[date_done.getMonth()];
                }
                else {
                    let kg_per_day = (0.5) / 7;
                    var diff_weight_left = Math.abs(user.goal[0] - user.weight[0]);
                    var date_done = new Date();
                    date_done.setDate(toDay.getDate() + ( diff_weight_left/kg_per_day));
                    //console.log(date_done);
                    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                        curMonth = months[date_done.getMonth()];
                }
            }
            document.getElementById("estimation").innerHTML += "We estimate that you will achive your goal until:<strong> " + date_done.getUTCDate() + ' ' + curMonth + ' ' + date_done.getFullYear() + "</strong>";
        
        });
    document.getElementById('getInfoForum').onsubmit = e => {
        e.preventDefault();
        let p1 = document.getElementById('thighs').value;
        let p2 = document.getElementById('arm').value;
        let p3 = document.getElementById('body_fat').value;
        let p4 = document.getElementById('butt').value;
        let p5 = document.getElementById('goal1').value;
        let p6 = document.getElementById('height').value;
        let p7 = document.getElementById('waistline').value;
        let p8 = document.getElementById('weight1').value;
        let p10 = document.getElementById('activity').value;
        console.log(p1=='');
        console.log(p2=='');
        console.log(p3=='');

        console.log(p4=='');
        console.log(p5=='');
        console.log(p6=='');
        console.log(p7=='');
        console.log(p8=='');
        console.log(p10=='');
        if ((p1=="" || p2=="" || p3=="" || p4=="" || p5=="" || p6=="" || p7=="" || p8=="" || p10=="") == true)
            toastr.error("Please fill in all the fields!");
        else {
            if ((p1=="" || p2=="" || p3=="" || p4=="" || p5=="" || p6=="" || p7=="" || p8=="" || p10=="") == false) {
                let today = new Date();
                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                db.collection('users').doc(profileId).update({
                    "activity": firebase.firestore.FieldValue.arrayUnion(p10),
                    "arms": firebase.firestore.FieldValue.arrayUnion(p2),
                    "thighs": firebase.firestore.FieldValue.arrayUnion(p1),
                    'body_fat': firebase.firestore.FieldValue.arrayUnion(p3),
                    'butt': firebase.firestore.FieldValue.arrayUnion(p4),
                    "goal": firebase.firestore.FieldValue.arrayUnion(p5),
                    "height": firebase.firestore.FieldValue.arrayUnion(p6),
                    "waistline": firebase.firestore.FieldValue.arrayUnion(p7),
                    "weight": firebase.firestore.FieldValue.arrayUnion(p8),
                    "time_prog": firebase.firestore.FieldValue.arrayUnion(today)
                }).then(function () {
                    toastr.success("Measures added with success!");
                    flag_add = true;
                    window.location.href = './ProgressClient.html?userId=' + profileId;
                });
            }
        }

    }
}
}


function make_chart(type, profileId) {
    let array = [{ x: new Date(2000, 1, 1), y: 0 }];
    var i;
    for (i = 1; i <= 7; i++)
        if (i != type)
            document.getElementById('btn' + i).disabled = false;
        else
            document.getElementById('btn' + i).disabled = true;
    db.collection('users').doc(profileId).get().then(doc => {
        if (doc.exists) {
            const user = doc.data();
            let date;
            let day;
            let monthIndex;
            let year;
            let time;
            let i = 0;
            if (type == 1) {
                const min = fmin(user.weight);
                const max = fmax(user.weight);
                for (i = 0; i < user.weight.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.weight[i] == max)
                        array[i] = { x: time, y: parseInt(user.weight[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.weight[i] == min)
                        array[i] = { x: time, y: parseInt(user.weight[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.weight[i]) };
                }
            }
            else if (type == 2) {
                const min = fmin(user.height);
                const max = fmax(user.height);
                for (i = 0; i < user.height.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.height[i] == max)
                        array[i] = { x: time, y: parseInt(user.height[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.height[i] == min)
                        array[i] = { x: time, y: parseInt(user.height[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.height[i]) };
                }
            }
            else if (type == 3) {
                const min = fmin(user.body_fat);
                const max = fmax(user.body_fat);
                for (i = 0; i < user.body_fat.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.body_fat[i] == max)
                        array[i] = { x: time, y: parseInt(user.body_fat[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.body_fat[i] == min)
                        array[i] = { x: time, y: parseInt(user.body_fat[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.body_fat[i]) };
                }
            }
            else if (type == 4) {
                const min = fmin(user.arms);
                const max = fmax(user.arms);
                for (i = 0; i < user.arms.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.arms[i] == max)
                        array[i] = { x: time, y: parseInt(user.arms[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.arms[i] == min)
                        array[i] = { x: time, y: parseInt(user.arms[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.arms[i]) };
                }
            }
            else if (type == 5) {
                const min = fmin(user.waistline);
                const max = fmax(user.waistline);
                for (i = 0; i < user.waistline.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.waistline[i] == max)
                        array[i] = { x: time, y: parseInt(user.waistline[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.waistline[i] == min)
                        array[i] = { x: time, y: parseInt(user.waistline[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.waistline[i]) };
                }
            }
            else if (type == 6) {
                const min = fmin(user.waistline);
                const max = fmax(user.waistline);
                for (i = 0; i < user.waistline.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.waistline[i] == max)
                        array[i] = { x: time, y: parseInt(user.waistline[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.waistline[i] == min)
                        array[i] = { x: time, y: parseInt(user.waistline[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.waistline[i]) };
                }
            }
            else if (type == 7) {
                const min = fmin(user.thighs);
                const max = fmax(user.thighs);
                for (i = 0; i < user.thighs.length; i++) {
                    date = user.time_prog[i].toDate();
                    day = date.getDate();
                    monthIndex = date.getMonth() + 1;
                    year = date.getFullYear();
                    time = new Date(year + "-" + monthIndex + "-" + day);
                    if (user.thighs[i] == max)
                        array[i] = { x: time, y: parseInt(user.thighs[i]), indexLabel: "highest", markerColor: "red", markerType: "triangle" };
                    else if (user.thighs[i] == min)
                        array[i] = { x: time, y: parseInt(user.thighs[i]), indexLabel: "lowest", markerColor: "DarkSlateGrey", markerType: "cross" };
                    else array[i] = { x: time, y: parseInt(user.thighs[i]) };
                }
            }

        }
    });
    setTimeout(function () {
        let name_chart, unit;
        if (type == 1) {
            name_chart = "Weight";
            unit = "kg";
        }
        else if (type == 2) {
            name_chart = "Height";
            unit = "cm";
        }
        else if (type == 3) {
            name_chart = "BodyFat";
            unit = "%";
        }
        else if (type == 4) {
            name_chart = "Arms";
            unit = "cm";
        }
        else if (type == 5) {
            name_chart = "Waistline";
            unit = "cm";
        }
        else if (type == 6) {
            name_chart = "Butt";
            unit = "cm";
        }
        else if (type == 7) {
            name_chart = "Thighs";
            unit = "cm";
        }

        let chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: " Progress"
            },
            axisX: {
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: name_chart,
                includeZero: false,
                crosshair: {
                    enabled: true
                },
                scaleBreaks: {
                    autoCalculate: true
                }
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true,
                itemclick: toogleDataSeries
            },
            data: [{
                type: "line",
                showInLegend: true,
                name: unit,
                markerType: "square",
                xValueFormatString: "DD MMM, YYYY",
                color: "#F08080",
                dataPoints: array
            }]
        });
        chart.render();
    }, 1000);

}

function toogleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
    } else {
        e.dataSeries.visible = true;
    }
    chart.render();
}
function fmax(arr) {
    let max = 0, i;
    for (i = 0; i < arr.length; i++)
        if (!isNaN(arr[i]) && arr[i] > max) {
            max = arr[i];
        }
    return max;
}
function fmin(arr) {
    let min = 1000, i;
    for (i = 0; i < arr.length; i++)
        if (!isNaN(arr[i]) && arr[i] < min) {
            min = arr[i];
        }
    return min;
}

function logout() {
    const userId = Cookies.get('userId');
    if (userId) {
        Cookies.remove('userId');
        window.location.href = './LoginClient.html';

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