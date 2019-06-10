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
                bday: new Date(),
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