import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const homeStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            margin: 'auto',
            height: 'auto',
            padding: '0',
            width: '70%'
        },
    }),
);