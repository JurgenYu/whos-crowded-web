import React, { useState } from 'react'
import { Party } from '../../Firebase/Converters/PartyConverter'
import { Card, Typography, CardContent, CardMedia, CardActionArea, makeStyles, createStyles, Theme, Avatar, Grid, Divider, } from '@material-ui/core'
import partyImg from '../../images/party-icon-png-21.jpg'
import PartyPopup from '../PartyPopup/PartyPopup'
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {formatDistanceToNow} from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: '26rem',
            width: '26rem',
        },
        card: {
            margin: '1.5rem 1rem',
            borderRadius: '1.7rem',
            padding: '0px',
            width: '26rem',
            backgroundColor: '#fff',
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        },
    })
)

interface partyCardProps {
    party: Party,
    key: number
}

export default function PartyCard(props: partyCardProps) {
    const [open, setOpen] = useState(false)
    const [popupParty, setPopupParty] = useState<Party | null>(null)

    const handleToggle = (p: Party) => {
        setOpen(!open)
        setPopupParty(p);
    }

    const handleClose = () => {
        setOpen(false);
        setPopupParty(null);
    }


    const classes = useStyles();
    const { party, key } = { ...props };
    return (
        <div>
            {popupParty && <PartyPopup party={popupParty} open={open} handleClose={handleClose} />}
            <Card key={key} className={classes.card}>
                <CardActionArea onClick={() => handleToggle(party)}>
                    <CardMedia
                        component='img'
                        className={classes.media}
                        src={party.banner}
                        alt={partyImg}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {party.title}
                        </Typography>
                        <div style={{marginTop: '1rem',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                            <Grid spacing={2}  md container direction='row' alignContent='center'>
                                <Grid item>
                                    <Avatar>
                                        <LocationOnIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        {party.address + ", " + party.city + ", " + party.state}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {party.distance + " Miles"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <div style={{margin: '0.5rem'}}></div>
                            <Grid spacing={2} container direction='row' alignContent='center'>
                                <Grid item>
                                    <Avatar>
                                        <EventIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        {party.start_time.toDate().toLocaleString()}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {'In ' + formatDistanceToNow(party.start_time.toDate())}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
