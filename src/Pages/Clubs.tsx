import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { Grid, Paper, Card, GridList, CardHeader, GridListTile, Container, makeStyles, createStyles, Theme, Typography, CardContent, CardMedia, CardActionArea, TextField, Button, Input, List, ListItem, ListItemText, ListItemAvatar, Divider, Avatar, FormControl, InputLabel, Select, MenuItem, Checkbox, Chip } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'
import partyImg from '../images/party-icon-png-21.jpg'
import { Club, clubConverter } from '../Firebase/Converters/ClubConverter'
import { API_KEY } from '../GoogleMaps/GooleMaps'
import { resolve } from 'url'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres'

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


const Clubs: FunctionComponent = () => {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    const [clubs, setClubs] = useState<Array<Club>>([])
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

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedGenres(event.target.value as string[]);
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
                    {clubs.sort((a, b) => (a.distance - b.distance)).filter((each) => {
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

export default Clubs;
