import React, { useContext } from 'react'
import { makeStyles, Grid, Paper, Card, CardMedia, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import FirebaseContext from '../Firebase/Context';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles({
    root: {
        width: "45rem",
        height: "31rem",
        borderRadius: "1.7rem",
        justifyContent: "center",
    },
    avatar: {
        width: "10rem",
        height: "10rem",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        color: "#000",
        position: "relative",
        margin: "0 auto",
        marginTop: "-7rem"
    },
    userName: {
        margin: "0 autp",
        textAlign: "center",
        marginTop: "1rem",
        marginBottom: "1rem",

    }
})

export default function UserProfile() {
    const classes = useStyles();

    const firebase = useContext(FirebaseContext);
    const photoUrl = firebase?.currentUser?.photoURL;
    const userName = firebase?.currentUser?.displayName;
    const email = firebase?.currentUser?.email;
    const phone = firebase?.currentUser?.phoneNumber;

    return (
        <div>
            <Grid container justify="center">
                <Paper className={classes.root}>
                    <div style={{
                        height: "10rem",
                        backgroundColor: "#42A5F5",
                        borderRadius: "1.7rem 1.7rem 0 0",
                    }}></div>
                    <Avatar
                        src={photoUrl ? photoUrl : undefined}
                        alt={userName ? userName : 'Menus'}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        className={classes.avatar}
                    >
                    </Avatar>
                    <Typography
                        color="textPrimary"
                        className={classes.userName}
                        variant='h4'>
                        {userName ? userName : ''}
                    </Typography>
                    <div style = {{width: "80%", margin: "0 auto"}}>
                        <Divider />
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Email" secondary={email? email : 'None'} />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone Number" secondary={phone? phone : 'None'} />
                            </ListItem>
                            <Divider />
                        </List>
                    </div>

                </Paper>
            </Grid>
        </div>
    )
}
