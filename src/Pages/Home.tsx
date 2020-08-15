import React, { FunctionComponent } from 'react'

//components
import { Paper, makeStyles, createStyles, Theme, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom';

import { homeStyles } from './styles/homeStyles'

const Home: FunctionComponent = () => {
    const classes = homeStyles();
    console.log(1)
    return (
        <React.Fragment>
            <Grid container justify='center'>
                <Paper className={classes.root}>
                    <div style={{
                        margin: '1rem 3rem'
                    }}>
                        <h1>#1 Party App</h1>
                        <span>WhosCROWDED helps users find parties by using location services to boost night life experiences. The app's overall vision is to bring together partygoers and party organizers in a closer, unique, and enjoyable way.</span>
                        <br />
                        <a href='https://apps.apple.com/us/app/whoscrowded/id1474831057?ls=1'>App Store</a>
                        <br />
                        <a href='https://play.google.com/store/apps/details?id=drakoapps.com.whos_crowded_app'>Goole Store</a>
                    </div>
                    <div style={{
                        paddingBottom: '2rem',
                        backgroundColor: '#ddd'
                    }}>
                        <div style={{
                            margin: "1rem 3rem 0"
                        }}>
                        <h1>Become a Promoter</h1>
                        <span>As a WhosCROWDED promoter you will gain access to the Promoter Mode. Promoter Mode will allow you to add Parties and create CROWDs. Notification of your public parties will be sent to all WhosCROWDED
                        users in a 250 mile radius. Notification of your private parties will be sent to people in your CROWDs. So become a promoter and get your parties CROWDED.
To become a promoter make a request using the WhosCROWDED app or email promoters@whoscrowded.com.</span>
                        </div>

                    </div>
                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default Home;
