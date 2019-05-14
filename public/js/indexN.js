
window.onload = () => {
    const userId = Cookies.get('userId');
  
    if (!userId) {
        window.location.href = './LoginNutri.html';
    } else {
    }
}
function createaccount(){
    var new_code="0";
    db.collection('users').where('isClient', '==', true).get().then(querySnapshot => {
        console.log("some");
        querySnapshot.forEach(function (doc){
            const us=doc.data();
            const code_client= us.code;
            if (parseInt(code_client) > parseInt(new_code))
                new_code=(parseInt(code_client)+1).toString();
        });
    const user = {
        username: " ",
        password: "0",
        code: new_code,
        isClient: true,
        place: "0",
        phone: "0",
        bday: "0",
        id_nutri: userId,
        arm: {},
        body_fat: {},
        butt: {},
        goal: 0,
        height: 0,
        thighs: {},
        time_prog: {},
        waistline: {},
        weight: {},
        nutrition: {},
        allergies: {}
    };

    db.collection('users').add(user).then(alert("The new clients code: "+ user.code));

});
}