import React from 'react'
import { Party } from '../../Firebase/Converters/PartyConverter'
import { makeStyles, createStyles, Theme, Backdrop, CircularProgress, Card, CardActionArea, CardMedia, Typography, Divider, CardContent, Paper } from '@material-ui/core';
import partyImg from '../../images/party-icon-png-21.jpg'

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
            display: 'flex',
            flexDirection: 'row',
            margin: '1.5rem 1rem',
            borderRadius: '0.4rem',
            width: 'auto',
            backgroundColor: '#fff',
            marginBottom: '1.5rem',
        },
    }),
);

export default function PartyPopup({ party, open, handleClose }: partyPopupProps) {
    const classes = useStyles();
    return (
        <div>
            <Backdrop transitionDuration={250} className={classes.backdrop} open={open} onClick={handleClose}>
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
                        <Typography variant="body1" color="textPrimary" component="p">
                            {party.address + ", " + party.city + ", " + party.state}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {party.distance + " Miles"}
                        </Typography>
                        <Divider  />
                        <Typography variant="h6" color="textPrimary" component="h3">
                            {'Start: ' + party.start_time.toDate().toLocaleString()}
                        </Typography>
                        <Typography variant="h6" color="textPrimary" component="h3">
                            {'End: ' + party.end_time.toDate().toLocaleString()}
                        </Typography>
                        <Divider  />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {party.genres.join(' ')}
                        </Typography>
                    </div>
                </Paper>
            </Backdrop>
        </div>
    )
}
