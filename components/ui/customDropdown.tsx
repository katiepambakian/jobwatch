import React from "react";
import {MenuItem, TextField} from "@mui/material";

type CustomDropDownProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    values : Array<{value : string,label : string}>,
    currentValue : string
}

const CustomTextField = (props: CustomDropDownProps) => {
    return (
        <TextField
            select //converts to a dropdown
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            value={props.currentValue}

            variant={"outlined"} //enables special material-ui styling
            size={"small"}
            margin={"dense"}
        >
            {props.values.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}

export default CustomTextField