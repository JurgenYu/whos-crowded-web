import React, { useContext } from 'react'

import FirebaseContext from '../../Firebase/Context';
import { FacebookLoginButton } from 'react-social-login-buttons'

export default function WithFacebook() {

    const firebase = useContext(FirebaseContext);

    const buttonClickHandler = () => {
        firebase?.authWithFacebook().catch(error => console.log(error));
    }

    return (
        <div>
                <FacebookLoginButton onClick={() => buttonClickHandler()} />
        </div>
    )
}