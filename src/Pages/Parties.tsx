import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { Grid, Paper, Card, GridList, CardHeader, GridListTile, Container, makeStyles, createStyles, Theme, Typography, CardContent, CardMedia, CardActionArea, TextField, Button } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'
import partyImg from '../images/party-icon-png-21.jpg'
import { Party, partyConverter } from '../Firebase/Converters/PartyConverter'
import { API_KEY } from '../GoogleMaps/GooleMaps'
import { resolve } from 'url'
import { firestore } from 'firebase'
import { getDistanceFromLatLonInKm } from '../Util/DistanceCalc'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            // display: 'flex',
            // // flexWrap: 'wrap',
            // justifyContent: 'space-around',
            // overflow: 'hidden',
            // position: 'relative',
            maxWidth: '60%',
            backgroundColor: 'transparent',
        },
        gridList: {
            width: '70%',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        media: {
            height: 450,
            width: 450,
        },
        card: {
            margin: 'auto',
            width: 450,
            marginTop: '2rem',
            backgroundColor: '#fff',
            marginBottom: '2rem',
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        }
    })
)

console.log(1)

const Parties: FunctionComponent = () => {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    const [parties, setParties] = useState<Array<Party>>([])
    const [loading, setloading] = useState(true);
    const [userLoc, setUserLoc] = useState<firebase.firestore.GeoPoint | null>(null);
    const [inputZip, setInputZip] = useState<string>('');
    const [submitZip, setSubmitZip] = useState<string | null>(null)

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
                .where('end_time', '>', today)
                .withConverter(partyConverter)
                .get().then((doc) => {
                    doc.forEach(element => {
                        const newParty = element.data()
                        newParty.distance = getDistanceFromLatLonInKm(userLoc.latitude, userLoc.longitude, newParty.point.latitude, newParty.point.longitude);
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
                    setUserLoc(new firestore.GeoPoint(res[0].geometry.location.lat(), res[0].geometry.location.lng()))
                }
            })
        }
    }, [submitZip])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(inputZip)
        setSubmitZip(inputZip);
    }

    return (
        <div style={{ width: '70%', display: 'table', margin: '0 auto' }}>
            <Grid container justify='center'>
                {userLoc ? !loading &&
                    parties.sort((a, b) => (a.distance - b.distance)).map((value, key) => {
                        return (
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        height='300'
                                        component='img'
                                        className={classes.media}
                                        src={value.banner}
                                        alt={partyImg}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {value.description}
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" component="p">
                                            {value.address +", " + value.city + ", " + value.state}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {value.distance + " Miles"}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                    :
                    <Paper>
                        <form noValidate onSubmit={handleSubmit}>
                            <TextField
                                id="zip"
                                name="zip"
                                type="zip"
                                label="Your Postal code"
                                value={inputZip}
                                onChange={(e) => { setInputZip(e.target.value) }}
                                fullWidth
                            />
                            <Button type='submit'>lol</Button>
                        </form>
                    </Paper>
                }

            </Grid>
        </div>
    )
}

export default Parties;
