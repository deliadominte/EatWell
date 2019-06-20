toastr.options = { "positionClass": "toast-bottom-left" };
window.onload = () => {
    let cipher = salt => {
        let textToChars = text => text.split('').map(c => c.charCodeAt(0))
        let byteHex = n => ("0" + Number(n).toString(16)).substr(-2)
        let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

        return text => text.split('')
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join('')
    }

   
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
                password: document.getElementById('password').value
            };
            var lowerCaseLetters = /[a-z]/g;
            var upperCaseLetters = /[A-Z]/g;
            var numbers = /[0-9]/g;
            if (user.password.length < 8) {
                toastr.warning("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            else if (!user.password.match(lowerCaseLetters)) {
                toastr.warning("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            else if (!user.password.match(numbers)) {
                toastr.warning("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            else if (!user.password.match(upperCaseLetters)) {
                toastr.warning("Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
            }
            else {
                // To create a cipher
                let myCipher = cipher('mySecretSalt');

                //Then cipher any text:
                var enc=myCipher(user.password) ;
                console.log(enc);
                user.password=enc;
                

                db.collection('users').where('code', '==', user.code).get().then(querySnapshot => {
                    let flag = 0;
                    querySnapshot.forEach(function (doc) {

                        const us_id = doc.id;
                        const us_un = doc.data().username;
                        if (us_un == "-") {//sa nu fie registrat deja alt client cu condul respectiv
                            flag = 1;

                            db.collection('users').where('username', '==', user.username).get().then(querySnapshot => {
                                let flag1 = 0;
                                querySnapshot.forEach(data => { flag1 = 1; });
                                if (flag1 != 0)
                                    toastr.error('Username already exists!');
                                else {
                                    db.collection('users').doc(us_id).set({ ...user }, { merge: true }).then(docRef => {
                                        Cookies.set('userId', us_id);

                                        window.location.href = './index.html';
                                    });
                                }
                            });
                        }
                    });

                    if (flag == 0)//cazul in care a fost creat contul de catre nutri si a fost transmis codul clientului

                        toastr.error('The code is not valid!');
                });
            }
        }
    } else {
        var flag = 0;
        db.collection('users').where('id', '==', userId).get().then(querySnapshot => {
            querySnapshot.forEach(function (doc) {
                window.location.href = './index.html';
            });
        }
        );
        if (flag == 0) { window.location.href = './indexNutri.html'; }
    }
}