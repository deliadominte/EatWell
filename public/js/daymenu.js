let done_contor = 0, nr_meals;
toastr.options = { "positionClass": "toast-bottom-left" }
const menuId = new URLSearchParams(window.location.search).get('menuId');
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
        document.getElementById("navDemo").innerHTML += '\
                <a href="./SettingsClient.html" class="w3-bar-item w3-button w3-padding-large">Account</a>\
                <a href="./MenuDetsClient.html" class="w3-bar-item w3-button w3-padding-large">Menu Calendar</a>\
                <a href="./ProgressClient.html" class="w3-bar-item w3-button w3-padding-large">Progress</a>';

        db.collection('menus').doc(menuId).get().then(doc => {
          if (doc.exists) {
            const menu = doc.data();
            let i;
            nr_meals = menu.meals.length;
            for (i = 0; i < nr_meals; i++) {
              let desc = menu.description[i];
              let id_meal = menu.meals[i];
              var done = menu.is_done[i];
              db.collection('recipes').doc(menu.meals[i]).get().then(doc => {
                if (doc.exists) {
                  const recipe = doc.data();
                  document.getElementById("meals").innerHTML += '<div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
                <span class="w3-right w3-opacity">'+ desc + '</span>\
                <h4 class="w3-left-align w3-margin-left">'+ recipe.name + '</h4>\
                <hr class="w3-clear">\
                <p>Calories: '+ recipe.nutrition[0] + '</p>\
                <p>Carbohydrates: '+ recipe.nutrition[1] + '</p>\
                <p>Protein: '+ recipe.nutrition[2] + '</p>\
                <p>Fat: '+ recipe.nutrition[3] + '</p>\
                <hr class="w3-clear">\
                <button onclick="done('+ "'" + id_meal + "','" + i + "'" + ')" id="done' + id_meal + '"\
                 class="w3-button w3-theme-d1 w3-margin-bottom" ><i class="fa fa-check"></i>\
                   Done</button>\
                  <button onclick="add_fav('+ "'" + id_meal + "'" + ')" id="' + id_meal + '"\
                  class="w3-button w3-theme-d1 w3-margin-bottom" ><i class="fa fa-plus"></i>\
                    Add to favorites</button>\
                <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+ doc.id + '"><i class="fa fa-bars"></i>\
                   See Recipe</a>\
                 </div>';
                  document.getElementById('done' + id_meal).disabled = done;
                }
              });
            }
          }
        });

      }
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
        document.getElementById("navDemo").innerHTML += '<a href="./RecipesList.html" class="w3-bar-item w3-button w3-padding-large">Recipes</a>\
          <a href="./Apointments.html" class="w3-bar-item w3-button w3-padding-large">Appointments</a>';

        db.collection('menus').doc(menuId).get().then(doc => {
          if (doc.exists) {
            const menu = doc.data();
            let i;
            nr_meals = menu.meals.length;
            for (i = 0; i < nr_meals; i++) {
              let desc = menu.description[i];
              let id_meal = menu.meals[i];
              var done = menu.is_done[i];
              db.collection('recipes').doc(menu.meals[i]).get().then(doc => {
                if (doc.exists) {
                  const recipe = doc.data();
                  document.getElementById("meals").innerHTML += '<div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
          <span class="w3-right w3-opacity">'+ desc + '</span>\
          <h4 class="w3-left-align w3-margin-left">'+ recipe.name + '</h4>\
          <hr class="w3-clear">\
          <p>Calories: '+ recipe.nutrition[0] + '</p>\
          <p>Carbohydrates: '+ recipe.nutrition[1] + '</p>\
          <p>Protein: '+ recipe.nutrition[2] + '</p>\
          <p>Fat: '+ recipe.nutrition[3] + '</p>\
          <hr class="w3-clear">\
          <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+ doc.id + '"><i class="fa fa-bars"></i>\
             See Recipe</a>\
           </div>';
                }
              });
            }
          }
        });
      }
    });


  }
  else {
    window.location.href = './Login.html';
  }
}

function done(id, index) {
  done_contor++;
  document.getElementById('done' + id).disabled = true;
  db.collection('menus').doc(menuId).get().then(doc => {
    if (doc.exists) {
      const menu = doc.data();
      var is_done = menu.is_done;
      is_done[index] = true;
      const a = {
        is_done: is_done
      };
      db.collection('menus').doc(menuId).set({ ...a }, { merge: true });
    }
  })
  if (done_contor == nr_meals)
    toastr.success("Congratulations you finished today's menu!");
}
function add_fav(id) {
  const userId = Cookies.get('userId');

  db.collection('user_recipe').where('id_user', '==', userId).get().then(querySnapshot => {

    querySnapshot.forEach(function (doc) {
      const favorites = doc.data();
      const id_u_r = doc.id;
      let i, flag = false;
      for (i = 0; i < favorites.id_recipes.length; i++) {
        if (favorites.id_recipes[i] == id)
          flag = true;
      }
      if (flag == true) toastr.warning("The recipe is already added to your favorites!");
      else {
        db.collection('user_recipe').doc(id_u_r).update({
          "id_recipes": firebase.firestore.FieldValue.arrayUnion(id)
        }).then(toastr.success("Added!"));
      }
    })
  });

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