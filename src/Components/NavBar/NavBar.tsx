import React from 'react';
import './NavBar.css'

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';


const useAvtarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginTop: '-0.8rem',
            marginRight: '3rem',
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    }),
);

const buttonTheme = createMuiTheme({
    overrides: {
        MuiButton: {
            text: {
                color: 'white'
            }
        }
    }
})

const buttonClickHandler = (buttonIndex: string) => {
    return (<Redirect to={buttonIndex} />)
}

export default function NavBar() {

    const avtarClasses = useAvtarStyles();

    return (
        <React.Fragment>
            <div className='nav-bar-container'>
                <div className="nav-bar-items">
                    <ul>
                        <li>
                            <a href='./login' style={{ textDecorationLine: 'none' }}>
                                <Avatar className={avtarClasses.root}>Login</Avatar>
                            </a>
                        </li>
                        <ThemeProvider theme={buttonTheme}>
                            <li>
                                <Button href='./'>Home</Button>
                            </li>
                            <li>
                                <Button href='./'>Parties</Button>
                            </li>
                            <li>
                                <Button href='./'>Clubs</Button>
                            </li>
                            <li>
                                <Button href='./'>Djs</Button>
                            </li>
                            <li>
                                <Button href='./'>CROWDs</Button>
                            </li>
                        </ThemeProvider>

                    </ul>
                </div>
            </div>
        </React.Fragment>

    )
}

