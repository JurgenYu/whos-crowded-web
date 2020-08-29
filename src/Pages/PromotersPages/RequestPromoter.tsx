import React, { useState } from 'react'
import { Paper, Grid, Box, TextField, Button, InputLabel, InputBase } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { reuestPromoterStylesStyles } from '../styles/requestPromoterStyles'

export default function RequestPromoter() {
    const classes = reuestPromoterStylesStyles();

    interface requestPromotersFormInterface {
        prmoterName: string,
        phoneNumber: string,
        city: string,
        state: string,
    }
    const requestPromotersFormInterfaceInitialState = {
        prmoterName: '',
        phoneNumber: '',
        city: '',
        state: '',
    }

    interface errorsInterface {
        prmoterName: string | null,
        phoneNumber: string | null,
        city: string | null,
        state: string | null,
    }

    const errorsInitState = {
        prmoterName: null,
        phoneNumber: null,
        city: null,
        state: null,
    }

    const [inputForm, setInputForm] = useState<requestPromotersFormInterface>(requestPromotersFormInterfaceInitialState)
    const [errors, setErrors] = useState<errorsInterface>(errorsInitState);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputForm({
            prmoterName: event.target.name === 'prmoterName' ? event.target.value : inputForm.prmoterName,
            phoneNumber: event.target.name === 'phoneNumber' ? event.target.value : inputForm.phoneNumber,
            city: event.target.name === 'city' ? event.target.value : inputForm.city,
            state: event.target.name === 'State' ? event.target.value : inputForm.state,
        });
    }

    const buttonClickHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <div>
            <Grid container justify='center'>
                <Paper className={classes.paper}>
                    <Box p={3}>
                        <span>
                            <h3>Become a promoter on WhosCROWDED</h3>
                            <p>
                                As a WhosCROWDED promoter you will gain access
                                to the Promoter Mode. Promoter Mode and Create
                                CROWDs. Notification of your public parties will
                                be sent to all WhosCROWDED users in a 250 mile
                                radius. Notification of your private parties will
                                be sent to people in your CROWDs.
                            </p>
                            <p>
                                So become a
                                promoter and get your parties CROWDED.
                                </p>
                        </span>
                        <form onSubmit={buttonClickHandler} noValidate>
                            <TextField
                                id="prmoterName"
                                name="prmoterName"
                                variant='outlined'
                                label="Promoter Name"
                                helperText={errors.prmoterName ? errors.prmoterName : ''}
                                error={errors.prmoterName ? true : false}
                                value={inputForm.prmoterName}
                                onChange={handleInputChange}
                                className={classes.textField}
                                fullWidth
                            />
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                variant='outlined'
                                label="Phone Number"
                                helperText={errors.phoneNumber ? errors.phoneNumber : ''}
                                error={errors.phoneNumber ? true : false}
                                value={inputForm.phoneNumber}
                                onChange={handleInputChange}
                                className={classes.textField}
                                fullWidth
                            />
                            <TextField
                                id="city"
                                name="city"
                                variant='outlined'
                                label="City"
                                helperText={errors.city ? errors.city : ''}
                                error={errors.city ? true : false}
                                value={inputForm.city}
                                onChange={handleInputChange}
                                className={classes.textField}
                                fullWidth
                            />
                            <TextField
                                id="state"
                                name="state"
                                variant='outlined'
                                label="State"
                                helperText={errors.state ? errors.state : ''}
                                error={errors.state ? true : false}
                                value={inputForm.state}
                                onChange={handleInputChange}
                                className={classes.textField}
                                fullWidth
                            />
                            <Button
                                disableElevation disabled={loading}
                                type='submit'
                                variant='contained'
                                fullWidth
                                className={classes.button}>Sign Up
                                </Button>
                        </form>
                    </Box>
                </Paper>
            </Grid>
        </div>
    )
}
