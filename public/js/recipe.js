// https://healthyeater.com/how-to-calculate-your-macros
// https://shapescale.com/blog/health/nutrition/calculate-macronutrient-ratio/
// https://www.musclehacking.com/calorie-calculator/

window.onload = () => {
  const userId = Cookies.get('userId');

  if (!userId) {
    window.location.href = './Login.html';

  } else {
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
                        class="w3-badge w3-right w3-small w3-green">2</span></button>\
                    <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
                      <a href="./index.html" class="w3-bar-item w3-button">One new Appointment</a>\
                      <a href="./MessagesClient.html" class="w3-bar-item w3-button">New Message</a>\
                    </div>\
                  </div>\
                  <button onclick="logout()" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-theme-d4" title="Logout">\
                  <img src="./media/avatar2.png" class="w3-circle w3-theme-d0" style="height:23px;width:23px" alt="Avatar">\
                </button>';
                        document.getElementById("navDemo").innerHTML = '\
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
                class="w3-badge w3-right w3-small w3-green">2</span></button>\
            <div class="w3-dropdown-content w3-card-4 w3-bar-block" style="width:300px">\
              <a href="./Apointments.html" class="w3-bar-item w3-button">One new Appointment</a>\
              <a href="./MessagesList.html" class="w3-bar-item w3-button">New Message</a>\
            </div>\
          </div>\
          <button onclick="logout()" class="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-theme-d4" title="Logout">\
        <img src="./media/avatar2.png" class="w3-circle w3-theme-d0" style="height:23px;width:23px" alt="Avatar">\
      </button>';
                document.getElementById("navDemo").innerHTML = '<a href="./RecipesList.html" class="w3-bar-item w3-button w3-padding-large">Recipes</a>\
            <a href="./Apointments.html" class="w3-bar-item w3-button w3-padding-large">Apointments</a>';
        }
    const recipeId = new URLSearchParams(window.location.search).get('recipeId');
    db.collection('recipes').doc(recipeId).get().then(doc => {
      if (doc.exists) {
        const recipe = doc.data();
        console.log(recipe);
        document.getElementById("name").innerHTML+=recipe.name;
        document.getElementById("cal").innerHTML+=recipe.nutrition[0]+" kcal";
        document.getElementById("carbo").innerHTML+=recipe.nutrition[1]+" grams";
        document.getElementById("protein").innerHTML+=recipe.nutrition[2]+" grams";
        document.getElementById("fat").innerHTML+=recipe.nutrition[3]+" grams";
        document.getElementById("prep").innerHTML+=recipe.info[0]+" h "+recipe.info[1]+" min ";
        document.getElementById("cook").innerHTML+=recipe.info[2]+" h "+recipe.info[3]+" min ";
        document.getElementById("ready").innerHTML+=recipe.info[4]+" h "+recipe.info[5]+" min ";
        var i;
        for(i=0;i < recipe.ing.length ;i++){
          document.getElementById("ingred").innerHTML+='<li>'+recipe.ing_mesure[i].toString()+' '+recipe.ing_type[i].toString()+' '+recipe.ing[i].toString()+'</li>';
        }
        for(i=0;i< recipe.directions.length;i++){
          document.getElementById("dir").innerHTML+='<li>'+recipe.directions[i]+'</li>';
        }
    }
  });
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