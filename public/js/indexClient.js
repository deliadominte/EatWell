let done_contor=0, nr_meals;
window.onload = () => {
    const userId = Cookies.get('userId');
    var objToday = new Date();
    if (!userId) {
      window.location.href = './LoginClient.html';
  
    } else {
      db.collection('users').doc(userId).get().then(doc => {
        if (doc.exists) {
          const user = doc.data();
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
            document.getElementById("tags").innerHTML += '\
                       <span id="al'+ i.toString() + '" class="w3-tag w3-small w3-theme-d' + x.toString() + '">' + user.allergies[i] + '</span>';
          }
          document.getElementById("Demo2").innerHTML += '\
                  <p>Weight: '+ user.weight[user.weight.length - 1] + ' kg</p>\
                  <p>Height: '+ user.height[user.height.length - 1] + ' cm</p>\
                  <p>Body Fat: '+ user.body_fat[user.body_fat.length - 1] + ' %</p>\
                  <p>Arm: '+ user.arm[user.arm.length - 1] + ' cm</p>\
                  <p>Waistline: '+ user.waistline[user.waistline.length - 1] + ' cm</p>\
                  <p>Butt: '+ user.butt[user.butt.length - 1] + ' cm</p>\
                  <p>Thighs: '+ user.thighs[user.thighs.length - 1] + ' cm</p>\
                  <p>Level of activity: '+ user.activity[user.activity.length - 1] + '</p>';
          document.getElementById("Demo3").innerHTML += '\
                  <p>Calories: '+ user.nutrition[0] + ' kcal</p>\
                  <p>Carbohydrates: '+ user.nutrition[1] + ' grams</p>\
                  <p>Protein: '+ user.nutrition[2] + ' grams</p>\
                  <p>Fat: '+ user.nutrition[3] + ' grams</p>';
        }
      }
      );
      var vec_menu=[];
      console.log(userId);
      db.collection('menus').where('id_user','==',userId).get().then(querySnapshot => {
        querySnapshot.forEach(function (doc) {
            const menu = doc.data()
            const date = menu.date.toDate();
            console.log(date);
            if((menu.date.toDate().getUTCDate() == objToday.getUTCDate()) && (menu.date.toDate().getMonth() == objToday.getMonth()) && (menu.date.toDate().getFullYear() == objToday.getFullYear()))//adica e egal
                  { 
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
              <button onclick="done('+"'"+desc+"'"+','+"'"+doc.id+"'"+')" id="'+desc+'"\
               class="w3-button w3-theme-d1 w3-margin-bottom" ><i class="fa fa-check"></i>\
                 Done</button>\
              <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+doc.id+'"><i class="fa fa-bars"></i>\
                 See Recipe</a>\
               </div>';
               document.getElementById(desc).disabled = menu.is_done; 
                  }});
                }}
            
        })
    });
    db.collection('appointments').where('id_user','==',userId).get().then(querySnapshot => {
      querySnapshot.forEach(function (doc) {
          const apoint = doc.data();
          const date=apoint.date.toDate();
          if(apoint.isAccepted==true && (date>=new Date())){
            document.getElementById("apoint").innerHTML+='<div class="w3-card w3-round w3-white w3-center">\
            <div class="w3-container">\
              <p>Upcoming Appointment:</p>\
              <img src="./media/calendar.png" alt="Calendar" style="width:50%"><br>\
              <p>'+date.getHours()+":"+date.getMinutes()+"  "+date.getUTCDate()+"-"+date.getMonth()+"-"+date.getFullYear()+'</p>\
              <p>Details: '+apoint.details+'</p>\
            </div>\
          </div>\
          <br>';
          }
          else{
             document.getElementById("apoint").innerHTML+='<div  id="'+doc.id+'" class="w3-card w3-round w3-white w3-center">\
             <div class="w3-container">\
               <p>Appointment</p>\
               <img src="./media/calendar.png" alt="Calendar" style="width:50%"><br>\
               <span>'+date.getUTCDate()+"-"+date.getMonth()+"-"+date.getFullYear()+"  "+date.getHours()+":"+date.getMinutes()+'</span>\
               <div class="w3-row w3-opacity">\
                 <div class="w3-half">\
                   <button onclick="accept(1,'+"'"+doc.id+"'"+')" class="w3-button w3-block w3-green w3-section" title="Accept"><i\
                       class="fa fa-check"></i></button>\
                 </div>\
                 <div class="w3-half">\
                   <button onclick="accept(0,'+"'"+doc.id+"'"+')" class="w3-button w3-block w3-red w3-section" title="Decline"><i\
                       class="fa fa-remove"></i></button>\
                 </div>\
               </div>\
             </div>\
           </div>\
           <br>';
          }
      });
    });
    }
  }
  
  function accept(i,id){
    if(i==0){//decline
      document.getElementById(id).setAttribute("style","display:none");
      db.collection('appointments').doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    }
    else {
      a={
        isAccepted: true
      }
      db.collection('appointments').doc(id).set({ ...a }, { merge: true }).then(function() {
        db.collection('appointments').doc(id).get().then(doc => {
          document.getElementById(id).setAttribute("style","display:none");
          const apoint=doc.data();
          const date=apoint.date.toDate();
          document.getElementById("apoint").innerHTML+='<div class="w3-card w3-round w3-white w3-center">\
              <div class="w3-container">\
                <p>Upcoming Appointment:</p>\
                <img src="./media/calendar.png" alt="Calendar" style="width:50%"><br>\
                <p>'+date.getHours()+":"+date.getMinutes()+"  "+date.getUTCDate()+"-"+date.getMonth()+"-"+date.getFullYear()+'</p>\
                <p>Details: '+apoint.details+'</p>\
              </div>\
            </div>\
            <br>'
        });
      });
    }
  }
  function done(i,menuId){
    done_contor++; 
    document.getElementById(i).disabled = true; 
    if(done_contor==nr_meals)
          {a={
            is_done: true
          }
          db.collection('appointments').doc(menuId).set({ ...a }, { merge: true }).then(function(){
          alert("Congratulations you finished todays menu!");});
}}
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
  
  