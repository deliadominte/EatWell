let done_contor=0, nr_meals;

const menuId = new URLSearchParams(window.location.search).get('menuId');
window.onload = () => {


  const userId = Cookies.get('userId');
    if (userId) {
        var flag=0;
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                flag=1;
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
                
            }
        });
        if(flag==0){
                document.getElementById("nav").innerHTML = '<a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"\
            href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>\
          <a href="./indexNutri.html" class="w3-bar-item w3-button w3-padding-large w3-theme-d4"\
            style="font-family: '+ "'Exo'" + ', sans-serif;"><i class="fa fa-home w3-margin-right"></i>EatWell</a>\
          <a href="./RecipesList.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
            title="Recipes"><i class="fa fa-bars"></i></a>\
          <a href="./Apointments.html" class="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"\
            title="Apointments"><i class="fa fa-calendar"></i></a>\
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
            <a href="./Apointments.html" class="w3-bar-item w3-button w3-padding-large">Apointments</a>';
        }
        db.collection('menus').doc(menuId).get().then(doc => {
            if (doc.exists) {
                const menu = doc.data();
                let i;
                nr_meals=menu.meals.length;
                console.log(nr_meals);
                for(i=0;i<nr_meals;i++){
                    let desc=menu.description[i];
                    db.collection('recipes').doc(menu.meals[i]).get().then(doc => {
                        if (doc.exists) {
                            const recipe= doc.data();
                document.getElementById("meals").innerHTML+='<div class="w3-container w3-card w3-white w3-round w3-margin"><br>\
          <span class="w3-right w3-opacity">'+desc+'</span>\
          <h4 class="w3-left-align w3-margin-left">'+recipe.name+'</h4>\
          <hr class="w3-clear">\
          <p>Calories: '+recipe.nutrition[0]+'</p>\
          <p>Carbohydrates: '+recipe.nutrition[1]+'</p>\
          <p>Protein: '+recipe.nutrition[2]+'</p>\
          <p>Fat: '+recipe.nutrition[3]+'</p>\
          <hr class="w3-clear">\
          <button onclick="done('+"'"+desc+"'"+')" id="'+desc+'"\
           class="w3-button w3-theme-d1 w3-margin-bottom" ><i class="fa fa-check"></i>\
             Done</button>\
          <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+doc.id+'"><i class="fa fa-bars"></i>\
             See Recipe</a>\
           </div>';
           document.getElementById(desc).disabled = menu.is_done; 
        }});
                }
            }
        });
        
    }
    else {
        window.location.href = './Login.html';
    }
}

function done(i){
  done_contor++; 
  document.getElementById(i).disabled = true; 
  if(done_contor==nr_meals)
        {a={
          is_done: true
        }
        db.collection('appointments').doc(menuId).set({ ...a }, { merge: true }).then(function(){
        alert("Congratulations you finished todays menu!");});
}}
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