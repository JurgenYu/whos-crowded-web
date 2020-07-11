import React, { useContext, useState } from 'react'
import { Paper, makeStyles, Grid, TextField, Box, Button, CircularProgress } from '@material-ui/core'
import FirebaseContext, { inputFormInterface } from '../../Firebase/Context';
import { Link } from 'react-router-dom';

interface errorsInterface {
    email: boolean,
    passwd: boolean,
    repeatpasswd: boolean,
    error: string
}

const errorsInitState = {
    email: false,
    passwd: false,
    repeatpasswd: false,
    error: ''
}

const inputFormInitialState = {
    email: '',
    passwd: '',
}

const useStyles = makeStyles({
    paper: {
        marginTop: '3rem',
        paddingTop: '0.5rem',
        width: '34.7rem'
    },
    textField: {
        marginBottom: '1rem',
        margin: '0 auto'
    },
    button: {
        color: 'black',
        marginTop: '1rem',
        marginBottom: '0.5rem'
    }
})
export default function SignUpForm() {

    const firebase = useContext(FirebaseContext);
    const classes = useStyles();
    const [inputForm, setInputForm] = useState<inputFormInterface>(inputFormInitialState)
    const [repeatPasswd, setRepeatPasswd] = useState('');
    const [errors, setErrors] = useState<errorsInterface>(errorsInitState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputForm({
            email: event.target.name === 'email' ? event.target.value : inputForm.email,
            passwd: event.target.name === 'passwd' ? event.target.value : inputForm.passwd,
        });
    }

    const buttonClickHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputForm.passwd !== repeatPasswd) {
            setErrors({
                email: false,
                passwd: false,
                repeatpasswd: true,
                error: 'Password does not match'
            });
        }
        else {
            setLoading(true);
            firebase?.signupWithEmailAndPasswd(inputForm)
                .catch((error: firebase.FirebaseError) => {
                    switch (error.code) {
                        case 'auth/email-already-in-use':
                            setErrors({ email: true, passwd: false, repeatpasswd: false, error: 'Your Email address already exist' })
                            break;
                        case 'auth/invalid-email':
                            setErrors({ email: true, passwd: false, repeatpasswd: false, error: 'Your Email address is invalid' })
                            break;
                        case 'auth/weak-password':
                            setErrors({ email: false, passwd: true, repeatpasswd: false, error: 'Weak Password!' })
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
    }

    return (
        <React.Fragment>
            <Grid container justify='center'>
                <Paper className={classes.paper}>
                    <Box p={3}>
                        <form onSubmit={buttonClickHandler} noValidate>
                            <TextField
                                id="email"
                                name="email"
                                type="email"
                                label="Email Address"
                                helperText={errors.email ? errors.error : ''}
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
                                helperText={errors.passwd ? errors.error : ''}
                                error={errors.passwd}
                                value={inputForm.passwd}
                                onChange={handleInputChange}
                                className={classes.textField}
                                fullWidth
                            />
                            <TextField
                                id="repeatpasswd"
                                name="repeatpasswd"
                                type="repeatpasswd"
                                label="Confirm Your Password"
                                helperText={errors.repeatpasswd ? errors.error : ''}
                                error={errors.repeatpasswd}
                                value={repeatPasswd}
                                onChange={(e) => setRepeatPasswd(e.target.value)}
                                className={classes.textField}
                                fullWidth
                            />
                            <Button disabled={loading} type='submit' variant='contained' className={classes.button}>Sign Up</Button>
                            {loading && (
                                <CircularProgress style={{ position: 'absolute', marginLeft: '1rem', marginTop: '0.1rem' }} color='secondary' size={30} />
                            )}
                        </form>
                        <small style={{ position: 'relative', float: 'right', marginTop: '-2.1rem', marginBottom: '1rem' }}>
                            Already have an account? Login <Link to="/login">here</Link>
                        </small>
                    </Box>
                </Paper>
            </Grid>
        </React.Fragment>

    )
}
