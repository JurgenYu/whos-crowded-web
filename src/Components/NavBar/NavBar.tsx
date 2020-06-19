import React from 'react';
import './NavBar.css'

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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
                        <div>
                            <Link style={{textDecorationLine:'none'}} to='./login'>
                                <Avatar className={avtarClasses.root}>Login</Avatar>
                            </Link>

                        </div>
                        <ThemeProvider theme={buttonTheme}>
                            <div>
                                <Button component={Link} to='./'>Home</Button>
                                <Button component={Link} to='./'>Parties</Button>
                                <Button component={Link} to='./'>Clubs</Button>
                                <Button component={Link} to='./'>Djs</Button>
                                <Button component={Link} to='./'>CROWDs</Button>
                            </div>
                        </ThemeProvider>
                </div>
            </div>
        </React.Fragment>

    )
}

