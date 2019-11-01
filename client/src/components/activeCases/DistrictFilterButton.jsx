import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function DistrictFilterButton(props) {
    const classes = useStyles();
    const [district, setDistrict] = React.useState('');
  
    const handleChange = event => {
      setDistrict(event.target.value);
      props.parentCallback(event.target.value);
    };
  
    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    Bydel
                </InputLabel>
                <Select
                    labelid="demo-simple-select-placeholder-label-label"
                    id="demo-simple-select-placeholder-label"
                    value={district}
                    onChange={handleChange}
                    displayEmpty
                    className={classes.selectEmpty}
                >
                    <MenuItem value="">
                        <em>Alle</em>
                    </MenuItem>
                    <MenuItem value={0}>Heimdal</MenuItem>
                    <MenuItem value={1}>Lerkendal</MenuItem>
                    <MenuItem value={2}>Midtbyen</MenuItem>
                    <MenuItem value={3}>Østbyen</MenuItem>
                </Select>
                <FormHelperText>Velg bydel</FormHelperText>
            </FormControl>
        </div>
    );
}

export default DistrictFilterButton;