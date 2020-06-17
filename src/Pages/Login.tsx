import React, { useState } from 'react'

//Components
import TabPanel from '../Components/TabPanel/TabPanel'
import NavBar from '../Components/NavBar/NavBar'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, createStyles, Paper, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles(
    {
        grid: {
            paddingTop: '7rem'
        }
    }
))

export default function Login() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    let [inputEmail, setInputEmail] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const updateInputEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
        setInputEmail(event.target.value);
    }

    const buttonClickHandler = (event:React.FormEvent) => {
        event.preventDefault();
        console.log(inputEmail);
    }

    return (
        <React.Fragment>
            <NavBar />
            <Grid container justify='center' className={classes.grid}>
                <Paper>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab label="Loggin with Email" />
                        <Tab label="Loggin wtih Google" />
                        <Tab label="Login with Facebook" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
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

                            <Button type='submit'>Login</Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Paper>
            </Grid>

        </React.Fragment>
    )
}
