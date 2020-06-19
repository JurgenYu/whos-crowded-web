import * as firebase from 'firebase';

export type firebaseConfigType = {
    apiKey: String,
    authDomain: String,
    databaseURL: String,
    projectId: String,
    storageBucket: String,
    messagingSenderId: String,
    appId: String
}

const firebaseConfig = {
    apiKey: "AIzaSyBmo5wgK-IByqI6qoSmsCMxVSSNFspJd-8",
    authDomain: "whos-crowded-4ca8f.firebaseapp.com",
    databaseURL: "https://whos-crowded-4ca8f.firebaseio.com",
    projectId: "whos-crowded-4ca8f",
    storageBucket: "whos-crowded-4ca8f.appspot.com",
    messagingSenderId: "748794973025",
    appId: "1:748794973025:web:1ae26acc25827cefb25320"
};

const fireBaseApp = (config:firebaseConfigType = firebaseConfig) => {
    return firebase.initializeApp(config);
}

export default fireBaseApp;