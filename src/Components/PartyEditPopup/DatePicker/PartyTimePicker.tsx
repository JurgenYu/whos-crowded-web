import React from 'react'
import { TextField, makeStyles, createStyles, Theme, createMuiTheme, InputLabel, MuiThemeProvider } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

interface PartyTimePickerProps {
    time: Date,
    setTime: React.Dispatch<React.SetStateAction<Date>>,
    label: string,
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgba(249,147,51)",
        },
    },
})


export default function PartyTimePicker(props: PartyTimePickerProps) {
    const handleTimeChange = (date: Date | null) => {
        setTime(date ? date : time);
    }

    const { time, setTime, label } = { ...props };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <MuiThemeProvider theme={theme}>
                <DateTimePicker autoOk label={label} inputVariant='outlined' variant='inline' margin="normal" value={time} onChange={handleTimeChange} />
            </MuiThemeProvider>
        </MuiPickersUtilsProvider>
    )
}
