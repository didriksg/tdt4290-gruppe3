import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {categories} from '../../../definitions'

const useStyles = makeStyles(theme => ({
    root: {
        /*display: 'flex',
        flexWrap: 'wrap',*/
    },
    formControl: {
        minWidth: 295,  /* length of selectorfield */
    }
}));

export default function SimpleSelect(props) {
    const classes = useStyles();

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    let elements = [];

    for (let i = 0; i < categories.length; i++) {
        elements.push(<MenuItem value={categories[i]}>{categories[i]}</MenuItem>);
    }

    /*outlined-age-simple is a type property for material-ui*/
    return (
        <form className={classes.root} autoComplete="off">
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    Kategori
                </InputLabel>
                <Select
                    name={props.name}
                    value={props.value}
                    onChange={props.handleFunction}
                    labelWidth={labelWidth}
                >
                    {elements}
                </Select>
            </FormControl>

        </form>
    );
}
