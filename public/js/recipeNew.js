toastr.options = { "positionClass": "toast-bottom-left" };
window.onload = () => {
  const userId = Cookies.get('userId');

  if (userId) {
    document.getElementById('save').onclick = e => {
      e.preventDefault();
      var p1 = document.getElementById('name').value;
      var p2 = document.getElementById('cal').value;
      var p3 = document.getElementById('carbo').value;
      var p4 = document.getElementById('protein').value;
      var p5 = document.getElementById('fat').value;
      var p6 = document.getElementById('preph').value;
      var p7 = document.getElementById('prepmin').value;
      var p8 = document.getElementById('cookh').value;
      var p9 = document.getElementById('cookmin').value;
      var p10 = document.getElementById('readyh').value;
      var p11 = document.getElementById('readymin').value;
      if (p1 == "" || p2 == "" || p3 == "" || p4 == "" || p5 == "" || p6 == "" || p7 == "" || p8 == "" || p9 == "" || p10 == "" || p11 == "")
        toastr.warning("Please fill all the fields!");
      else {
        const recipe = {
          directions: [],
          info: [p6, p7, p8, p9, p10, p11],
          ing: [],
          ing_measure: [],
          ing_type: [],
          name: p1,
          nutrition: [p2, p3, p4, p5]
        };
        var i;
        var nr_ing_valid = 0;
        for (i = 0; i <= nring; i++) {
          if (document.getElementById('ingred' + i.toString()).value != "") {
            recipe.ing_measure[i] = document.getElementById('weight' + i.toString()).value;
            recipe.ing[i] = document.getElementById('ingred' + i.toString()).value;
            recipe.ing_type[i] = document.getElementById('mySelect' + i.toString()).value;
            nr_ing_valid++;
          }
        }
        var nr_dir_valid = 0
        for (i = 0; i <= nrdir; i++) {
          if (document.getElementById('dir' + i.toString()).value != "") {
            nr_dir_valid++;
            recipe.directions[i] = document.getElementById('dir' + i.toString()).value;
          }

        }
        if (nr_ing_valid <= 0) {
          toastr.warning("Please fill at least one ingredient field!");
        }
        else if (nr_dir_valid <= 0) {
          toastr.warning("Please fill at least one direction field!");
        }
        else {
          db.collection('recipes').add(recipe).then(docRef => {

            window.location.href = './Recipe.html?recipeId=' + docRef.id;
          });
        }
      }
    }
  } else {

    window.location.href = './LoginNutri.html';
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
var nring = 0;
var nrdir = 0;
function appearAdd(id) {
  if (id == "ingredient") {
    nring++;
    var container = document.createElement("div");
    container.innerHTML = '\
    <li>\
                <input id="weight'+ nring + '" class="w3-input w3-theme-d0 w3-margin-bottom" type="number" name="weight" min="0" max=' + "'1000'" + '>\
                <select class="w3-input w3-theme-d0 w3-margin-bottom" id="mySelect'+ nring + '" onChange="check(this);">\
                  <option>-</option>\
                  <option>grams</option>\
                  <option>teaspoons</option>\
                  <option>tablespoons</option>\
                  <option>cups</option>\
                  <option>millilitres</option>\
                </select>\
                <input id="ingred'+ nring + '" class="w3-input w3-theme-d0 w3-margin-bottom" type="text" name="ingredient" max=' + "'50'" + '>\
              </li><br>';
    document.getElementById(id).appendChild(container);

  }
  else {
    nrdir++;
    var container = document.createElement("div");
    container.innerHTML = ' <li>\
            <textarea id="dir'+ nrdir + '" class="w3-input w3-theme-d0 w3-margin-bottom" cols="200" rows="10" name="step"></textarea>\
            </li><br>';
    document.getElementById(id).appendChild(container);
  }
}

function logout() {
  const userId = Cookies.get('userId');
  if (userId) {
    Cookies.remove('userId');
    window.location.href = './LoginClient.html';

  }
}