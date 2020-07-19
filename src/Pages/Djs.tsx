import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles, Grid, Paper, Input, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, List, ListItem, Typography, Divider, Chip } from '@material-ui/core';
import FirebaseContext from '../Firebase/Context';
import { firestore } from 'firebase';
import { Dj, djConverter } from '../Firebase/Converters/DjConverter';
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc';
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '80%',
            backgroundColor: theme.palette.background.paper,
            margin: 'auto',
        },
        inline: {
            display: 'inline',
        },
        input: {
            height: "3rem",
            padding: "0px 14px"
        },
        paper: {
            width: '35rem',
            height: '3rem',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            marginBottom: "2rem",
        },
        button: {
            position: 'absolute',
            right: '0px',
            color: '#b794f6',
            top: '15%'
        },
        media: {
            height: '26rem',
            width: '26rem',
        },
        card: {
            margin: '1.5rem 1rem',
            borderRadius: '0.4rem',
            width: '26rem',
            backgroundColor: '#fff',
            marginBottom: '1.5rem',
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        },
        listItemText: {
            width: '50rem',
        },
        listItemText2: {
            width: '35rem',
        },
        formControl: {
            width: '10%',
            position: 'fixed',
            minWidth: 120,
            right: 0,
            margin: '0 2rem'
        },
        chip: {
            margin: 2,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        select: {
            backgroundColor: '#fff',
        },
        inputlabel: {
            color: '#fff',
            '&.Mui-focused': {
                color: '#fff'
            },
        }
    })
)

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: window.screen.height * 0.6,
            width: 360,
            position: 'absolute' as 'absolute',
        },
    },
};

export default function Djs() {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    const [djs, setDjs] = useState<Array<Dj>>([])
    const [userLoc, setUserLoc] = useState<firebase.firestore.GeoPoint | null>(null);
    const [inputZip, setInputZip] = useState<string>('');
    const [submitZip, setSubmitZip] = useState<string | null>(null)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])

    useEffect(() => {
        if (!userLoc) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLoc(new firestore.GeoPoint(position.coords.latitude, position.coords.longitude));
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log('User denied the request for Geolocation');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable");
                            break;
                        case error.TIMEOUT:
                            console.log("Timed out");
                            break;
                        default:
                            break;
                    }
                })
        }
    })

    useEffect(() => {
        if (userLoc) {
            const newDjs: Dj[] = [];
            firebase?.db?.collection('env/prod/djs')
                .withConverter(djConverter)
                .get().then((doc) => {
                    doc.forEach(element => {
                        const newDj = element.data()
                        newDj.distance = getDistanceFromLatLonInKm(
                            userLoc.latitude,
                            userLoc.longitude,
                            newDj.point.latitude,
                            newDj.point.longitude);
                        newDj.state = newDj.state.trimEnd();
                        newDj.city = newDj.city.trimEnd();
                        newDjs.push(newDj)
                        console.log(newDj)
                    });
                }).finally(() => {
                    setDjs(c => newDjs)
                })
        }
    }, [userLoc]);

    useEffect(() => {
        if (submitZip) {
            const google = window.google;
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: submitZip }, (res) => {
                if (google.maps.GeocoderStatus.OK) {
                    setUserLoc(new firestore.GeoPoint(
                        res[0].geometry.location.lat(),
                        res[0].geometry.location.lng()))
                }
            })
        }
    }, [submitZip])

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedGenres(event.target.value as string[]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(inputZip)
        setSubmitZip(inputZip);
    }

    console.log(djs)

    return (
        <div>
            <Grid container justify='center'>
                <Paper className={classes.paper}>
                    <form noValidate onSubmit={handleSubmit}>
                        <Input
                            id="zip"
                            placeholder="Search with Your Address/Postal"
                            disableUnderline
                            autoFocus
                            value={inputZip}
                            onChange={(e) => { setInputZip(e.target.value) }}
                            fullWidth
                            className={classes.input}
                        />
                        <Button endIcon={<SearchIcon />} className={classes.button} type='submit'>lol</Button>
                    </form>
                </Paper>
            </Grid>
            <div style={{ maxWidth: '80%', justifyContent: 'center', display: 'table', margin: 'auto', paddingBottom: "3rem" }}>
                <FormControl className={classes.formControl}>
                    <InputLabel shrink disableAnimation className={classes.inputlabel} id="demo-mutiple-chip-label">Select Genres</InputLabel>
                    <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={selectedGenres}
                        onChange={handleChange}
                        input={<Input disableUnderline className={classes.select} id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                                {(selected as string[]).map((value) => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {GENRES.map((value, key) => {
                            return (
                                <MenuItem
                                    key={key}
                                    value={value}
                                >
                                    <Checkbox
                                        value={value}
                                        checked={selectedGenres.indexOf(value) > -1}
                                    />
                                    <ListItemText primary={value} />
                                </MenuItem>
                            )
                        }
                        )}
                    </Select>
                </FormControl>
                <List className={classes.root}>
                    {djs.sort((a, b) => (a.distance - b.distance)).filter((each) => {
                        return each.genres.some(r => (selectedGenres.length > 0 ? selectedGenres : GENRES).indexOf(r) >= 0)
                    }).map((value, key) => {
                        return (
                            <div>
                                <ListItem alignItems="flex-start">
                                    <ListItemText
                                        className={classes.listItemText}
                                        primary={value.name}
                                        secondary={
                                            <Typography align='right' component="h1" variant="body2" className={classes.inline} color="textSecondary">
                                                {value.about}
                                            </Typography>
                                        }
                                    >
                                    </ListItemText>
                                    <ListItemText
                                        className={classes.listItemText2}
                                        primary={value.distance + "Miles"}
                                        secondary={
                                            <React.Fragment>
                                                <Typography component="span" variant="body2" className={classes.inline} color="textSecondary">
                                                    {value.city + ', ' + value.state}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" className={classes.inline} color="textSecondary">
                                                    {'Genres: ' + value.genres.join(' ')}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" className={classes.inline} color="textSecondary">
                                                    {'Phone: ' + value.phone}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    ></ListItemText>
                                </ListItem>
                                <Divider variant="fullWidth" component="li" />
                            </div>

                        )
                    })}
                </List>
            </div>
        </div>
    )
}