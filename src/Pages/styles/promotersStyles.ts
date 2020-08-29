import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const promoterStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            color: 'Black',
            backgroundColor: 'white',
            width: 'auto',
            justifyContent: 'space-between',
            margin: '1rem',
            padding: '1rem',
            textTransform: 'none',
            fontSize: '33px'
        },
    }),
);