import React, { useContext } from 'react'

import FirebaseContext from '../../Firebase/Context';
import { GoogleLoginButton } from 'react-social-login-buttons'

export default function WithGoole() {

    const firebase = useContext(FirebaseContext);

    const buttonClickHandler = () => {
        firebase?.authWithGoogle().catch(error => console.log(error));
    }

    return (
        <div>
                <GoogleLoginButton onClick={() => buttonClickHandler()} />
        </div>
    )
}
