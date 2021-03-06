window.onload = () => {
    const userId = Cookies.get('userId');

    if (userId) {
        var flag = 0;
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
                document.getElementById("navDemo").innerHTML = '<br><br>\
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
        const userI = new URLSearchParams(window.location.search).get('userId');
        let ord = 0;
        const MAX_LOAD = 3;
        db.collection('user_recipe').where('id_user', '==', userI).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                const user_rec = doc.data();
                let i;
                for (i = 0; i < user_rec.id_recipes.length; i++) {
                    let id_u_r = user_rec.id_recipes[i];
                    db.collection('recipes').where(firebase.firestore.FieldPath.documentId(), '==', id_u_r).get().then(querySnapshot => {
                        querySnapshot.forEach(function (doc) {
                            ord = ord + 1;
                            let displaystyle;
                            const recipe = doc.data();
                            if (ord <= MAX_LOAD) {
                                {
                                    displaystyle = "block";
                                }
                            } else {
                                displaystyle = "none";
                            }
                            var elem = document.createElement("div");
                            elem.innerHTML = '<div id = "p-' + ord + '" class="pers w3-container w3-card w3-white w3-round w3-margin" style="display:' + displaystyle + '"><br>\
        <h4 class="name w3-center">'+ recipe.name + '</h4>\
        <hr class="w3-clear">\
        <p>Calories:'+ recipe.nutrition[0] + '</p>\
        <p>Carbohydrates:'+ recipe.nutrition[1] + '</p>\
        <p>Protein:'+ recipe.nutrition[1] + '</p>\
        <p>Fat:'+ recipe.nutrition[1] + '</p>\
        <hr class="w3-clear">\
        <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+ doc.id+ '" ><i class="fa fa-bars"></i>  See Recipe</a>\
       </div>';
                            document.getElementById("container").appendChild(elem);
                        });
                    });
                }
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
    else {
        window.location.href = './Login.html';
    }
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