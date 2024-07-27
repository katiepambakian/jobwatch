import React from "react";
import {TextField} from "@mui/material"

type CustomTextFieldProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    inputType?: string, // Optional prop to specify input type
}

const CustomTextField = (props: CustomTextFieldProps) => {
    return (
        <TextField
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}
            type={props.inputType} //applys inputType to the textfield
            variant={"outlined"} //enables special material-ui styling
            size={"small"}
            margin={"dense"}
        />
    );
}

export default CustomTextField