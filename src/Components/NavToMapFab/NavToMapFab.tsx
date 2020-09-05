import React from 'react'
import { Fab, makeStyles, Theme, Button } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';
import theme from '../../Util/theme';

export interface NavToMapFabProps {
    point?: firebase.firestore.GeoPoint,
    address?: string,
    city?: string,
    state?: string,
}

const useStyles = makeStyles({
    button: {
        boxShadow: undefined,
        borderRadius: '2rem',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}
);

export default function NavToMapFab(props: NavToMapFabProps) {
    const classes = useStyles();

    return (
        <div>
            {props.address ?
                <Button size='large' disableElevation variant='contained' className={classes.button} target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(props.address + ", " + props.city + ", " + props.state)} >
                    <NavigationIcon className={classes.extendedIcon} />
                            MAP
            </Button>
                : (
                    <Button size='large' disableElevation variant='contained' className={classes.button} target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + String(props.point?.latitude.toString() + ", " + props.point?.longitude.toString())} >
                        <NavigationIcon className={classes.extendedIcon} />
                            MAP
                    </Button>
                )
            }
        </div>
    )
}
