import React, { useContext } from 'react'

import Icon from '@material-ui/core/Icon';
import { Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import FirebaseContext from '../../Firebase/Context';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: '#292929',
            backgroundColor: '#fff'
        },
    }),
);

export default function WithGoole() {
    const classes = useStyles();

    const firebase = useContext(FirebaseContext);

    const buttonClickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        firebase?.authWithGoogle().catch(error => console.log(error));
    }

    return (
        <div>
            <Button className={classes.button} variant='outlined' onClick={buttonClickHandler}>
                Signin With Google
            </Button>
        </div>
    )
}
