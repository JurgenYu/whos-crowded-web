import React, { useState } from 'react';
import './NavBar.css'

import UserAvatar from '../UserAvatar/UserAvatar'

import Button from '@material-ui/core/Button';
import { Redirect, Link } from 'react-router-dom';
import { styled, Grid, Breadcrumbs, Typography } from '@material-ui/core';
import Header from '../../images/whos_crowded_header.png'

const StyledButton = styled(Button)({
    color: '#fff',
    borderColor: '#c8c8c8',
    width: '4.5rem',
    '&:hover': {
        borderColor: "#fff",
    },
    marginRight: '1.25rem',
    marginLeft: '1.25rem',
    outlineColor: '#c8c8c8',
    backgroundColor: 'transparent',
})

export default function NavBar() {

    const [redirect, setRedirect] = useState(false);
    const [tarUrl, settarUrl] = useState('');
    const [pathName, setPathName] = useState(window.location.pathname)

    const handleClick = (target: string) => {
        setRedirect(true);
        settarUrl(target);
        setPathName(target)

        const isPromoter = window.location.pathname.includes('promoters')

        setTimeout(() => {
            setRedirect(false);
            settarUrl('');
        }, 50)
    }

    return (
        <React.Fragment>
            {redirect && <Redirect to={tarUrl} />}
            <div className='nav-bar-container'>
                <div className='nav-header'>
                    <img width='90%' src={Header} alt="Broken"></img>
                </div>
                <div className='nav-avatar'>
                    <UserAvatar onClick={handleClick} />
                    <Breadcrumbs style={{ margin: '1rem 3rem', color: '#fff' }} aria-label="breadcrumb">
                        <Link style={{
                            textDecoration: 'none',
                            color: "#fff"
                        }} onClick={() => handleClick('/promoters')} to="/promoters">
                            Promoter Console
                        </Link>
                    </Breadcrumbs>
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

