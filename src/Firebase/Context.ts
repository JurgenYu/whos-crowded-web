import { createContext } from 'react';
import * as firebase from 'firebase'

interface FirebaseContextInterface {
    isLoggedin: boolean,
    app: firebase.app.App
}

const FirebaseContext = createContext<FirebaseContextInterface | null>(null);

export default FirebaseContext;
