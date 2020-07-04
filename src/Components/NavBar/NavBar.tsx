import React, { useState } from 'react';
import './NavBar.css'

import UserAvatar from '../UserAvatar/UserAvatar'

import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { styled, Grid } from '@material-ui/core';

const StyledButton = styled(Button)({
    marginRight: '1.25rem',
    marginLeft: '1.25rem',
    outlineColor: '#c8c8c8',
    backgroundColor: 'transparent',
})

export default function NavBar() {

    const [redirect, setRedirect] = useState(false);
    const [tarUrl, settarUrl] = useState('');

    let pathName = window.location.pathname;

    const handleClick = (target: string) => {
        setRedirect(true);
        settarUrl(target);

        setTimeout(() => {
            setRedirect(false);
            settarUrl('');
        }, 50)
    }

    return (
        <React.Fragment>
            {redirect && <Redirect to={tarUrl} />}
            <div className='nav-bar-container'>
                <div className='nav-avatar'>
                    <UserAvatar onClick={handleClick} />
                </div>
                <div className="nav-bar-items">
                    <Grid container justify='center'>
                        <StyledButton
                            variant={pathName === '/home' ? 'outlined' : 'text'}
                            disableElevation
                            onClick={() => handleClick('/home')}
                        >
                            Home
                    </StyledButton>
                        <StyledButton
                            variant={pathName === '/parties' ? 'outlined' : 'text'}
                            disableElevation
                            onClick={() => handleClick('/parties')}
                        >
                            Parties
                    </StyledButton>
                        <StyledButton
                            variant={pathName === '/clubs' ? 'outlined' : 'text'}
                            disableElevation
                            onClick={() => handleClick('/clubs')}
                        >
                            Clubs
                    </StyledButton>
                        <StyledButton
                            variant={pathName === '/djs' ? 'outlined' : 'text'}
                            disableElevation
                            onClick={() => handleClick('/djs')}
                        >
                            Djs
                    </StyledButton>
                        <StyledButton
                            variant={pathName === '/crowds' ? 'outlined' : 'text'}
                            disableElevation
                            onClick={() => handleClick('/crowds')}
                        >
                            CROWDs
                    </StyledButton>
                    </Grid>
                </div>
            </div>
        </React.Fragment>

    )
}

