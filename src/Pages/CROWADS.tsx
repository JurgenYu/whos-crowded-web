import { Grid } from '@material-ui/core'
import React from 'react'
import MyCrowdsList from '../Components/MyCrowdsList/myCrowdsList'
import {crowdsStyles} from './styles/crowdsStyles'

export default function CROWADS() {
    const classes = crowdsStyles()
    return (
        <div>
            <Grid justify='center' container className={classes.myCrowdsContainer}>
                <MyCrowdsList/>
            </Grid>
        </div>
    )
}
