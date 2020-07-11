import { createMuiTheme }from '@material-ui/core/styles'

export default createMuiTheme({
    overrides: {
        MuiButton:{
            root: {
                color: '#fff',
            },
            text: {
                color: 'fff',
                width: '4.5rem'
            },
            outlined: {
                color: '#fff',
                borderColor: '#c8c8c8',
                width: '4.5rem',
                '&:hover': {
                    borderColor: '#424242'
                },
            }
        }
    }
})