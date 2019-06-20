

window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
        window.location.href = './LoginNutri.html';
    } else {
        let ord = 0;
        const MAX_LOAD = 3;
        db.collection('users').where("id_nutri", "==", userId).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                ord = ord + 1;
                let displaystyle;
                const user = doc.data();
                if (ord <= MAX_LOAD) {
                    displaystyle = "block";
                } else {
                    displaystyle = "none";
                }
                var elem = document.createElement("div");
                elem.innerHTML = '<div id = "p-' + ord + '" class="pers w3-container w3-card w3-white w3-round w3-margin"><br>\
        <h4 class="name w3-center">'+ user.username + '</h4>\
        <p class="w3-center"><img src="./media/avatar.png" class="w3-circle" style="height:86px;width:86px" alt="Avatar"></p>\
        <hr class="w3-clear">\
        <a href="./ProfileClient.html?userId='+ doc.id + '"  class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-user"></i>  Profile</a>\
        <a href="./ProgressClient.html?userId='+ doc.id + '" class="w3-button w3-theme-d1 w3-margin-bottom"><i class="fa fa-line-chart"></i>  Progress</a> \
        <a href="./MenuDets.html?userId='+ doc.id + '" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-bars"></i>  Menu details</a>\
        <a href="./RecipesFavorites.html?userId='+ doc.id + '" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-bars"></i>  Favorite Recipes</a>\
        <a href="./MakeApoint.html?userId='+ doc.id + '" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-calendar-plus-o"></i>  Make Appointment</a>\
        <a href="./MessagesNutri.html?userId='+ doc.id + '" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-envelope"></i></i>  Open Chat</a>\
      </div>\
      ';
                document.getElementById("container").appendChild(elem);
            });
        });
        let loaded = MAX_LOAD;
        document.getElementById("more-btn").onclick = e => {
            let i;
            for (i = loaded + 1; i <= loaded + MAX_LOAD; i++) {
                let element = document.getElementById("p-" + i);
                if (element) {
                    element.style.display = "block";
                }
            }
            loaded = loaded + MAX_LOAD;
        }
        document.getElementById("searchbar").onkeyup = e => {
            document.getElementById("more-btn").style.display = "none";
            let pers = document.getElementsByClassName("pers w3-container w3-card w3-white w3-round w3-margin");
            let i;
            filter = document.getElementById("searchbar").value.toUpperCase();

            if (filter) {
                for (i = 0; i < pers.length; i++) {
                    name = pers[i].getElementsByClassName("name w3-center")[0].innerHTML;

                    if (name.toUpperCase().indexOf(filter) > -1) {
                        pers[i].style.display = "block";
                    } else {
                        pers[i].style.display = "none";
                    }
                }
            }
            else {
                location.reload();
            }
        }
    }
}

function formatDate(date) {
    date = date.toDate();
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
function logout() {
    const userId = Cookies.get('userId');
    if (userId) {
        Cookies.remove('userId');
        window.location.href = './LoginClient.html';

    }
}