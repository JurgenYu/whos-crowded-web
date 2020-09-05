import React, { FunctionComponent, useContext, useState, useEffect } from 'react'

import FirebaseContext from '../Firebase/Context'

import { Party, partyConverter } from '../Firebase/Converters/PartyConverter'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'
import SearchIcon from '@material-ui/icons/Search';
import { GENRES } from '../Util/Genres'
import PartyPopup from '../Components/PartyPopup/PartyPopup'
import { partyStyles } from './styles/partiesStyles'

import { Grid, Paper, Card, Typography, CardContent, CardMedia, CardActionArea, Button, Input, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Chip, GridList, GridListTile, } from '@material-ui/core'
import PartyCard from '../Components/PartyCard/PartyCard'
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

const Parties: FunctionComponent = () => {
    const classes = partyStyles();
    const firebase = useContext(FirebaseContext);

    const [parties, setParties] = useState<Array<Party>>([])
    const [loading, setloading] = useState(true);
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

    const today = new Date()

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

    const handleChange = (key: number) => {
        const newGenres = [...genres];
        newGenres[key] = !newGenres[key];
        setGenres(newGenres);
        console.log(genres);
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
                        <Button endIcon={<SearchIcon />} className={classes.button} type='submit'></Button>
                    </form>
                </Paper>
            </Grid>
            <div style={{
                maxWidth: '75%', 
                display: 'flex',
                paddingRight: '16rem',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-evenly', margin: '0 auto', paddingBottom: '3rem'
            }}>
                <div className={classes.formControl}>
                    <GenreChip color='#fff' genres={genres} handleClick={handleChange}/>
                </div>
                {!loading &&
                    parties.sort((a, b) => (a.distance - b.distance)).filter((each) => {
                        return each.genres.some(r => genres[GENRES.indexOf(r)]) || !genres.some(r=>r)
                    }).map((value, key) => {
                        return (
                            <PartyCard party={value} key={key} />

                        )
                    })
                }
            </div>
        </div>
    )
}

export default Parties;
