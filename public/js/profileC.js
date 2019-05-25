// https://healthyeater.com/how-to-calculate-your-macros
// https://shapescale.com/blog/health/nutrition/calculate-macronutrient-ratio/
//https://www.musclehacking.com/calorie-calculator/

window.onload = () => {
  const userId = Cookies.get('userId');

  if (!userId) {
    console.log("de");
    window.location.href = './LoginNutri.html';

  } else {
    const profileId = new URLSearchParams(window.location.search).get('userId');
    db.collection('users').doc(profileId).get().then(doc => {
      if (doc.exists) {
        const user = doc.data();
        console.log(user);
        document.getElementById("username").innerHTML += user.username;
        document.getElementById("place").innerHTML += user.place;
        document.getElementById("date").innerHTML += formatDate(user.bday.toDate());
        if (user.gender == 'Female')
          document.getElementById("gender").innerHTML += '<i class="fa fa-venus fa-fw w3-margin-right w3-text-theme "></i>' + user.gender;
        else
          document.getElementById("gender").innerHTML += '<i class="fa fa-mars fa-fw w3-margin-right w3-text-theme "></i>' + user.gender;
        var i;
        for (i = 0; i < user.allergies.length; i++) {
          var x = getRndInteger(2, 5);
          document.getElementById("tags").innerHTML += '<span class="w3-tag w3-small w3-margin-left w3-theme-d' + x.toString() + '">' + user.allergies[i] + '</span>';
        }
        document.getElementById("tags").innerHTML += "<br><br>"
        document.getElementById("Demo2").innerHTML += '\
                <p>Weight: '+ user.weight[user.weight.length - 1] + ' kg</p>\
                <p>Height: '+ user.height[user.height.length - 1] + ' cm</p>\
                <p>Body Fat: '+ user.body_fat[user.body_fat.length - 1] + ' %</p>\
                <p>Arm: '+ user.arm[user.arm.length - 1] + ' cm</p>\
                <p>Waistline: '+ user.waistline[user.waistline.length - 1] + ' cm</p>\
                <p>Butt: '+ user.butt[user.butt.length - 1] + ' cm</p>\
                <p>Thighs: '+ user.thighs[user.thighs.length - 1] + ' cm</p>\
                <p>Level of activity: '+ user.lvl_activity[user.lvl_activity.length - 1] + '</p>';
        document.getElementById("Demo3").innerHTML += '\
                <p>Calories: '+ user.nutrition[0] + ' kcal</p>\
                <p>Carbohydrates: '+ user.nutrition[1] + ' grams</p>\
                <p>Protein: '+ user.nutrition[2] + ' grams</p>\
                <p>Fat: '+ user.nutrition[3] + ' grams</p>';
      }
    }
    );
  }
}

