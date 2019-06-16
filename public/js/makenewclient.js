

toastr.options = {
    "positionClass": "toast-bottom-left",
    "tapToDismiss": false
};
window.onload = () => {
    const userId = Cookies.get('userId');
    console.log("The new clients code: " + 'USER' + '<br /><br /><button type="button" onclick="window.location.href = '+"'"+'./ProfileClient.html?userId=' + "'+"+ 'id_user'+';" class="btn clear">Ok</button>');
    if (userId) {
        document.getElementById('getInfoForum').onsubmit = e => {
            e.preventDefault();
            var p1 = document.getElementById('thighs').value;
            var p2 = document.getElementById('arm').value;
            var p3 = document.getElementById('body_fat').value;
            var p4 = document.getElementById('butt').value;
            var p5 = document.getElementById('goal').value;
            var p6 = document.getElementById('height').value;
            var p7 = document.getElementById('waistline').value;
            var p8 = document.getElementById('weight').value;
            var p9 = document.getElementById('gender').value;
            var p10 = document.getElementById('activity').value;
            var p11 = document.getElementById('medical').value;
            var p12 = new Date(document.getElementById('bday').value);
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var new_code = generateCode();
            const user = {
                username: "-",
                password: "-",
                gender: [p9],
                code: new_code,
                place: "-",
                phone: "-",
                medical: p11,
                bday: p12,
                id_nutri: userId,
                activity: [p10],
                arm: [p2],
                body_fat: [p3],
                butt: [p4],
                goal: [p5],
                height: [p6],
                thighs: [p1],
                time_prog: [date],
                waistline: [p7],
                weight: [p8],
                nutrition: [],
                allergies: []
            };
            console.log(user);
            db.collection('users').add(user).then(function () {
                var id_user;
                db.collection('users').where('code', '==', user.code).get().then(querySnapshot => {
                    querySnapshot.forEach(function (doc) {
                        id_user = doc.id;
                        console.log(id_user);
                        db.collection('nutritionists').doc(userId).update({

                            "id_users": firebase.firestore.FieldValue.arrayUnion(id_user)
                        });
                        let favorite = {
                            id_user: id_user,
                            id_recipes: {}
                        }
                        
                        db.collection('user_recipe').add(favorite);
                        calculateMacros(id_user);
                        toastr["info"]("The new clients code: " + user.code + '<br /><br /><button type="button" onclick="window.location.href = '+"'"+'./ProfileClient.html?userId='+doc.id+"'"+';" class="btn clear">Ok</button>');
                    });
                });
                
                
            });
        }
    } else {

        window.location.href = './LoginNutri.html';
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCode() {
    var new_code = "";
    var i;
    for (i = 0; i <= 9; i++) {
        if (i % 3 == 0) {
            var x = getRndInteger(65, 90);
            new_code += String.fromCharCode(x);
        }
        else {
            var x = getRndInteger(0, 9);
            new_code += x.toString();
        }
    }
    var flag = 0;
    db.collection('users').where('code', '==', new_code).get().then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
            flag = 1;
        });
    });
    if (flag == 1) new_code = generateCode();
    return new_code;
}
function logout() {
    const userId = Cookies.get('userId');
    if (userId) {
        Cookies.remove('userId');
        window.location.href = './LoginClient.html';

    }
}

function calculateMacros(profileId) {
  
    db.collection('users').doc(profileId).get().then(doc => {
      if (doc.exists) {
        const user = doc.data();
        console.log(user);
        var tday = new Date();
        const years = tday.getFullYear() - user.bday.toDate().getFullYear();
        const h = user.height[user.height.length - 1];
        const g = user.weight[user.weight.length - 1];
        const bf = user.body_fat[user.body_fat.length - 1];
        var sum;
        console.log([years,h,g,bf]);
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
        //console.log(user.activity[user.activity.length-1]);
        switch (user.activity[user.activity.length-1]) {
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
          prot = kcal * 0.35 / 4;
          fat = kcal * 0.20 / 9;
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
  
        salveazaNutri([Math.floor(kcal), Math.floor(carb), Math.floor(prot), Math.floor(fat)],profileId);
      }
    });
  }

  function salveazaNutri(nutri,profileId) {
    db.collection('users').doc(profileId).get().then(doc => {
      if (doc.exists) {
        const user = doc.data();
        const u={
          nutrition: nutri
        }
        db.collection('users').doc(profileId).set({ ...u }, { merge: true }).then();
    }});
  
  }