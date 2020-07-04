import * as firebase from 'firebase';
import React, { useEffect, useState, ReactNode } from 'react'
import FirebaseContext, { inputFormInterface } from './Context';

const firebaseConfig = {
    apiKey: "AIzaSyBmo5wgK-IByqI6qoSmsCMxVSSNFspJd-8",
    authDomain: "whos-crowded-4ca8f.firebaseapp.com",
    databaseURL: "https://whos-crowded-4ca8f.firebaseio.com",
    projectId: "whos-crowded-4ca8f",
    storageBucket: "whos-crowded-4ca8f.appspot.com",
    messagingSenderId: "748794973025",
    appId: "1:748794973025:web:1ae26acc25827cefb25320"
};

type Props = {
    children: ReactNode
};

const authWithEmailAndPassWd = (form: inputFormInterface) => {
    const { email, passwd } = { ...form };
    return firebase.auth().signInWithEmailAndPassword(email, passwd);
}

const userSignOut = () => {
    firebase.auth().signOut()
}

const authWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

const authWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

const signupWithEmailAndPasswd = (form: inputFormInterface) => {
    const { email, passwd } = { ...form }
    return firebase.auth().createUserWithEmailAndPassword(email, passwd);
}

const FirebaseProvider = ({ children }: Props) => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(() => {
            setTimeout(() => {
                setCurrentUser(firebase.auth().currentUser);
            }, 10);
        });
    }, []);

const db = firebase.database();

return (
    <FirebaseContext.Provider
        value={{
            currentUser: currentUser,
            authWithEmailAndPassWd: authWithEmailAndPassWd,
            userSignOut: userSignOut,
            authWithGoogle: authWithGoogle,
            authWithFacebook: authWithFacebook,
            signupWithEmailAndPasswd: signupWithEmailAndPasswd,
            db: db,

        }}
    >
        {children}
    </FirebaseContext.Provider>
)

}

export default FirebaseProvider;