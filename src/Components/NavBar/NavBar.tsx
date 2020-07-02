import React, { useState } from 'react';
import './NavBar.css'

import UserAvatar from '../UserAvatar/UserAvatar'

import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { styled } from '@material-ui/core';

const StyledButton = styled(Button)({
    marginRight:'1.25rem',
    marginLeft:'1.25rem'
})

export default function NavBar() {

    const [redirect, setRedirect] = useState(false);
    const [tarUrl, settarUrl] = useState('');

    const handleClick = (target:string) => {
        setRedirect(true);
        settarUrl(target);

        setTimeout(()=>{
            setRedirect(false)
            settarUrl('');
        }, 50)
    }

    return (
        <React.Fragment>
            {redirect && <Redirect to={tarUrl}/>}
            <div className='nav-bar-container'>
                <div className='nav-avatar'>
                    <UserAvatar />
                </div>
                <div className="nav-bar-items">
                        <StyledButton onClick={()=>handleClick('./')}>Home</StyledButton>
                        <StyledButton onClick={()=>handleClick('./')}>Parties</StyledButton>
                        <StyledButton onClick={()=>handleClick('./')}>Clubs</StyledButton>
                        <StyledButton onClick={()=>handleClick('./')}>Djs</StyledButton>
                        <StyledButton onClick={()=>handleClick('./')}>CROWDs</StyledButton>
                </div>
            </div>
        </React.Fragment>

    )
}

