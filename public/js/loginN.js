toastr.options = {"positionClass": "toast-bottom-left"};
window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
       
        document.getElementById('loginNForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('nutritionists').where('username', '==', username).get().then(querySnapshot => {
                let flag_exists=false;
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                        flag_exists=true;
                        if (user.password === password) {
                            Cookies.set('userId', doc.id);
                            window.location.href = './indexNutri.html';
                        } else {
                            toastr.error("Incorrect Password!");
                        }
                });
                if(flag_exists==false)
                toastr.error('There is no active nutritionist account with this username!');
            });
        }
    } else {
        var flag=0;
        db.collection('users').where('id', '==', userId).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                window.location.href = './index.html';
            });
        }
        );
        if (flag==0){window.location.href = './indexNutri.html';}
    }
}