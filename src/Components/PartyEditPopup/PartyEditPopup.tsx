import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Paper, Box, TextField, Button, Backdrop, Select, Popover, InputLabel, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { useStyles } from './styles'
import PartyTimePicker from './DatePicker/PartyTimePicker'
import { GENRES } from '../../Util/Genres'
import GenreChip from '../GenreChip'

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
        age: number,
    }
    const partyEditFormFormInterfaceInitialState = {
        title: '',
        discription: '',
        location: '',
        age: 21,
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
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [genres, setGenres] = useState(new Array<boolean>(GENRES.length).fill(false));

    const textFieldTypes = ['title', 'discription', 'location'];

    const handleChipClick = (key: number) => {
        const newGenres = [...genres];
        newGenres[key] = !newGenres[key];
        setGenres(newGenres);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof inputForm
        setInputForm({
            ...inputForm,
            [name]: event.target.value
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
                    <Paper className={classes.root} onClick={e => e.stopPropagation()}>
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

                                <div className={classes.timePicker}>
                                    <div>
                                        <PartyTimePicker label='Start Time' time={startTime} setTime={setStartTime} />
                                    </div>
                                    <div>
                                        <PartyTimePicker label='End Time' time={endTime} setTime={setEndTime} />
                                    </div>
                                </div>
                                    <GenreChip color='rgba(249,147,51)' genres={genres} handleClick={handleChipClick}></GenreChip>


                                <Button
                                    disableElevation disabled={loading}
                                    type='submit'
                                    variant='contained'
                                    fullWidth
                                    className={classes.button}>Submit
                                </Button>
                            </form>
                        </Box>
                    </Paper>
                </Grid>


            </Backdrop>
        </div >
    )
}

