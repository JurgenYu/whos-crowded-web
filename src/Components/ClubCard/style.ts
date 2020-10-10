import { createStyles, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import { Height } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: '10rem',
            width: 'auto',
        },
        card: {
            margin: '1rem 0',
            borderRadius: '1.7rem',
            padding: '0px',
            width: '15rem',
            backgroundColor: '#fff',
            '&:hover': {
                transform: 'scale(1.05, 1.05)'
            }
        },
        inline: {
            display: 'inline',
        },
        locButton: {
            width: '1rem',
            margin: '0 auto'
        },
        genre:{
            margin: '0.3rem',
            content: "0.1rem",
            backgroundColor: 'rgba(255,175,0, 0.3)',
            display: 'inline-block',
            width: 'initial',
            color: 'rgba(255,180,0)'
        },
        genreList:{
            position: 'absolute',
            margin: '1rem',
            width: 'auto'
        }
    })
)

export default useStyles