import React, { FunctionComponent } from 'react'
import SignUpForm from '../Components/SignUpForm/SingUpForm'
import NavBar from '../Components/NavBar/NavBar'

const SignUp: FunctionComponent = () => {
    return (
        <React.Fragment>
            <NavBar />
            <SignUpForm />
            <h1>Somrthing</h1>
        </React.Fragment>
    )
}

export default SignUp;
