import React, {useState} from "react";
import Input from "./Input.js";
import {Button, Form} from "semantic-ui-react";
import axios from "axios";
import validator from "validator";


export default function () {
    let error = false;
    const defaultState = {
        firstName: {
            type: "text",
            value: "",
            error,
            message: "Please, enter first name."
        },
        lastName: {
            type: "text",
            value: "",
            error,
            message: "Please, enter first name"
        },
        email: {
            type: "email",
            value: "",
            error,
            message: "Please, enter valid email"
        },
        password: {
            type: "password",
            value: "",
            error,
            message: "Please, enter password between 8-16 characters"
        },
        confirmPassword: {
            type: "password",
            value: "",
            error,
            message: "Passwords do not match"
        } 
    };

    const [state, setState] = useState(defaultState);
    
    function makeInput(property) {
        function handleChange(e) {
            setState({
                ...state,
                [property]: {
                    ...state[property],
                    value: e.target.value 
                }
            });
        }
        return (
            <Input 
                key={property}
                name={property}
                value={state[property].value}
                label={property}
                type={state[property].type}
                error={state[property].error}
                message={state[property].message}
                handleChange={handleChange}
            />        
        )
    }

    const Inputs = () => Object.keys(state).map(makeInput)
    
    function handleSubmit(e) {
        e.preventDefault();
        const firstName = state.firstName.value;
        const lastName = state.lastName.value;
        const email = state.email.value;
        const password = state.password.value;
        const confirmPassword = state.confirmPassword.value;

        if (
           firstName.length > 0
           && lastName.length > 0
           && validator.isEmail(email)
           && password.length >= 8
           && password.length <= 16
           && confirmPassword === password
        ) {
            //TODO: encrypt password
            const packet = {
                firstName,
                lastName,
                email,
                password
            };
            console.log("Here is everything being submitted: ", packet);

            // handle input
            axios.post("get url from Armando", packet)
                .then(res => {
                    console.log(res);
                    setState(defaultState);
                }).catch(err => console.log(err));
        }
        
        // if length of first name is incorrect
        error = true;
        if (firstName.length <= 0) {
            setState({
                ...state,
                firstName: {
                    ...state.firstName,
                    error
                }
            });
            return;
        }

        // if length of last name is incorrect
        if (lastName.length <= 0) {
            setState({
                ...state,
                lastName: {
                    ...state.lastName,
                    error
                }    
            });
            return;
        }

        // if not a valid email
        if (!validator.isEmail(email)) {
            setState({
                ...state,
                email: {
                    ...state.email,
                    error
                }
            });
            return;
        }

        // if length of password is incorrect
        if (password.length < 8 || password.length > 16) {
            setState({
                ...state,
                password: {
                    ...state.password,
                    error
                }
            });
            return;
        }
        // if confirmed password does not match password
        if (confirmPassword !== password) {
            setState({
                ...state,
                confirmPassword: {
                    ...state.confirmPassword,
                    error
                }
            });
            return;
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            {
                Inputs()
            }
            <Button 
                type="submit"
                color="blue"
            >
                Submit
            </Button>
        </Form>      
    );
}

