import { createContext } from 'react';
import * as firebase from 'firebase'

interface FirebaseContextInterface {
    currentUser: firebase.User | null,
    authWithEmailAndPassWd: (inputForm: inputFormInterface) => Promise<firebase.auth.UserCredential>,
    userSignOut: () => void,
    authWithGoogle: () => Promise<firebase.auth.UserCredential>,
    signupWithEmailAndPasswd: (inputForm: inputFormInterface) => Promise<firebase.auth.UserCredential>
}

export interface inputFormInterface {
    email: string,
    passwd: string
}

export type firebaseConfigType = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string
}

const FirebaseContext = createContext<FirebaseContextInterface | null>(null);

export default FirebaseContext;
