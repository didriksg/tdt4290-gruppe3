import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    root: {
        /*display: 'flex',
        flexWrap: 'wrap',*/
    },
    formControl: {
        minWidth: 295,  /* lengden på selectorfeltet */
    }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState(false);

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setValues(oldValues => ({
            oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Barn/Voksen
                </InputLabel>
                <Select
                    name={props.name}
                    value={props.value}
                    onChange={props.handleFunction}
                    labelWidth={labelWidth}
                >
                    <MenuItem value={true}>Barn</MenuItem>
                    <MenuItem value={false}>Voksen</MenuItem>
                </Select>
            </FormControl>

        </form>
    );
}
