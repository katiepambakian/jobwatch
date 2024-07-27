"use client";

import React, {useState} from "react";
import {Typography,Paper,Button} from "@mui/material";
import bcrypt from 'bcryptjs';
import CustomTextField from "./customTextField"


type Values = {
    email : string,
    postcode: string,
    password : string,
}


const Form = () => {

    const [values,setValues] = useState<Values>({
        email : "",
        postcode: "",
        password : "",
    });

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values,[event.target.name] : event.target.value});
    }

    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: string[] = [];
        if (!values.email) errors.push("Email is required.");
        if (!values.postcode) errors.push("Postcode is required.");
        if (!values.password) errors.push("Password is required.");
        if (errors.length > 0) {
            console.error(errors.join(' '));
            return;
          }

        console.log(values)
        try {
            // Hash the password before sending
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(values.password, salt);
            console.log(hashedPassword);
            alert("Signed up!");

        
            const response = await fetch('../../api/addUser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...values,
                password: hashedPassword, // Use hashed password
              }),
            });

            if (!response.ok) {
                const result = await response.json();
                console.error('Error adding user:', result.message);
                return;
            }
            const result = await response.json();
            console.log('User added successfully:', result);
          } 
          catch (error: unknown) {
            if (error instanceof Error) {
              console.error('Error submitting form:', error.message);
            } else {
              console.error('An unknown error occurred during form submission');
            }
          }
        
        
    };

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
                <CustomTextField changeHandler={handleChange} label={"Email"} name={"email"} inputType={"email"} required />
                <CustomTextField changeHandler={handleChange} label={"Postcode"} name={"postcode"} />
                <CustomTextField changeHandler={handleChange} label={"Password"} name={"password"} inputType={"password"} required/>
                <Button type={"submit"} variant={"contained"} className="mt-6">Submit</Button>
            </form>
        </Paper>
    );
}

export default Form;