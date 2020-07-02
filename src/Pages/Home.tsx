import React, { FunctionComponent } from 'react'

//components
import NavBar from '../Components/NavBar/NavBar'
import { Paper, makeStyles, createStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                position: 'absolute',
                marginTop: '5rem',
                left: '40%',
                margin: 'auto',
                width: theme.spacing(32),
                height: theme.spacing(32),
            },
        },
    }),
);

const Home: FunctionComponent = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <NavBar />
            <div className={classes.root}>
                <Paper elevation={0} />
                <Paper />
                <Paper elevation={3} />
            </div>
        </React.Fragment>
    )
}

export default Home;
