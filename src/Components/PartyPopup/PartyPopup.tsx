import React, { useContext, useState } from 'react'
import { Party } from '../../Firebase/Converters/PartyConverter'
import { makeStyles, createStyles, Theme, Backdrop, CircularProgress, Card, CardActionArea, CardMedia, Typography, Divider, CardContent, Paper, Fab, Grid, Button } from '@material-ui/core';
import partyImg from '../../images/party-icon-png-21.jpg'
import { Link } from 'react-router-dom';
import NavToMapFab from '../NavToMapFab/NavToMapFab';
import FirebaseContext from '../../Firebase/Context';


export interface partyPopupProps {
    party: Party,
    open: boolean,
    handleClose: () => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        media: {
            height: '45rem',
            width: 'auto',
        },
        card: {
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            margin: '1.5rem 1rem',
            borderRadius: '2rem',
            width: 'auto',
            backgroundColor: '#fff',
            marginBottom: '1.5rem',
        },
    }),
);

export default function PartyPopup({ party, open, handleClose }: partyPopupProps) {
    const classes = useStyles();
    const firebase = useContext(FirebaseContext)
    const db = firebase?.db;

    const [promoter, setPromoter] = useState<string|null>(null)

    // useEffect(() => {
    //     if (party.promoterid)
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    return (
        <div>
            <Backdrop transitionDuration={250} className={classes.backdrop} open={open} onClick={handleClose}>
                <Grid container justify='center'>
                    <Paper onClick={e => e.stopPropagation()} className={classes.card}>
                        <img className={classes.media} src={party.banner} alt={partyImg}></img>
                        <div style={{
                            margin: '2rem 2rem'
                        }}>
                            <Typography gutterBottom variant="h4" component="h4">
                                {party.title}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                {party.description}
                            </Typography>
                            <Divider light />
                            <Typography gutterBottom variant="h5" component="h2">
                                {party.promoterid}
                            </Typography>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {party.address + ", " + party.city + ", " + party.state}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {party.distance + " Miles"}
                            </Typography>
                            <Divider />
                            <Typography variant="h6" color="textPrimary" component="h3">
                                {'Start: ' + party.start_time.toDate().toLocaleString()}
                            </Typography>
                            <Typography variant="h6" color="textPrimary" component="h3">
                                {'End: ' + party.end_time.toDate().toLocaleString()}
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {party.genres.join(' ')}
                            </Typography>
                            <div style={{
                                margin: '1rem auto'
                            }}>
                                {party.point &&
                                    <NavToMapFab
                                        address={party.address}
                                        city={party.city}
                                        state={party.state}
                                        point={party.point}
                                    />}
                                <br/>
                                <Button variant='contained' href='/djprofile'> Promoter of This Party</Button>
                            </div>
                        </div>
                    </Paper>
                </Grid>
            </Backdrop>
        </div>
    )
}
