import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import FirebaseContext, { inputFormInterface } from '../../Firebase/Context'

//UI Components
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles, Button, CircularProgress } from '@material-ui/core';

interface errorsInterface {
    email: boolean,
    passwd: boolean,
    error: string
}

const errorsInitState = {
    email: false,
    passwd: false,
    error: ''
}

const inputFormInitialState = {
    email: '',
    passwd: ''
}

const useStyles = makeStyles((theme: Theme) => createStyles(
    {
        button: {
            color: 'black',
            marginTop: '1rem',
            marginBottom: '0.5rem'
        },
        textField: {
            marginBottom: '1rem'
        }
    }
))

const WithEmailAndPasswd = () => {
    const firebase = useContext(FirebaseContext);
    const classes = useStyles();
    const [inputForm, setInputForm] = useState<inputFormInterface>(inputFormInitialState)
    const [errors, setErrors] = useState<errorsInterface>(errorsInitState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputForm({
            email: event.target.name === 'email' ? event.target.value : inputForm.email,
            passwd: event.target.name === 'passwd' ? event.target.value : inputForm.passwd
        });
    }

    const buttonClickHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        firebase?.authWithEmailAndPassWd(inputForm)
            .catch((error: firebase.FirebaseError) => {
                switch (error.code) {
                    case 'auth/invalid-email':
                        setErrors({ email: true, passwd: false, error: 'Your Email address is invalid' })
                        break;
                    case 'auth/user-not-found':
                        setErrors({ email: true, passwd: false, error: 'User not found' })
                        break;
                    case 'auth/wrong-password':
                        setErrors({ email: false, passwd: true, error: 'Wrong Password' })
                        break;
                    default:
                        break;
                        
                }
                setLoading(false);
            });
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <React.Fragment>
            <form noValidate onSubmit={buttonClickHandler}>
                <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    helperText={errors.email? errors.error: ''}
                    error={errors.email}
                    value={inputForm.email}
                    onChange={handleInputChange}
                    className={classes.textField}
                    fullWidth
                />
                <TextField
                    id="passwd"
                    name="passwd"
                    type="password"
                    label="Password"
                    helperText={errors.passwd? errors.error: ''}
                    error={errors.email}
                    value={inputForm.passwd}
                    onChange={handleInputChange}
                    className={classes.textField}
                    fullWidth
                />
                <Button disabled={loading} type='submit' variant='contained' className={classes.button}>Login</Button>
                {loading && (
                    <CircularProgress style={{ position: 'absolute', marginLeft: '1rem', marginTop: '1rem' }} color='secondary' size={30} />
                )}
            </form>
            <small style={{ float: 'right', marginTop: '-2.1rem', marginBottom: '1rem' }}>
                Dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
        </React.Fragment>
    )
}

export default WithEmailAndPasswd;
