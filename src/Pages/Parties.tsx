import React, { FunctionComponent, useContext, useState, useEffect } from 'react'
import { Grid, Paper, Card, GridList, CardHeader, GridListTile, Container, makeStyles, createStyles, Theme, Typography, CardContent, CardMedia, CardActionArea } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context'
import partyImg from '../images/party-icon-png-21.jpg'

type Party = {
    address: string,
    banner: string,
    city: string,
    crowdid: string,
    description: string,
    end_time: firebase.firestore.Timestamp,
    genres: Array<string>,
    point: firebase.firestore.GeoPoint,
    promoterid: string,
    start_time: firebase.firestore.Timestamp,
    state: string,
    title: string,
    zip: string | number
}

const partyConverter = {
    toFirestore: (party: Party): firebase.firestore.DocumentData => {
        return {
            address: party.address,
            banner: party.banner,
            city: party.city,
            crowdid: party.crowdid,
            description: party.description,
            end_time: party.end_time,
            genres: party.genres,
            point: party.point,
            promoterid: party.promoterid,
            start_time: party.start_time,
            state: party.state,
            title: party.title,
            zip: party.zip
        }
    },
    fromFirestore: (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Party => {
        const data = snapshot.data(options);
        return {
            address: data.address,
            banner: data.banner,
            city: data.city,
            crowdid: data.crowdid,
            description: data.description,
            end_time: data.end_time,
            genres: data.genres,
            point: data.point,
            promoterid: data.promoterid,
            start_time: data.start_time,
            state: data.state,
            title: data.title,
            zip: data.zip
        }
    }
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            position: 'relative',
            backgroundColor: 'transparent',
        },
        gridList: {
            width: '70%',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        media: {
            height: 140,
            width: 270
        },
        card: {
            margin: '0 auto',
        }
    })
)

const Parties: FunctionComponent = () => {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext);

    const [parties, setParties] = useState<Array<Party>>([])

    useEffect(() => {
        if (parties.length === 0) {
            firebase?.db?.collection('env/prod/parties')
                .withConverter(partyConverter)
                .get().then((doc) => {
                    doc.forEach(element => {
                        parties.push(element.data())
                    });
                }).finally(() => setParties([...parties]))
        }

    });

    parties.map((value)=> {
        if (value.title === 'Blowing Money Fast') {
            console.log(value);
        }
    })

    return (
        <div>
            {parties.length !== 0 ?
                <div className={classes.root}>
                    <GridList cols={4} cellHeight={200} spacing={3} className={classes.gridList}>
                        {parties.map((value, key) => {
                            return (
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={value.banner? value.banner:partyImg}
                                        />
                                        <CardContent>
                                            <Typography>
                                                {value.description}
                                            </Typography>
                                            <Typography>
                                                {value.address}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        }
                        )}
                    </GridList>
                </div>
                :
                <span>Loading...</span>}

        </div>
    )
}

export default Parties;
