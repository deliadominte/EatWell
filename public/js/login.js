toastr.options = { "positionClass": "toast-bottom-left" };
window.onload = () => {
    const userId = Cookies.get('userId');

    let decipher = salt => {
        let textToChars = text => text.split('').map(c => c.charCodeAt(0))
        let saltChars = textToChars(salt)
        let applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('')
    }
    if (!userId) {
        document.getElementById('loginCForm').onsubmit = e => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            db.collection('users').where('username', '==', username).get().then(querySnapshot => {
                let flag = 0;
                querySnapshot.forEach(function (doc) {
                    const user = doc.data();
                    flag = 1;
                    //To decipher, you need to create a decipher and use it:
                    let myDecipher = decipher('mySecretSalt');
                    var decrypted = myDecipher(user.password);   // --> 'the secret string'
                    console.log(decrypted);
                    if (user.password === password) {
                        Cookies.set('userId', doc.id);
                        window.location.href = './index.html';
                    } else {
                        toastr.error("Incorrect Password!");
                    }
                });
                if (flag == 0) toastr.error('There is no active client account with this username!');
            });
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