window.onload = () => {
    const userId = Cookies.get('userId');

    if (!userId) {
       
        document.getElementById('loginNForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('users').where('username', '==', username).get().then(querySnapshot => {
                let flag=0;
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    if(!user.isClient){
                        flag=1;
                        if (user.password === password) {
                            Cookies.set('userId', doc.id);
                            window.location.href = './indexNutri.html';
                        } else {
                                alert("Incorrect Password!");
                        }
                    }
                    else{
                        flag=2
                    }
                });
                if(flag==0) alert('Incorrect Username!');
                if(flag==2) alert("This isn't a Nutritionist Account!");
            });
        }
    } else {
        db.collection('users').where('id', '==', userId).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                if(doc.isClient==true)
                window.location.href = './index.html';
                else
                window.location.href = './indexNutri.html';
            });
        }
        );
    }
}