function formatDate(date) {
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateMacros() {

  const userId = Cookies.get('userId');

  db.collection('users').doc(userId).get().then(doc => {
    if (doc.exists) {
      const user = doc.data();
      //console.log(user);
      var tday = new Date();
      const years = tday.getFullYear() - user.bday.toDate().getFullYear();
      const h = user.height[user.height.length - 1];
      const g = user.weight[user.weight.length - 1];
      const bf = user.body_fat[user.body_fat.length - 1];
      var sum;
      //console.log([years,h,g,bf]);
      if (user.gender == "Female") {
        sum = 26;
        if (h < 153)//inaltime
          sum += -1;
        else if (h < 170)
          sum += 0;
        else sum += 1;
        if (bf <= 18)//body_fat
          sum += 0.5;
        else if (bf <= 27)
          sum += 0;
        else if (bf <= 32)
          sum += -0.5;
        else if (bf <= 37)
          sum += -1.5;
        else if (bf <= 42)
          sum += -2.5;
      }
      else {
        sum = 28;
        if (h < 167)
          sum += -1;
        else if (h < 185)
          sum += 0;
        else sum += 1;
        if (bf <= 10)
          sum += 0.5;
        else if (bf <= 19)
          sum += 0;
        else if (bf <= 24)
          sum += -0.5;
        else if (bf <= 29)
          sum += -1.5;
        else if (bf <= 34)
          sum += -2.5;
      }
      if (years<25)
         sum+=0.5;
         else if(years<45)
              sum+=0;
              else sum+=-0.5;
      var REE = g * sum;
      //console.log(REE);
      var TDEE;
      //console.log(user.lvl_activity[user.lvl_activity.length-1]);
      switch (user.lvl_activity[user.lvl_activity.length-1]) {
        case "Sedentary":
          TDEE = REE * 1.2;
          break;
        case "Light activity":
          TDEE = REE * 1.375;
          break;
        case "Active":
          TDEE = REE * 1.55;
          break;
        case "Very activity":
          TDEE = REE * 1.725;
          break;
        default:
          TDEE = REE;
      }
     // console.log(TDEE);
      const diff = user.goal[user.goal.length - 1] - user.weight[user.weight.length - 1];
     // console.log(diff);
      var kcal, carb, prot, fat;
      if (diff == 0)// mentinere
      //45 carb, 35 prot, 20 fat
      {
        kcal = TDEE;
        carb = kcal * 0.45 / 4;
        prot = kcal * 0.45 / 4;
        fat = kcal * 0.45 / 9;
      }
      else if (diff < 0) //slabire
      //45 carb, 40 prot, 15 fat
      {
        kcal = TDEE - TDEE * 0.20;
        carb = kcal * 0.45 / 4;
        prot = kcal * 0.40 / 4;
        fat = kcal * 0.15 / 9;
      }
      else if (diff > 0) //ingrasare
      //50 carb, 30 prot, 20 fat
      {
        kcal = TDEE + TDEE * 0.20;
        carb = kcal * 0.50 / 4;
        prot = kcal * 0.30 / 4;
        fat = kcal * 0.20 / 9;
      }

      salveazaNutri([Math.floor(kcal), Math.floor(carb), Math.floor(prot), Math.floor(fat)]);
    }
  });
}

// Accordion
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else {
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className =
      x.previousElementSibling.className.replace(" w3-theme-d1", "");
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

function salveazaNutri(nutri) {
  const profileId = new URLSearchParams(window.location.search).get('userId');
  db.collection('users').doc(profileId).get().then(doc => {
    if (doc.exists) {
      const user = doc.data();
      user.nutrition[0] = nutri[0];
      user.nutrition[1] = nutri[1];
      user.nutrition[2] = nutri[2];
      user.nutrition[3] = nutri[3];
      var y = document.getElementById("Demo3");
      y.innerHTML = '\
              <br>\
              <p id="editbutton"><button type="button" onclick="editp()" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-edit"></i> Edit Percentage</button></p>\
              <div id="edit" class=" w3-container w3-white w3-round w3-margin-bottom w3-hide" style="padding-left: 0;">\
                  <input id="cal" type="number" name="calories" min="0" max="100000" placeholder="Calories">\
                  <input id="carbo" type="number" name="carbohydrates" min="0" max="100" placeholder="Carbohydrates Percentage">\
                  <input id="protein" type="number" name="protein" min="0" max="100" placeholder="Protein Percentage">\
                  <input id="fat" type="number" name="fat" min="0" max="100" placeholder="Fat Percentage">\
              </div>\
              <button type="button" id="generatebutton" onclick="calculateMacros()" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-edit"></i> Generate Percentage</button>'
        + '<p>Calories: ' + user.nutrition[0] + ' kcal</p>\
              <p>Carbohydrates: '+ user.nutrition[1] + ' grams</p>\
              <p>Protein: '+ user.nutrition[2] + ' grams</p>\
              <p>Fat: '+ user.nutrition[3] + ' grams</p>\
              ';
    }
  });

}
function editp() {
  var x = document.getElementById("edit"), y = document.getElementById("editbutton");
  if (x.className.indexOf("w3-show") == -1) {
    x.className = x.className.replace("w3-hide", "w3-show");
    y.innerHTML = '<button type="button" onclick="savep()" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-edit"></i> Save Percentage</button>';
  }
}
function savep() {
  var x = document.getElementById("edit"), y = document.getElementById("editbutton");
  const cal = document.getElementById("cal").value;
  const carb = document.getElementById("carbo").value;
  const fat = document.getElementById("fat").value;
  const protein = document.getElementById("protein").value;
  salveazaNutri([cal, carb, protein, fat]);
  x.className = x.className.replace("w3-show", "w3-hide");
  y.innerHTML = '<button type="button" onclick="editp()" class="w3-button w3-theme-d2 w3-margin-bottom"><i class="fa fa-edit"></i> Edit Percentage</button>';
}