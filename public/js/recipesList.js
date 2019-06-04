window.onload = () => {
    const userId = Cookies.get('userId');
  
    if (userId) {
        let ord=0;
        const   MAX_LOAD = 3;
db.collection('recipes').get().then( querySnapshot => {
    querySnapshot.forEach(function (doc) {
        ord = ord + 1;
        let displaystyle;
        const recipe = doc.data();
        console.log(ord);
        if(ord<=MAX_LOAD){
            displaystyle = "block";
            console.log(ord);
        }else{
            displaystyle = "none";
        }
        var elem = document.createElement("div");
        elem.innerHTML ='<div id = "p-'+ord+'" class="pers w3-container w3-card w3-white w3-round w3-margin" style="display:'+displaystyle+'"><br>\
        <h4 class="name w3-center">'+recipe.name+'</h4>\
        <hr class="w3-clear">\
        <p>Calories:'+recipe.nutrition[0]+'</p>\
        <p>Carbohydrates:'+recipe.nutrition[1]+'</p>\
        <p>Protein:'+recipe.nutrition[1]+'</p>\
        <p>Fat:'+recipe.nutrition[1]+'</p>\
        <hr class="w3-clear">\
        <a class=" w3-center w3-button w3-theme-d2 w3-margin-bottom" href="./Recipe.html?recipeId='+recipe.id+'" ><i class="fa fa-bars"></i>  See Recipe</a>\
       </div>';
        document.getElementById("container").appendChild(elem);
    });});
    let loaded = MAX_LOAD;
            document.getElementById("more-btn").onclick = e => {
                let i;
                for (i = loaded+1; i <= loaded+MAX_LOAD; i++) {
                    let element = document.getElementById("p-"+i);
                    // console.log("p-"+i);
                    if(element){
                        element.style.display = "block";
                    }
                }
                loaded = loaded+MAX_LOAD;
            }
            document.getElementById("searchbar").onkeyup = e =>{
                document.getElementById("more-btn").style.display = "none";
                let pers = document.getElementsByClassName("pers w3-container w3-card w3-white w3-round w3-margin");
                let i;
                filter = document.getElementById("searchbar").value.toUpperCase();

                if (filter){
                    for (i = 0; i < pers.length; i++) {
                        name = pers[i].getElementsByClassName("name w3-center")[0].innerHTML;
                        
                        if (name.toUpperCase().indexOf(filter) > -1) {
                            pers[i].style.display = "block";
                        } else {
                            pers[i].style.display = "none";
                        }
                    }
                }
                else{
                    location.reload();
                }
            }
}
else{
    window.location.href = './Login.html';
}
}
function logout(){
    const userId = Cookies.get('userId');
    if(userId){
      Cookies.remove('userId');
      window.location.href = './LoginClient.html';

    }
 }