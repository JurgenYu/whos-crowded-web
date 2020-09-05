import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { Grid, Paper, Typography, Button, Input, List, ListItem, ListItemText, Divider, FormControl, InputLabel, Select, MenuItem, Checkbox, Chip } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'
import { Club, clubConverter } from '../Firebase/Converters/ClubConverter'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres'
import NavToMapFab from '../Components/NavToMapFab/NavToMapFab'

import { clubsStyles } from './styles/clubsStyles'
import GenreChip from '../Components/GenreChip'

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: window.screen.height * 0.6,
            width: 360,
            position: 'absolute' as 'absolute',
        },
    },
};


const Clubs: FunctionComponent = () => {
    const classes = clubsStyles();
    const firebase = useContext(FirebaseContext);

    const [clubs, setClubs] = useState<Array<Club>>([])
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
            const newClubs: Club[] = [];
            firebase?.db?.collection('env/prod/clubs')
                .withConverter(clubConverter)
                .get().then((doc) => {
                    doc.forEach(element => {
                        const newClub = element.data()
                        newClub.distance = getDistanceFromLatLonInKm(
                            userLoc.latitude,
                            userLoc.longitude,
                            newClub.point.latitude,
                            newClub.point.longitude);
                        newClub.address = newClub.address.trimEnd();
                        newClub.city = newClub.city.trimEnd();
                        newClubs.push(newClub)
                        console.log(newClub)
                    });
                }).finally(() => {
                    setClubs(c => newClubs)
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

    console.log(clubs)

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
                        <Button endIcon={<SearchIcon />} className={classes.button} type='submit'></Button>
                    </form>
                </Paper>
            </Grid>
            <div style={{ maxWidth: '80%', justifyContent: 'center', display: 'table', margin: 'auto', paddingBottom: "3rem" }}>
                <div className={classes.formControl}>
                    <GenreChip color='#fff' genres={genres} handleClick={handleChange} />
                </div>
                <List className={classes.root}>
                    {clubs.sort((a, b) => (a.distance - b.distance)).filter((each) => {
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
                                                {value.description}
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
                                                    {value.address + ', ' + value.city + ', ' + value.state}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" className={classes.inline} color="textSecondary">
                                                    {'Genres: ' + value.genres.join(' ')}
                                                </Typography>
                                                <br />
                                                <Typography component="span" variant="body2" className={classes.inline} color="textSecondary">
                                                    {'Phone: ' + value.phone}
                                                </Typography>
                                                <br/>
                                                <Typography align='right' component="h1" variant="body2" className={classes.inline} color="textSecondary">
                                                    {'Minimum Age: '+ value.min_age}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    ></ListItemText>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        position: 'relative',
                                        right: '0%',
                                        height: 'auto',
                                        margin: '0 auto',
                                        width: '16rem',
                                        alignContent: 'center'
                                    }}>
                                        {value.point &&
                                            <NavToMapFab
                                                address={value.address}
                                                city={value.city}
                                                state={value.state}
                                                point={value.point}
                                            />}
                                    </div>
                                </ListItem>
                            </div>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}

export default Clubs;
