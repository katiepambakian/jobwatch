"use client";

import React, {useState} from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@mui/material";

import CustomTextField from "./customTextField"
import CustomDropDown from "./customDropdown"


type Values = {
    name : string,
    email : string,
    age : string,
}

const ages = [
    {value : "20-40",label :"From 20 to 40"},
    {value : "40-50",label :"From 40 to 50"},
]

const Form = () => {

    const [values,setValues] = useState<Values>({
        name : "",
        email : "",
        age : "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(values)
    }

    return (
        <Paper className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center shadow-lg">
            <Typography variant={"h4"} className="mb-6">Form</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-4">
                <CustomTextField changeHandler={handleChange} label={"Name"} name={"name"}/>
                <CustomTextField changeHandler={handleChange} label={"Email"} name={"email"}/>
                <CustomDropDown label={"Age"} name={"age"} changeHandler={handleChange} values={ages} currentValue={values.age}/>
                <Button type={"submit"} variant={"contained"} className="mt-6">Submit</Button>
            </form>
        </Paper>
    );
}

export default Form;