import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../../Firebase/Context'
import RequestPromoter from './RequestPromoter';
import { Grid, Paper, Box, Card, Button, SvgIcon, Typography } from '@material-ui/core';
import { promoterStyles } from '../styles/promotersStyles'
import partyIcon from '../../images/party.svg';
import crowdIcon from '../../images/crowd.svg';
import djIcon from '../../images/dj.svg';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';


export default function Promoters() {
    const classes = promoterStyles();
    const firebase = useContext(FirebaseContext)
    const userId = firebase?.currentUser?.uid;
    const promoterId = '7L6aIMkAwnQwjjgtR9fA';

    const [onRequest, setOnRequest] = useState<string | null>(null)

    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (userId) {
            firebase?.db?.collection('env/dev/promoter_requests/')
                .where('uid', '==', userId).get().then((doc) => {
                    if (!doc.empty) {
                        setOnRequest(doc.docs[0].get('status'));
                    }
                }).finally(() => { setReady(true); })
        }
    })

    return (
        <div>
            {ready ?
                promoterId ?
                    <Grid container justify='center'>
                        <Paper>
                            <Box display="flex" flexDirection='column' justifyContent='space-between' p={3}>
                                <Button
                                    className={classes.button}
                                    component={Link}
                                    to='/promoters/manageparties'
                                    variant="contained"
                                    disableTouchRipple
                                    startIcon={<img alt='' src={partyIcon}></img>}
                                    endIcon={<KeyboardArrowRightIcon />}
                                >
                                    Your Parties
                        </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    disableTouchRipple
                                    startIcon={<img alt='' src={crowdIcon}></img>}
                                    endIcon={<KeyboardArrowRightIcon />}
                                >
                                    Your CROWDs
                        </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    disableTouchRipple
                                    startIcon={<img alt='' src={djIcon}></img>}
                                    endIcon={<KeyboardArrowRightIcon />}
                                >
                                    Dj Panel
                        </Button>
                            </Box>
                        </Paper>
                    </Grid>
                    : onRequest ? <h1>{onRequest}</h1>

                        : <RequestPromoter />
                : <h1>Please Wait</h1>}
        </div>
    )
}
