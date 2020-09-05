import React, { useContext, useState, useEffect } from 'react'
import { Grid, Paper, Input, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, List, ListItem, Typography, Divider, Chip } from '@material-ui/core';
import FirebaseContext from '../Firebase/Context';
import { firestore } from 'firebase';
import { Dj, djConverter } from '../Firebase/Converters/DjConverter';
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc';
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres';

import { djsStyles } from './styles/djsStyles'
import GenreChip from '../Components/GenreChip';

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
    const classes = djsStyles();
    const firebase = useContext(FirebaseContext);

    const [djs, setDjs] = useState<Array<Dj>>([])
    const [userLoc, setUserLoc] = useState<firebase.firestore.GeoPoint | null>(null);
    const [inputZip, setInputZip] = useState<string>('');
    const [submitZip, setSubmitZip] = useState<string | null>(null)
    const [genres, setGenres] = useState(new Array<boolean>(GENRES.length).fill(false));

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

    const handleChange = (key: number) => {
        const newGenres = [...genres];
        newGenres[key] = !newGenres[key];
        setGenres(newGenres);
        console.log(genres);
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
                <div className={classes.formControl}>
                    <GenreChip color='#fff' genres={genres} handleClick={handleChange} />
                </div>
                <List className={classes.root}>
                    {djs.sort((a, b) => (a.distance - b.distance)).filter((each) => {
                        return each.genres.some(r => genres[GENRES.indexOf(r)]) || !genres.some(r => r)
                    }).map((value, key) => {
                        return (
                            <div>
                                {key > 0 && <Divider variant="fullWidth" component="li" />}
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
                            </div>

                        )
                    })}
                </List>
            </div>
        </div>
    )
}
