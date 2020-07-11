import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core';
import FirebaseContext from '../../Firebase/Context';

const useAvatarStyles = makeStyles({
    avatar: {
        width: '56px',
        height: '56px',
        color: '#212121'
    },
    button: {
        width: '56px',
        height: '56px',
        margin: '0 auto',
        borderRadius: '28px',
        backgroundColor: '#f5f5f5',
        color: '#616161',
        "&:hover": {
            backgroundColor: '#e0e0e0'
        }
    }
});

interface UserAvatarProps {
    onClick: (target: string) => void
}

export default function UserAvatar(props: UserAvatarProps) {
    const { onClick } = props;

    const classes = useAvatarStyles();
    const firebase = useContext(FirebaseContext);

    const isLoggedin = firebase?.currentUser !== null;

    const photoUrl = firebase?.currentUser?.photoURL;
    const userName = firebase?.currentUser?.displayName;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (target: string) => {
        setAnchorEl(null);
        onClick(target);
    };

    const handleLogout = () => {
        firebase?.userSignOut();
        onClick('./');
    }

    return (
        <div>
            {isLoggedin ?
                <div>
                    <Button disableRipple onClick={handleClick} className={classes.button}>
                        <Avatar
                            src={photoUrl ? photoUrl : undefined}
                            alt={userName ? userName : 'Menus'}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            className={classes.avatar}>
                        </Avatar>
                    </Button>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleClose('./userprofile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleClose('./userprofile')}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </div> :
                <div>
                    <Avatar className={classes.avatar}>
                        <Button className={classes.button} onClick={() => handleClose('/login')}>
                            Login
                        </Button>
                    </Avatar>
                </div>
            }

        </div>
    );
}