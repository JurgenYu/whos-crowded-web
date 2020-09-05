import React from 'react'
import { GENRES } from '../../Util/Genres'
import { Chip, makeStyles, createStyles, Theme, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'

interface GenreChipProps {
    genres: Array<boolean>,
    handleClick: (key: number) => void,
    color: string,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
                minWidth: '5rem',
            },
        },
        chip: {
            color: "rgba(249,147,51)",
        }
    }),
)

export default function GenreChip(props: GenreChipProps) {

    const { genres, handleClick, color } = { ...props };
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: color,
            }
        },
    })
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {genres.map((value, key) => {
                return (
                    <MuiThemeProvider theme={theme}>
                        <Chip
                            label={GENRES[key]}
                            key={key}
                            clickable
                            variant={value ? 'default' : 'outlined'}
                            color='primary'
                            onClick={() => handleClick(key)}
                            icon={value ? <DoneIcon /> : undefined}
                        />
                    </MuiThemeProvider>
                )
            })}
        </div>
    )
}
