import React from 'react'
import { Fab, makeStyles, Theme } from '@material-ui/core'
import NavigationIcon from '@material-ui/icons/Navigation';
import theme from '../../Util/theme';

export interface NavToMapFabProps {
    point?: firebase.firestore.GeoPoint,
    address?: string,
    city?: string,
    state?: string,
}

const useStyles = makeStyles({
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
                <Fab target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(props.address + ", " + props.city + ", " + props.state)} variant="extended">
                    <NavigationIcon className={classes.extendedIcon} />
                            Show On Map
            </Fab>
                : (
                    <Fab target="_blank" href={"https://www.google.com/maps/search/?api=1&query=" + String(props.point?.latitude.toString() + ", " + props.point?.longitude.toString())} variant="extended">
                        <NavigationIcon className={classes.extendedIcon} />
                            Show On Map
                    </Fab>
                )
            }
        </div>
    )
}