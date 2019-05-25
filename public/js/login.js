window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
        document.getElementById('loginCForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('users').where('username', '==', username).get().then(querySnapshot => {
                let flag=0;
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    console.log(user.password);
                        flag=1;
                        if (user.password === password) {
                            Cookies.set('userId', doc.id);
                            window.location.href = './index.html';
                        } else {
                                alert("Incorrect Password!");
                        }
                });
                if(flag==0) alert('Incorrect Username!');
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