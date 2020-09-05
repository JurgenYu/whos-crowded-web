import { makeStyles } from "@material-ui/core";
import theme from "../../Util/theme";

export const useStyles = makeStyles({
    root: {
        width:"640px",
    },
    timePicker: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        margin: '1rem',
    },
    paper: {
        marginTop: '3rem',
        paddingTop: '0.5rem',
        width: '34.7rem'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    textField: {
        marginBottom: '1rem',
        margin: '0 auto',
        '& label.Mui-focused': {
            color: 'rgba(249,147,51)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 20,
            },
            '&:hover fieldset': {
                borderColor: 'rgba(249,147,51)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(249,147,51)',
            },
        },
    },
    button: {
        color: 'white',
        backgroundColor: 'rgba(249,147,51)',
        marginTop: '1rem',
        marginBottom: '0.5rem',
        height: '48px',
        borderRadius: 20,
        alignSelf: 'center',
    }
})