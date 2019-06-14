var cal = 0;
var protein = 0;
var carbo = 0;
var fat = 0;
var allergies = [];
var index = 1;
let list = "";
let d;
let is_ok = false;
toastr.options = { "positionClass": "toast-bottom-left" };

const profileId = new URLSearchParams(window.location.search).get('userId');
console.log(profileId);
if (new URLSearchParams(window.location.search).has('date'))
    d = new Date(new URLSearchParams(window.location.search).get('date'));
else
    d = new Date();
    console.log(d);
window.onload = () => {


    const userId = Cookies.get('userId');
    console.log(userId);
    if (userId) {
        db.collection('users').doc(profileId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                cal = user.nutrition[0];
                protein = user.nutrition[1];
                carbo = user.nutrition[2];
                fat = user.nutrition[3];
                allergies = user.allergies;

            }
        });
        db.collection('recipes').get().then(querySnapshot => {

            querySnapshot.forEach(function (doc) {
                const recipe = doc.data();
                list += '<option onclick="update(' + "'" + index + "','" + doc.id + "'" + ')" value="' + doc.id + '">' + recipe.name + '</option>' + '\n';
            });
        });
        setTimeout(function () {
            console.log(list);
            console.log('\
        <div id="meal' + index + '" class="w3-container w3-card w3-white w3-round w3-margin"><br>' +
                '<input class="w3-input w3-theme-d0" id="dets' + index + '" type="text" placeholder="Type Meal"><br>' +
                '<select  class="w3-left-align w3-input w3-theme-d0" id="options' + index + '" size="6">' + list + '\
            </select> \
            <hr class="w3-clear">' +
                '<a id="see' + index + '" class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html"><i class="fa fa-bars"></i>  See Recipe</a>' +
                '</div>');

            var container = document.createElement("div");
            container.innerHTML = '\
<div id="meal' + index + '" class="w3-container w3-card w3-white w3-round w3-margin"><br>' +
                '<input class="w3-input w3-theme-d0" id="dets' + index + '" type="text" placeholder="Description"><br>' +
                '<select  class="w3-left-align w3-input w3-theme-d0" id="options' + index + '" size="6" ">' + list + '\
    </select> \
    <hr class="w3-clear">' +
                '<a id="see' + index + '" class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html"><i class="fa fa-bars"></i>  See Recipe</a>' +
                '</div>';
            document.getElementById("meals").appendChild(container);
            index++;
        }, 1000);
        console.log("done");

    } else {

        window.location.href = './LoginNutri.html';
    }
}




function update(i, id) {
    console.log(i + "update");
    if (document.getElementById("see" + i.toString()))
        document.getElementById("see" + i.toString()).setAttribute('href', "./Recipe.html?recipeId=" + id.toString());

}
function addMeal() {
    list = ""
    db.collection('recipes').get().then(querySnapshot => {

        querySnapshot.forEach(function (doc) {
            const recipe = doc.data();
            list += '<option onclick="update(' + "'" + index + "','" + doc.id + "'" + ')" value="' + doc.id + '">' + recipe.name + '</option>' + '\n';
        });
    });
    setTimeout(function () {
        console.log(list);
        console.log('\
    <div id="meal' + index + '" class="w3-container w3-card w3-white w3-round w3-margin"><br>' +
            '<input class="w3-input w3-theme-d0" id="dets' + index + '" type="text" placeholder="Type Meal"><br>' +
            '<select  class="w3-left-align w3-input w3-theme-d0" id="options' + index + '" size="6">' + list + '\
        </select> \
        <hr class="w3-clear">' +
            '<a id="see' + index + '" class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html"><i class="fa fa-bars"></i>  See Recipe</a>' +
            '</div>');

        var container = document.createElement("div");
        container.innerHTML = '\
<div id="meal' + index + '" class="w3-container w3-card w3-white w3-round w3-margin"><br>' +
            '<input class="w3-input w3-theme-d0" id="dets' + index + '" type="text" placeholder="Description"><br>' +
            '<select  class="w3-left-align w3-input w3-theme-d0" id="options' + index + '" size="6" >' + list + '\
</select> \
<hr class="w3-clear">' +
            '<a id="see' + index + '" class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html"><i class="fa fa-bars"></i>  See Recipe</a>' +
            '</div>';
        document.getElementById("meals").appendChild(container);
        index++;
    }, 1000);

}
function verify() {
    let i = 0, j, l;
    let sum_cal = 0, sum_protein = 0, sum_fat = 0, sum_carbo = 0;
    let recipes = [];
    let a;
    let flag = 1;
    for (i = 1; i < index; i++) {
        recipes.push(document.getElementById("options" + i).value);
        console.log(recipes[i - 1]);
        db.collection('recipes').doc(recipes[i - 1]).get().then(doc => {
            if (doc.exists) {
                const recipe = doc.data();
                console.log(recipe);
                sum_cal += parseInt(recipe.nutrition[0]);
                sum_protein += parseInt(recipe.nutrition[1]);
                sum_carbo += parseInt(recipe.nutrition[2]);
                sum_fat += parseInt(recipe.nutrition[3]);
                for (j = 0; j < recipe.ing.length; j++) {
                    for (l = 0; l < allergies.length; l++) {
                        console.log(recipe.ing[j] + " " + allergies[l]);
                        if (recipe.ing[j] == allergies[l]) {
                            flag = 0;
                            a = recipe.ing[j];
                            break;

                        }
                    }
                }

            }
        });
    }
    setTimeout(function () {

        console.log(cal + " " + carbo + " " + protein + " " + fat);
        console.log(sum_cal + " " + sum_carbo + " " + sum_protein + " " + sum_fat);
        if (sum_cal > cal) {
            is_ok = false;
            toastr.warning("Calories over limit: " + cal + "! Yours: " + sum_cal);
        }
        else if (sum_carbo > carbo) {
            is_ok = false;
            toastr.warning("Carbohydrates over limit: " + carbo + "! Yours: " + sum_carbo);
        }
        else if (sum_protein > protein) {
            is_ok = false;
            toastr.warning("Protein over limit: " + protein + "! Yours: " + sum_protein);
        }
        else if (sum_fat > fat) {
            is_ok = false;
            toastr.warning("Fat over limit: " + fat + "! Yours: " + sum_fat);
        }
        else if (flag == 0) {
            is_ok = false;
            toastr.warning("Client allergic to: " + a);
        }
        else {
            is_ok = true;
            toastr.success("Meniu is OK!");
        }
    }, 500);

}

function setMenu() {
    const userId = Cookies.get('userId');
    if (is_ok==true) {
        const menu = {
            id_nutri: userId,
            id_user: profileId,
            date: d,
            description: [],
            is_done: [],
            meals: []
        }
        for (i = 1; i < index; i++) {
            menu.meals.push(document.getElementById("options" + i).value);
            menu.description.push(document.getElementById("dets" + i).value);
            menu.is_done.push(false);
        }
        db.collection('menus').add(menu).then(docRef => {

            window.location.href = './DayMenu.html?menuId=' + docRef.id;
        });
    }
    else {
        toastr.error("Please verify again!");
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
function logout() {
    const userId = Cookies.get('userId');
    if (userId) {
        Cookies.remove('userId');
        window.location.href = './LoginClient.html';

    }
}