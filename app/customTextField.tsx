import React from "react";
import {TextField} from "@mui/material"

type CustomTextFieldProps = {
    label: string,
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CustomTextField = (props: CustomTextFieldProps) => {
    return (
        <TextField
            label={props.label}
            name={props.name}
            onChange={props.changeHandler}

            variant={"outlined"} //enables special material-ui styling
            size={"small"}
            margin={"dense"}
        />
    );
}

export default CustomTextField