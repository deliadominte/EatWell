toastr.options = {"positionClass": "toast-bottom-left"};
window.onload = () => {
    const userId = Cookies.get('userId');
    if (!userId) {
        document.getElementById('registerForum').onsubmit = e => {
            e.preventDefault();
    
            const user = {
                
                username: document.getElementById('username').value,
                code: document.getElementById('code').value,
                isClient: true,
                place: document.getElementById('place').value,
                phone: document.getElementById('telephone').value,
                bday: new Date(document.getElementById('bday').value),
                password: document.getElementById('password').value
            };
            console.log(user);
            db.collection('users').where('code', '==', user.code).get().then(querySnapshot => {
                let flag=0;
                querySnapshot.forEach(function (doc){
                    
                    const us_id = doc.id;
                    const us_un = doc.data().username;
                    console.log(us_un+" "+us_id);
                    if(us_un==" "){//sa nu fie registrat deja alt client cu condul respectiv
                     flag=1;
                     
                     db.collection('users').where('username', '==', user.username).get().then(querySnapshot => {
                            let flag1=0;
                            querySnapshot.forEach(data => {flag1=1;});
                            if(flag1!=0)
                            toastr.error('Username already exists!');
                            else{
                                db.collection('users').doc(us_id).set({ ...user }, { merge: true }).then(docRef => {
                                    Cookies.set('userId', us_id);
                        
                                    window.location.href = './index.html';
                                });
                            }
                        });
                    }
                });
                
                if(flag==0)//cazul in care a fost creat contul de catre nutri si a fost transmis codul clientului
                toastr.error('The code is not valid!');
        });}
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