"use client";

import React, {useState} from "react";
import {createStyles, makeStyles, Typography,Paper,Button} from "@mui/material";

import CustomTextField from "./customTextField"


type Values = {
    name : string,
    email : string,
    postcode: string,
    password : string,
}


const Form = () => {

    const [values,setValues] = useState<Values>({
        name : "",
        email : "",
        postcode: "",
        password : "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: string[] = [];
        if (!values.name) errors.push("Name is required.");
        if (!values.email) errors.push("Email is required.");
        if (!values.postcode) errors.push("Postcode is required.");
        if (!values.password) errors.push("Password is required.");
        
        console.log(values)
        {/** Need this to put the values into the database and let them know they are registered */}
        
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem', // Tailwind's `space-y-4` is approximately 1rem
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Tailwind's `bg-opacity-60` with white background
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Tailwind's `shadow-xl`
      };
      
      const buttonStyle = {
        marginTop: '1.5rem', // Tailwind's `mt-6`
      };

    return (
        <Paper className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 text-center shadow-lg">
            <Typography variant={"h4"} className="mb-6">Sign up</Typography>
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-4 bg-opacity-60 shadow-xl" >
                <CustomTextField changeHandler={handleChange} label={"Name"} name={"name"} required />
                <CustomTextField changeHandler={handleChange} label={"Email"} name={"email"} inputType={"email"} required />
                <CustomTextField changeHandler={handleChange} label={"Postcode"} name={"postcode"} />
                <CustomTextField changeHandler={handleChange} label={"Password"} name={"password"} inputType={"password"} required/>
                <Button type={"submit"} variant={"contained"} className="mt-6">Submit</Button>
            </form>
        </Paper>
    );
}

export default Form;