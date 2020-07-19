import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { Grid, Paper, Card, GridList, CardHeader, GridListTile, Container, makeStyles, createStyles, Theme, Typography, CardContent, CardMedia, CardActionArea, TextField, Button, Input, FormControl, InputLabel, Select, MenuItem, ListSubheader, Checkbox, ListItemText, Menu, Chip, Divider, Fab } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'
import partyImg from '../images/party-icon-png-21.jpg'
import { Party, partyConverter } from '../Firebase/Converters/PartyConverter'
import { API_KEY } from '../GoogleMaps/GooleMaps'
import { resolve } from 'url'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres'
import PartyPopup from '../Components/PartyPopup/PartyPopup'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            position: 'relative',
            margin: 'auto'
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
        },
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

const Parties: FunctionComponent = () => {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    const [parties, setParties] = useState<Array<Party>>([])
    const [loading, setloading] = useState(true);
    const [userLoc, setUserLoc] = useState<firebase.firestore.GeoPoint | null>(null);
    const [inputZip, setInputZip] = useState<string>('');
    const [submitZip, setSubmitZip] = useState<string | null>(null)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [open, setOpen] = useState(false)
    const [popupParty, setPopupParty] = useState<Party | null>(null)

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

    const today = new Date()

    useEffect(() => {
        if (userLoc) {
            firebase?.db?.collection('env/prod/parties')
                .where('end_time', '>=', today)
                .withConverter(partyConverter)
                .get().then((doc) => {
                    doc.forEach(element => {
                        const newParty = element.data()
                        newParty.distance = getDistanceFromLatLonInKm(
                            userLoc.latitude,
                            userLoc.longitude,
                            newParty.point.latitude,
                            newParty.point.longitude);
                        newParty.address = newParty.address.trimEnd();
                        newParty.city = newParty.city.trimEnd();
                        if (newParty.banner) {
                            firebase?.storage?.ref().child(newParty.banner).getDownloadURL().then((url) => {
                                newParty.banner = url;
                                setParties(p => [...p, newParty])
                            });
                        }
                        else {
                            setParties(p => [...p, newParty])
                        }
                    });
                })
            setloading(false);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(inputZip)
        setSubmitZip(inputZip);
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedGenres(event.target.value as string[]);
    };

    const handleToggle = (p: Party) => {
        setOpen(!open)
        setPopupParty(p);
    }

    const handleClose = () => {
        setOpen(false);
        setPopupParty(null);
    }

    return (
        <div>
            {popupParty && <PartyPopup party={popupParty} open={open} handleClose={handleClose} />}
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
            <div style={{ maxWidth: '80%', display: 'table', margin: '0 auto', paddingBottom: '3rem' }}>
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
                <Grid
                    direction='row'
                    container
                    justify='center'>
                    {!loading &&
                        parties.sort((a, b) => (a.distance - b.distance)).filter((each) => {
                            return each.genres.some(r => (selectedGenres.length > 0 ? selectedGenres : GENRES).indexOf(r) >= 0)
                        }).map((value, key) => {
                            return (
                                <Card key={key} className={classes.card}>
                                    <CardActionArea onClick={() => handleToggle(value)}>
                                        <CardMedia
                                            component='img'
                                            className={classes.media}
                                            src={value.banner}
                                            alt={partyImg}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {value.title}
                                            </Typography>
                                            <Typography variant="body1" color="textPrimary" component="p">
                                                {value.address + ", " + value.city + ", " + value.state}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {value.distance + " Miles"}
                                            </Typography>
                                            <Typography variant="body2" color="textPrimary" component="p">
                                                {value.start_time.toDate().toLocaleString() + ' - ' + value.end_time.toDate().toLocaleString()}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}

export default Parties;
