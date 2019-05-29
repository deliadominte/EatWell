window.onload = function () {
    const userId = Cookies.get('userId');

    if (!userId) {
        window.location.href = './Login.html';

    } else {
        let data = [
            { x: new Date(2017, 0, 3), y: 68 },
            { x: new Date(2017, 1, 4), y: 70 },
            { x: new Date(2017, 2, 5), y: 71 },
            { x: new Date(2017, 3, 6), y: 68 },
            { x: new Date(2017, 4, 7), y: 67 },
            { x: new Date(2017, 5, 8), y: 66 },
            { x: new Date(2017, 6, 9), y: 64 },
            { x: new Date(2017, 7, 10), y: 67 },
            { x: new Date(2017, 8, 11), y: 65 }
        ];

        const profileId = new URLSearchParams(window.location.search).get('userId');
        let array=[{ x: new Date(2000, 1, 1), y: 0 }];

        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                const min = fmin(user.weight);
                const max = fmax(user.weight);
                let date;
                let day;
                let monthIndex;
                let year;
                let time;
                let i = 0;
                for (i = 0; i < user.weight.length; i++) {
                     date = user.time_prog[i].toDate();
                     day = date.getDate();
                     monthIndex = date.getMonth();
                     year = date.getFullYear();
                     time = new Date(year + "-" + monthIndex + "-" + day);
                    console.log("a asignat");
                    array[i]={ x: time, y: parseInt(user.weight[i]) };
                }
            }
        });
        
        console.log(typeof array[0].x);
        console.log(typeof data[0].x);
        console.log(array);
        console.log(data);
        setTimeout(function(){let chart = new CanvasJS.Chart("chartContainer", {
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
                title: "Weight",
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
                name: "Kg",
                markerType: "square",
                xValueFormatString: "DD MMM, YYYY",
                color: "#F08080",
                dataPoints: array
            }]
        });
        console.log("a facut");
        chart.render();},1000);
        

        function toogleDataSeries(e) {
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }

        let flag = 0;
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                flag = 1;
                document.getElementById("nav").innerHTML += '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"\
                  href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>\
                <a href="./index.html" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"\
                  style="font-family: '+ "'Exo'" + ', sans-serif;"><i class="fa fa-home w3-margin-right"></i>EatWell</a>\
                <a href="./SettingsClient.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
                  title="Account"><i class="fa fa-user"></i></a>\
                <a href="./ProgressClient.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
                  title="Progress"><i class="fa fa-line-chart"></i></a>\
                <div class="w3-dropdown-hover w3-hide-small">\
                  <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span\
                      class="w3-badge w3-right w3-small w3-green">2</span></button>\
                  <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
                    <a href="./index.html" class="w3-bar-item w3-button">One new Appointment</a>\
                    <a href="./MessagesClient.html" class="w3-bar-item w3-button">New Message</a>\
                  </div>\
                </div>';
                document.getElementById("navDemo").innerHTML += '\
                  <a href="./SettingsClient.html" class="w3-bar-item w3-button w3-padding-large">Account</a>\
                  <a href="./ProgressClient.html" class="w3-bar-item w3-button w3-padding-large">Progress</a>';

            }
        });
        if (flag == 0) {
            document.getElementById("nav").innerHTML += '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"\
              href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>\
            <a href="./indexNutri.html" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"\
              style="font-family: '+ "'Exo'" + ', sans-serif;"><i class="fa fa-home w3-margin-right"></i>EatWell</a>\
            <a href="./RecipesList.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
              title="Recipes"><i class="fa fa-bars"></i></a>\
            <a href="./Apointments.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
              title="Apointments"><i class="fa fa-calendar"></i></a>\
            <div class="w3-dropdown-hover w3-hide-small">\
              <button class="w3-button w3-padding-large" title="Notifications"><i class="fa fa-bell"></i><span\
                  class="w3-badge w3-right w3-small w3-green">2</span></button>\
              <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
                <a href="./Apointments.html" class="w3-bar-item w3-button">One new Appointment</a>\
                <a href="./MessagesList.html" class="w3-bar-item w3-button">New Message</a>\
              </div>\
            </div>';
            document.getElementById("navDemo").innerHTML += '<a href="./RecipesList.html" class="w3-bar-item w3-button w3-padding-large">Recipes</a>\
              <a href="./Apointments.html" class="w3-bar-item w3-button w3-padding-large">Apointments</a>';
        }
        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                console.log(user);
                document.getElementById("measures").innerHTML += '\
          <p>Weight: '+ user.weight[user.weight.length - 1] + ' kg</p>\
          <p>Height: '+ user.height[user.height.length - 1] + ' cm</p>\
          <p>Body Fat: '+ user.body_fat[user.body_fat.length - 1] + ' %</p>\
          <p>Arm: '+ user.arm[user.arm.length - 1] + ' cm</p>\
          <p>Waistline: '+ user.waistline[user.waistline.length - 1] + ' cm</p>\
          <p>Butt: '+ user.butt[user.butt.length - 1] + ' cm</p>\
          <p>Thighs: '+ user.thighs[user.thighs.length - 1] + ' cm</p>\
          <p>Level of activity: '+ user.lvl_activity[user.lvl_activity.length - 1] + '</p>';
                document.getElementById("goal").innerHTML += user.goal[user.goal.length - 1];
                document.getElementById("weight").innerHTML += user.weight[user.weight.length - 1];
                document.getElementById("prog").innerHTML += Math.floor(100 - ((user.weight[user.weight.length - 1] - user.goal[user.goal.length - 1]) * 100) / (fmax(user.weight) - user.goal[user.goal.length - 1])) + "%";
                document.getElementById("prog").setAttribute("aria-valuenow", (-1) * user.weight[user.weight.length - 1]);
                console.log(fmax(user.weight));
                document.getElementById("prog").setAttribute("aria-valuemin", (-1) * fmax(user.weight));
                document.getElementById("prog").setAttribute("aria-valuemax", (-1) * user.goal[user.goal.length - 1]);
                document.getElementById("prog").setAttribute("style", "width:14%");
            }
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
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            db.collection('users').doc(profileId).update({
                "activity": firebase.firestore.FieldValue.arrayUnion(p10),
                "thighs": firebase.firestore.FieldValue.arrayUnion(p2),
                'body_fat': firebase.firestore.FieldValue.arrayUnion(p3),
                'butt': firebase.firestore.FieldValue.arrayUnion(p4),
                "goal": firebase.firestore.FieldValue.arrayUnion(p5),
                "height": firebase.firestore.FieldValue.arrayUnion(p6),
                "waistline": firebase.firestore.FieldValue.arrayUnion(p7),
                "weight": firebase.firestore.FieldValue.arrayUnion(p8),
                "time_prog": firebase.firestore.FieldValue.arrayUnion(date)
            });
            window.location.href = './ProgressClient.html?userId=' + profileId;
        }
    }
}

function fmax(arr) {
    let max = 0, i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] > max) {
            max = arr[i];
        }
    return max;
}
function fmin(arr) {
    let min = 0, i;
    for (i = 0; i < arr.length; i++)
        if (arr[i] < min) {
            min = arr[i];
        }
    return min;
}

