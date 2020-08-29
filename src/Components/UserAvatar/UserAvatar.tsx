import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, IconButton } from '@material-ui/core';
import FirebaseContext from '../../Firebase/Context';

const useAvatarStyles = makeStyles({
    avatar: {
        width: '56px',
        height: '56px',
        color: '##fff',
        backgroundColor: '#fff',
    },
    button: {
        width: '56px',
        height: '56px',
        margin: '0 auto',
        borderRadius: '28px',
        backgroundColor: 'tansparent',
        color: '#616161',
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },
    iconButton: {
        width: '56px',
        height: '56px',
        borderRadius: '28px',
    },
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

    const handleClose = (target: string | null) => {
        setAnchorEl(null);
        if (target) {
            onClick(target);
        }
    };

    const handleLogout = () => {
        firebase?.userSignOut();
        onClick('./');
    }

    return (
        <div>
            {isLoggedin ?
                <div>
                    <IconButton disableRipple onClick={handleClick} className={classes.iconButton}>
                        <Avatar
                            src={photoUrl ? photoUrl : undefined}
                            alt={userName ? userName : 'Menus'}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            className={classes.avatar}>
                        </Avatar>
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose(null)}
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