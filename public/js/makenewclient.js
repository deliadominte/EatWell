window.onload = () => {
    const userId = Cookies.get('userId');
    if (userId) {
        document.getElementById('getInfoForum').onsubmit = e => {
            e.preventDefault();
            var p1=document.getElementById('thighs').value ;
            var p2=document.getElementById('arm').value;
            var p3=document.getElementById('body_fat').value;
            var p4= document.getElementById('butt').value;
            var p5= document.getElementById('goal').value;
            var p6= document.getElementById('height').value;
            var p7= document.getElementById('waistline').value;
            var p8= document.getElementById('weight').value;
            var p9= document.getElementById('gender').value;
            var p10= document.getElementById('activity').value;
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var new_code=generateCode();
            const user = {
                username: " ",
                password: "0",
                gender: p9,
                code: new_code,
                place: "0",
                phone: "0",
                bday: "0",
                id_nutri: userId,
                activity: p10,
                arm: [p2],
                body_fat: [p3],
                butt: [p4],
                goal: [p5],
                height: [p6],
                thighs:[p1],
                time_prog: [date],
                waistline: [p7],
                weight: [p8],
                nutrition: [],
                allergies: []
            };
            console.log(user);
            //db.collection('users').add(user).then(alert("The new clients code: "+ user.code));
            //window.location.href ='./indexNutri.html'
            }
    } else {
        
                window.location.href = './LoginNutri.html';
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

function generateCode(){
    var new_code="";
    var i;
    for(i=0;i<=9;i++){
       if(i%3==0)
          {var x=getRndInteger(65,90);
          new_code+=String.fromCharCode(x);}
       else
          {var x =getRndInteger(0,9);
          new_code+=x.toString();}
    }
    var flag=0;
    db.collection('users').where('code', '==', new_code).get().then(querySnapshot => {
        querySnapshot.forEach(function (doc){
            flag=1;
        });});
    if (flag==1) new_code=generateCode();
    return new_code;
}