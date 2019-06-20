let nr = 0;
let toDay = new Date();

const uI = Cookies.get('userId');
let i;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




db.collection('users').doc(uI).get().then(doc => {
    let flag_is_user = 0;
    if (doc.exists) {
        const user = doc.data();

        flag_is_user = 1;
        if (toDay.getDay() == 0 || toDay.getDay() == 5)//duminica sau miercuri trimit motivatie sub forma de citat
        {
            db.collection('notifications').where("href", "==", "quoteofday").where('id_user', '==', uI).get().then(querySnapshot => {
                var flag = 0;
                var id;
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        notif = doc.data();
                        date = notif.date.toDate();
                        if (((date.getDate() == toDay.getDate()) || (date.getDate() == toDay.getDate() - 1)) && date.getMonth() == toDay.getMonth() && date.getFullYear() == toDay.getFullYear())
                            flag = 1;//cazul in care nu a mai fost trimis un citat motivational
                        else if (date < toDay) {
                            flag = 2;//cazul in care a mai fost trimis citat
                            id = doc.id;
                        }
                    }
                });
                if (flag == 0) {
                    $(document).ready(function () {
                        $.getJSON("./js/quotes.json", function (result) {
                            i = getRndInteger(0, result.length - 1);
                            const quote = (result[i].quote + " - " + result[i].author);
                            let not = {
                                id_user: uI,
                                text: quote,
                                date: new Date(),
                                to_check_date: true,
                                href: "quoteofday"
                            }
                            db.collection('notifications').add(not).then(function (d) {
                                nr++;
                                document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + d.id + "','" + not.href + "'" + ')" class="w3-bar-item w3-button">\
                        '+ not.text + '</a>';
                                document.getElementById("nrNotif").innerHTML = nr.toString();
                            });
                        }
                        );
                    });
                }
                else if (flag == 2) {
                    $(document).ready(function () {
                        $.getJSON("./js/quotes.json", function (result) {
                            i = getRndInteger(0, result.length - 1);
                            const quote = (result[i].quote + " - " + result[i].author);
                            let not = {
                                text: quote,
                                date: new Date(),
                            }
                            db.collection('notifications').doc(id).set({ ...not }, { merge: true }).then(function (d) {
                                nr++;
                                document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + id + "','" + notif.href + "'" + ')" class="w3-bar-item w3-button">\
                        '+ notif.text + '</a>';
                                document.getElementById("nrNotif").innerHTML = nr.toString();
                            });
                        }
                        );
                    });

                }
            });

        }
        else if (toDay.getDay() == 2 || toDay.getDay() == 5)// marti si vineri trimit motivatie pt progress
        {
            db.collection('notifications').where("href", "==", "motivationofday").where('id_user', '==', uI).get().then(querySnapshot => {
                var flag = 0;
                var id;
                querySnapshot.forEach(function (doc) {
                    if (doc.exists) {
                        notif = doc.data();
                        date = notif.date.toDate();
                        if (((date.getDate() == toDay.getDate()) || (date.getDate() == toDay.getDate() - 1)) && date.getMonth() == toDay.getMonth() && date.getFullYear() == toDay.getFullYear())
                            flag = 1;//cazul in care a mai fost trimis un citat motivational
                        else if (date < toDay) {
                            flag = 2;//cazul in care a mai fost trimis citat
                            id = doc.id;
                        }
                    }
                });
                if (flag == 0) {
                    db.collection('users').doc(uI).get().then(doc => {
                        if (doc.exists) {
                            const user = doc.data();
                            
                            let quote = "You have " + Math.abs(difference) + "kg left to ";
                            if (difference > 0) {
                                quote += "gain";
                            }
                            else if (difference < 0) {
                                quote += "lose";
                            }
                            else quote = "You are doing great, you're on track!";
                            let not = {
                                id_user: uI,
                                text: quote,
                                date: new Date(),
                                to_check_date: true,
                                href: "motivationofday"
                            }
                            db.collection('notifications').add(not).then(function (d) {
                                nr++;
                                document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + d.id + "','" + not.href + "'" + ')" class="w3-bar-item w3-button">\
            '+ not.text + '</a>';
                                document.getElementById("nrNotif").innerHTML = nr.toString();
                            });
                        }
                    });
                }
                else if (flag == 2) {
                    db.collection('users').doc(uI).get().then(doc => {
                        if (doc.exists) {
                            const user = doc.data();
                            let difference = user.goal[user.goal.length - 1] - user.weight[user.weight.length - 1];
                            let quote = "You are doing great, you just have " + Math.abs(difference) + "kg left to ";
                            if (difference > 0)
                                quote += "gain";
                            else if (difference < 0)
                                quote += "lose";
                            else quote = "You are doing great, you're on track!";
                            let not = {
                                text: quote,
                                date: new Date(),
                            }
                            db.collection('notifications').doc(id).set({ ...not }, { merge: true }).then(function (d) {
                                nr++;
                                document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + id + "','" + "motivationofday" + "'" + ')" class="w3-bar-item w3-button">\
            '+ not.text + '</a>';
                                document.getElementById("nrNotif").innerHTML = nr.toString();
                            });
                        }
                    });

                }
            });

        }
    }
    if (flag_is_user == 0) {//e nutritionist
        db.collection('nutritionists').doc(uI).get().then(doc => {
            let flag_is_user = 0;
            if (doc.exists) {
                const nutri = doc.data();
                var list_u = nutri.id_users;
                var i;
                for (i = 0; i < list_u.length; i++) {
                    let id = list_u[i];
                    db.collection('menus').where('id_nutri', '==', uI).where('id_user', '==', list_u[i]).get().then(querySnapshot => {
                        let flag_has_menu = false;//for tomorrow
                        var dt = new Date();
                        dt.setDate(dt.getDate() + 1);

                        querySnapshot.forEach(function (doc) {
                            const menu = doc.data();
                            const date = menu.date.toDate();
                            if (((date.getDate() == dt.getDate())) && date.getMonth() == dt.getMonth() && date.getFullYear() == dt.getFullYear()) {
                                flag_has_menu = true;
                            }
                        });
                        if (flag_has_menu == false) {

                            const href = "./SetMenu.html?userId=" + doc.id + "&date=" + dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getUTCDate();

                            db.collection('notifications').where('id_user', '==', id).where('href', '==', href).get().then(querySnapshot => {
                                let allready = false;
                                let notif_id, notif_text;
                                querySnapshot.forEach(function (doc) {
                                    allready = true;
                                    notif = doc.data();
                                    notif_id = doc.id;
                                    notif_text = notif.text;
                                })
                                if (allready == false) {
                                    db.collection('users').doc(id).get().then(doc => {
                                        if (doc.exists) {
                                            const user = doc.data();
                                            let not = {
                                                id_user: id,
                                                text: "You didn't set the menu for tomorrow for: " + user.username,
                                                date: new Date(),
                                                to_check_date: true,
                                                href: href
                                            }
                                            if (user.username != "-") {
                                                db.collection('notifications').add(not).then(function (d) {
                                                    nr++;
                                                    document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + d.id + "','" + not.href + "'" + ')" class="w3-bar-item w3-button">\
                                            '+ not.text + '</a>';
                                                    document.getElementById("nrNotif").innerHTML = nr.toString();
                                                });
                                            }
                                        }
                                    });
                                }
                                else {
                                    let not = {
                                        date: new Date(),
                                        href: href
                                    }
                                    db.collection('notifications').doc(notif_id).set({ ...not }, { merge: true }).then(function () {
                                        nr++;
                                        document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + notif_id + "','" + not.href + "'" + ')" class="w3-bar-item w3-button">\
                    '+ notif_text + '</a>';
                                        document.getElementById("nrNotif").innerHTML = nr.toString();
                                    });

                                }
                            })
                        }
                    })
                }
            }
        });

    }
});


