import React, { useState } from 'react'
import { Party } from '../../Firebase/Converters/PartyConverter'
import { Card, Typography, CardContent, CardMedia, CardActionArea, makeStyles, createStyles, Theme, } from '@material-ui/core'
import partyImg from '../../images/party-icon-png-21.jpg'
import PartyPopup from '../PartyPopup/PartyPopup'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
                        <Typography variant="body1" color="textPrimary" component="p">
                            {party.address + ", " + party.city + ", " + party.state}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {party.distance + " Miles"}
                        </Typography>
                        <Typography variant="body2" color="textPrimary" component="p">
                            {party.start_time.toDate().toLocaleString() + ' - ' + party.end_time.toDate().toLocaleString()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}
