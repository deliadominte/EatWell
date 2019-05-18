window.onload = () => {
    const userId = Cookies.get('userId');
    
    if (!userId) {
        console.log("de");
      window.location.href = './LoginClient.html';
        
    } else {
        console.log("de1");
        db.collection('users').doc(userId).get().then(doc => {
            if (doc.exists) {
                const user = doc.data();
                console.log("de3");
                console.log(user);
                document.getElementById("username").innerHTML+=user.username;
                document.getElementById("place").innerHTML+=user.place;
                document.getElementById("date").innerHTML+=formatDate(user.bday.toDate());
                if(user.gender=='Female')
                document.getElementById("gender").innerHTML+='<i class="fa fa-venus fa-fw w3-margin-right w3-text-theme "></i>'+user.gender;
                else
                document.getElementById("gender").innerHTML+='<i class="fa fa-mars fa-fw w3-margin-right w3-text-theme "></i>'+user.gender;
                var i;
                for(i=0;i<user.allergies.length;i++)
                {var x=getRndInteger(2, 5);
                  console.log('\
                  <span id="al'+i.toString()+'" class="w3-tag w3-small w3-theme-d'+ x.toString() +'">'+user.allergies[i]+'\
                 <button  onclick="elimina('+i.toString()+')"'+' class="w3-button w3-theme-d'+ x.toString() +'">\
                 <i class="fa fa-remove"></i>\
                 </button></span>');
                     document.getElementById("tags").innerHTML+='\
                     <span id="al'+i.toString()+'" class="w3-tag w3-small w3-theme-d'+ x.toString() +'">'+user.allergies[i]+'\
                    <button onclick="elimina('+i.toString()+')"'+' class="w3-button w3-theme-d'+ x.toString() +'">\
                    <i class="fa fa-remove"></i>\
                    </button></span>';}
                document.getElementById("Demo2").innerHTML+='\
                <p>Weight: '+user.weight[user.weight.length-1]+'</p>\
                <p>Height: '+user.height[user.height.length-1]+'</p>\
                <p>Body Fat: '+user.body_fat[user.body_fat.length-1]+'</p>\
                <p>Arm: '+user.arm[user.arm.length-1]+'</p>\
                <p>Waistline: '+user.waistline[user.waistline.length-1]+'</p>\
                <p>Butt: '+user.butt[user.butt.length-1]+'</p>\
                <p>Thighs: '+user.thighs[user.thighs.length-1]+'</p>\
                <p>Level of activity: '+user.lvl_activity[user.lvl_activity.length-1]+'</p>';
                document.getElementById("Demo3").innerHTML+='\
                <p>Calories: '+user.nutrition[0]+'</p>\
                <p>Carbohydrates: '+user.nutrition[1]+'</p>\
                <p>Protein: '+user.nutrition[2]+'</p>\
                <p>Fat: '+user.nutrition[3]+'</p>';
             }
        }
        );
    }
}

var elimina= function(i){
  console.log(i);
  document.getElementById("al"+i).style.display="none";
  const userId = Cookies.get('userId');
  
  db.collection('users').doc(userId).get().then(doc => {
    if (doc.exists) {
        const user = doc.data();
        db.collection("users").doc(userId).update({
          "allergies": firebase.firestore.FieldValue.arrayRemove(user.allergies[i])
      });
    }});
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
    return Math.floor(Math.random() * (max - min + 1) ) + min;
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

function appearAdd(id){
  if(id =='Add2'){
  var x = document.getElementById(id);
  x.className = x.className.replace("w3-hide", "w3-show");
  var y= document.getElementById('Add1');
  y.className = y.className.replace("w3-show", "w3-hide");
}
else{
  var x = document.getElementById(id);
  x.className = x.className.replace("w3-hide", "w3-show");
  var y= document.getElementById('Add2');
  y.className = y.className.replace("w3-show", "w3-hide");

  const userId = Cookies.get('userId');
  document.getElementById("tags").innerHTML+='\
  <span class="w3-tag w3-small w3-theme-d2">'+document.getElementById("new-tag").value+' <button onclick="this.parentElement.style.display='+"'none'"+'" class="w3-button w3-theme-d2">  <i class="fa fa-remove"></i></button></span>';
  db.collection("users").doc(userId).update({
    "allergies": firebase.firestore.FieldValue.arrayUnion(document.getElementById("new-tag").value)
});
}
}