db.collection('notifications').where('id_user', '==', uI).get().then(querySnapshot => {
    querySnapshot.forEach(function (doc) {
        const notif = doc.data();
        if (notif.to_check_date == false) {
            nr++;
            document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + doc.id + "','" + notif.href + "'" + ')" class="w3-bar-item w3-button">\
            '+ notif.text + '</a>';
            document.getElementById("nrNotif").innerHTML = nr.toString();
        }
        else {
            if (notif.date.toDate().getDate() == toDay.getDate() && notif.date.toDate().getMonth() == toDay.getMonth() && notif.date.toDate().getFullYear() == toDay.getFullYear() && notif.date.toDate().getTime() > toDay.getTime()) {
                //aceasi data(zi,luna,an) dar inainte ca ora:min
                nr++;
                document.getElementById("notif").innerHTML += '<button onclick="notifclick(' + "'" + doc.id + "','" + notif.href + "'" + ')" class="w3-bar-item w3-button">\
            '+ notif.text + '</a>';
                document.getElementById("nrNotif").innerHTML = nr.toString();
            }
        }

    });
});



function notifclick(id, path) {
    if (path != "quoteofday" && path != "motivationofday" && path.indexOf("Menu") == -1) {
        db.collection("notifications").doc(id).delete().then(function () {
            window.location.href = path;
        });
    }
    else if (path == "quoteofday") {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        let not = {
            date: dt
        }
        db.collection('notifications').doc(id).set({ ...not }, { merge: true }).then(function () {
            window.location.href = "./index.html";
        });
    } else if (path == "motivationofday") {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        let not = {
            date: dt
        }
        db.collection('notifications').doc(id).set({ ...not }, { merge: true }).then(function () {
            window.location.href = "./ProgressClient.html";
        });
    }
    else if (path.indexOf("Menu") !== -1) {
        var dt = new Date();
        dt.setDate(dt.getDate() - 1);
        let not = {
            date: dt
        }
        db.collection('notifications').doc(id).set({ ...not }, { merge: true }).then(function () {
            window.location.href = path;
        });
    }
}