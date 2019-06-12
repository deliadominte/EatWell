// Initialize Firebase
const config = {
    apiKey: "AIzaSyBo1_1NSQg5LRxO9hpQlAtqFMfXLcIC_FE",
    authDomain: "eatwell-936c4.firebaseapp.com",
    databaseURL: "https://eatwell-936c4.firebaseio.com",
    projectId: "eatwell-936c4",
    storageBucket: "eatwell-936c4.appspot.com",
    messagingSenderId: "613542920419"
};

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});
