import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



export default function MaterialUIPickers(props) {
    // The first commit of Material-UI

    const formatDate = (date) => {
        console.log(date);
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    };


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center">
                <KeyboardDatePicker
                    disableToolbar
                    name={props.name}
                    variant="inline"
                    autoOk={true}
                    minDate={props.minDate ? props.minDate : new Date('1900-01-01')}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={props.value}
                    onChange={(date) => props.handleFunction(props.name, date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

            </Grid>
        </MuiPickersUtilsProvider>
    );
}
