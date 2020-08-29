import React, { FunctionComponent, useContext, useState, useEffect } from 'react'

import FirebaseContext from '../Firebase/Context'

import { Party, partyConverter } from '../Firebase/Converters/PartyConverter'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres'
import PartyPopup from '../Components/PartyPopup/PartyPopup'
import { partyStyles } from './styles/partiesStyles'

import { Grid, Paper, Card, Typography, CardContent, CardMedia, CardActionArea, Button, Input, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip, } from '@material-ui/core'
import PartyCard from '../Components/PartyCard/PartyCard'

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
    const classes = partyStyles();
    const firebase = useContext(FirebaseContext);

    const [parties, setParties] = useState<Array<Party>>([])
    const [loading, setloading] = useState(true);
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

    const today = new Date()
    today.setDate(18);

    useEffect(() => {
        if (userLoc) {
            firebase?.db?.collection('env/prod/parties')
                .where('end_time', '>=', today)
                .withConverter(partyConverter)
                .get().then((doc) => {
                    doc.forEach(async element => {
                        const newParty = element.data()
                        newParty.distance = getDistanceFromLatLonInKm(
                            userLoc.latitude,
                            userLoc.longitude,
                            newParty.point.latitude,
                            newParty.point.longitude);
                        newParty.address = newParty.address.trimEnd();
                        newParty.city = newParty.city.trimEnd();
                        if (newParty.banner) {
                            await firebase?.storage?.ref().child(newParty.banner).getDownloadURL().then((url) => {
                                newParty.banner = url;
                            });
                        }
                        setParties(p => [...p, newParty])
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
                                <PartyCard party={value} key={key} />
                            )
                        })
                    }
                </Grid>
            </div>
        </div>
    )
}

export default Parties;
