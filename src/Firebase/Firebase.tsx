import * as firebase from 'firebase';
import React, { useEffect, useState, ReactNode } from 'react'
import FirebaseContext, { inputFormInterface } from './Context';

const firebaseConfig = {
};

interface FirebaseProviderProps {
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

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [promoterId, setPromoterId] = useState<string | null>(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async () => {
            setCurrentUser(firebase.auth().currentUser);
        });
    }, []);

    useEffect(()=>{
        if (currentUser) {
            firebase.firestore().collection('env/dev/users/')
            .doc(currentUser?.toString()).get().then((doc) => {
                if (doc.get('promoterid')) {
                    setPromoterId(doc.get('promoterid'));
                }
            })
        }
    }, [currentUser])

    const db = firebase.firestore();

    const storage = firebase.storage();

    const functions = firebase.functions();

    return (
        <FirebaseContext.Provider
            value={{
                currentUser: currentUser,
                promoterId: promoterId,
                authWithEmailAndPassWd: authWithEmailAndPassWd,
                userSignOut: userSignOut,
                authWithGoogle: authWithGoogle,
                authWithFacebook: authWithFacebook,
                signupWithEmailAndPasswd: signupWithEmailAndPasswd,
                db: db,
                storage: storage,
                functions: functions,
            }}
        >
            {children}
        </FirebaseContext.Provider>
    )

}

export default FirebaseProvider;