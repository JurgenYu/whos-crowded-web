import React, { useState, FunctionComponent } from 'react'

//UI Components
import TabPanel from '../Components/TabPanel/TabPanel'
import NavBar from '../Components/NavBar/NavBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles(
    {
        grid: {
            paddingTop: '7rem'
        }
    }
))

const Login: FunctionComponent = () => {
    const classes = useStyles();
    const [pageIndex, setpageIndex] = useState(0);

    let [inputEmail, setInputEmail] = useState('');
    let [passwd, setPasswd] = useState('');

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setpageIndex(newValue);
    };

    const updateInputEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
    }

    const updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswd(event.target.value);
    }

    const buttonClickHandler = (event: React.FormEvent) => {
        event.preventDefault();
        console.log(inputEmail);
    }

    return (
        <React.Fragment>
            <NavBar />
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
                            <form noValidate onSubmit={buttonClickHandler}>
                                <TextField
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email Address"
                                    helperText={'Something wrong'}
                                    value={inputEmail}
                                    onChange={updateInputEmail}
                                    fullWidth
                                />
                                <TextField
                                    id="passwd"
                                    name="passwd"
                                    type="password"
                                    label="Password"
                                    helperText={'Something wrong'}
                                    value={passwd}
                                    onChange={updatePassword}
                                    fullWidth
                                />

                                <Button type='submit'>Login</Button>
                            </form>
                            
                        </TabPanel>
                        <TabPanel value={pageIndex} index={1}>
                            Item Two
                    </TabPanel>
                        <TabPanel value={pageIndex} index={2}>
                            Item Three
                    </TabPanel>
                    </Paper>
                </Grid>
            </div>
        </React.Fragment>
    )
}

export default Login;
