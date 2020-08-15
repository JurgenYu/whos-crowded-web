import { makeStyles, createStyles, Theme } from "@material-ui/core";

export const partyStyles = makeStyles((theme: Theme) =>
    createStyles({
        input: {
            height: "3rem",
            padding: "0px 14px"
        },
        paper: {
            width: '35rem',
            height: '3rem',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
            marginBottom: "2rem",
            position: 'relative',
            margin: 'auto'
        },
        button: {
            position: 'absolute',
            right: '0px',
            color: '#b794f6',
            top: '15%'
        },
        media: {
            height: '26rem',
            width: '26rem',
        },
        card: {
            margin: '1.5rem 1rem',
            borderRadius: '0.4rem',
            width: '26rem',
            backgroundColor: '#fff',
            marginBottom: '1.5rem',
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        },
        formControl: {
            width: '10%',
            position: 'fixed',
            minWidth: 120,
            right: 0,
            margin: '0 2rem'
        },
        chip: {
            margin: 2,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        select: {
            backgroundColor: '#fff',
        },
        inputlabel: {
            color: '#fff',
            '&.Mui-focused': {
                color: '#fff'
            },
        },
    })
)