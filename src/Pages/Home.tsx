import React, { FunctionComponent } from 'react'

//components
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
    console.log(1)
    return (
        <React.Fragment>
            <div className={classes.root}>
                <Paper elevation={0} />
                <Paper />
                <Paper elevation={3} />
            </div>
        </React.Fragment>
    )
}

export default Home;
