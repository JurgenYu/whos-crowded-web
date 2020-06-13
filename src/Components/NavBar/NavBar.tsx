import React from 'react';
import './NavBar.css'

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const partierButtons = ['Home', 'Parties', 'Clubs', 'Djs', 'CROWDs'];

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

export default function NavBar() {

    const avtarClasses = useAvtarStyles();

    return (
        <React.Fragment>
            <div className='nav-bar-container'>
                <div className="nav-bar-items">
                    <ul>
                        <a href='./login' style={{textDecorationLine: 'none'}}>
                        <Avatar className={avtarClasses.root}>Login</Avatar>
                        </a>
                        {partierButtons.map(each => (
                            <li>
                                <ThemeProvider theme={buttonTheme}>
                                    <Button>{each}</Button>
                                </ThemeProvider>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </React.Fragment>

    )
}

