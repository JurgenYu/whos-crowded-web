import React, { useState } from 'react'
import { Paper, Grid, Box, TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { reuestPromoterStylesStyles } from '../styles/requestPromoterStyles'

export default function RequestPromoter() {
    const classes = reuestPromoterStylesStyles();

    interface requestPromotersFormInterface {
        prmoterName: string,
        phoneNumber: string,
        city: string,
        State: string,
    }
    const requestPromotersFormInterfaceInitialState = {
        prmoterName: '',
        phoneNumber: '',
        city: '',
        State: '',
    }

    const [inputForm, setInputForm] = useState<requestPromotersFormInterface>(requestPromotersFormInterfaceInitialState)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputForm({
            prmoterName: event.target.name === 'prmoterName' ? event.target.value : inputForm.prmoterName,
            phoneNumber: event.target.name === 'phoneNumber' ? event.target.value : inputForm.phoneNumber,
            city: event.target.name === 'city' ? event.target.value : inputForm.city,
            State: event.target.name === 'State' ? event.target.value : inputForm.State,
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
        <div>
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
                        </form>
                        <small style={{ position: 'relative', float: 'right', marginTop: '-2.1rem', marginBottom: '1rem' }}>
                            Already have an account? Login <Link to="/login">here</Link>
                        </small>
                    </Box>
                </Paper>
            </Grid>
        </div>
    )
}
