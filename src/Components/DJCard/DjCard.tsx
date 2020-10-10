import React from 'react'

import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Icon, IconButton, Typography } from '@material-ui/core'

import clubIcon from '../../images/club.svg'
import useStyles from './styles'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone';
import CheckIcon from '@material-ui/icons/Check'
import { Dj } from '../../Firebase/Converters/DjConverter'
import DjIcon from '../../images/dj.svg';

interface DjCardProps {
    value: Dj,
    key: number,
}

export default function DjCard(props: DjCardProps) {
    const { value, key } = props;
    const classes = useStyles()
    return (
        <div>
            <Card key={key} className={classes.card}>
                    <Grid container>
                        <CardMedia
                            component='img'
                            className={classes.media}
                            src={DjIcon}
                            alt={DjIcon}
                        />
                        <Grid container direction='column' className={classes.genreList}>
                            {value.genres.slice(0, 3).map((value, key) => {
                                return (
                                    <div>
                                        <small key={key} className={classes.genre}>{value}</small>
                                    </div>
                                )
                            })}
                            {value.genres.length > 5 && <div>
                                <small key={key} className={classes.genre}>More...</small>
                            </div>}
                        </Grid>
                    </Grid>
                    <CardContent>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography style={{ wordBreak: 'break-word' }} gutterBottom variant="h6" component="p">
                                {value.name}
                            </Typography>
                            <Typography style={{ wordBreak: 'break-word' }} color="textSecondary" gutterBottom variant="body2" component="p">
                                {value.about}
                            </Typography>
                            <br/>
                            <Grid spacing={2} md container direction='row' alignContent='center'>
                                <Grid item>
                                    <Avatar>
                                        <IconButton target="_blank"
                                            href={"https://www.google.com/maps/search/?api=1&query=" +
                                                encodeURIComponent(value.city + ", " + value.state)}>
                                            <LocationOnIcon />
                                        </IconButton>
                                    </Avatar>
                                </Grid>
                                <Grid item style={{ maxWidth: '9rem' }}>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        {value.city + ", " + value.state}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {value.distance + " Miles"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid spacing={2} md container direction='row' alignContent='center'>
                                <Grid item>
                                    <Avatar>
                                        <PhoneIcon />
                                    </Avatar>
                                </Grid>
                                <Grid item style={{ maxWidth: '9rem' }}>
                                    <Typography variant="body1" className={classes.inline} color="textPrimary">
                                        {'Phone'}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {value.phone}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>
                    </CardContent>
            </Card>
        </div>
    )
}



