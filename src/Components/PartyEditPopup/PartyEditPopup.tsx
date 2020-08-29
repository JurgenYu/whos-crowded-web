import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, Box, TextField, Button, Backdrop } from '@material-ui/core'
import { useStyles } from './styles'

export interface PartyPopupProps {
    open: boolean,
    handleClose: () => void,
}


export default function PartyEditPopup(props: PartyPopupProps) {
    const classes = useStyles()
    const { open, handleClose } = { ...props };

    interface partyEditFormFormInterface {
        title: string,
        discription: string,
        location: string,
    }
    const partyEditFormFormInterfaceInitialState = {
        title: '',
        discription: '',
        location: '',
    }

    interface errorsInterface {
        title: string | null,
        discription: string | null,
        location: string | null,
    }

    const errorsInitState = {
        title: null,
        discription: null,
        location: null,
    }

    const [inputForm, setInputForm] = useState<partyEditFormFormInterface>(partyEditFormFormInterfaceInitialState)
    const [errors, setErrors] = useState<errorsInterface>(errorsInitState);
    const [loading, setLoading] = useState(false);

    const textFieldTypes = ['title', 'discription', 'location'];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputForm({
            title: event.target.name === 'title' ? event.target.value : inputForm.title,
            discription: event.target.name === 'discription' ? event.target.value : inputForm.discription,
            location: event.target.name === 'location' ? event.target.value : inputForm.location,
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
            <Backdrop transitionDuration={250} className={classes.backdrop} open={open} onClick={handleClose}>
                <Grid container justify='center'>
                    <Paper onClick={e => e.stopPropagation()}>
                        <Box p={3}>
                            <form onSubmit={buttonClickHandler} noValidate>
                                {textFieldTypes.map((each, key) => {
                                    const value = key === 0 ? inputForm.title : key === 1 ? inputForm.discription : inputForm.location;
                                    const error = key === 0 ? errors.title : key === 1 ? errors.discription : errors.location;
                                    return <TextField
                                        id={each}
                                        name={each}
                                        variant='outlined'
                                        label={each[0].toUpperCase() + each.substring(1)}
                                        helperText={error ? error : ''}
                                        error={error ? true : false}
                                        value={value}
                                        onChange={handleInputChange}
                                        className={classes.textField}
                                        fullWidth
                                    />
                                })}
                                
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
            </Backdrop>
        </div >
    )
}

