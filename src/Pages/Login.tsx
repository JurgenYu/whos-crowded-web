import React, { useState, FunctionComponent, useContext } from 'react'
import { Redirect } from 'react-router-dom'

//firebase Components
import FirebaseContext from '../Firebase/Context'

import WithEmailAndPasswd from '../Components/LoginForm/WithEmailAndPasswd'
import WithGoogle from '../Components/LoginForm/WithGoole'

//UI Components
import TabPanel from '../Components/TabPanel/TabPanel'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles, Paper } from '@material-ui/core';
import WithFacebook from '../Components/LoginForm/WithFacebook'

const useStyles = makeStyles((theme: Theme) => createStyles({ grid: { paddingTop: '3rem' } }));

const Login: FunctionComponent = () => {
    const firebase = useContext(FirebaseContext);
    const redirect = firebase?.currentUser !== null;
    const classes = useStyles();
    const [pageIndex, setpageIndex] = useState(0);
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setpageIndex(newValue);
    };

    return (
        <React.Fragment>
            {redirect && <Redirect to='./home'/>}
            <div>
                <Grid container justify='center' className={classes.grid}>
                    <Paper>
                        <Tabs
                            value={pageIndex}
                            onChange={handleTabChange}
                            aria-label="simple tabs example"
                        >
                            <Tab label="Loggin with Email" />
                            <Tab label="Loggin wtih Google" />
                            <Tab label="Login with Facebook" />
                        </Tabs>
                        <TabPanel value={pageIndex} index={0}>
                            <WithEmailAndPasswd />
                        </TabPanel>
                        <TabPanel value={pageIndex} index={1}>
                            <WithGoogle/>
                    </TabPanel>
                        <TabPanel value={pageIndex} index={2}>
                            <WithFacebook/>
                    </TabPanel>
                    </Paper>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Login;
