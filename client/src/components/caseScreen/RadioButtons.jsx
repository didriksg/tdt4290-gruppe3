import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";


export default function FormControlLabelPosition() {
  const [value, setValue] = React.useState("female");

  const handleChange = event => {
    setValue(event.target.value);
  };
  

  return (
    <FormControl component="fieldset">
      
      <RadioGroup
        name="position"
        value={value}
        onChange={handleChange}
        row
      >
        <FormControlLabel
          value="1"
          control={<Radio color="default" />}
          label="1"
          labelPlacement="top"
        />
        <FormControlLabel
          value="2"
          control={<Radio color="default" />}
          label="2"
          labelPlacement="top"
        />
        <FormControlLabel
          value="3"
          control={<Radio color="default" />}
          label="3"
          labelPlacement="top"
        />
        <FormControlLabel
          value="4"
          control={<Radio color="default" />}
          label="4"
          labelPlacement="top"
        />
      </RadioGroup>
    </FormControl>
  );
}
