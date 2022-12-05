import React , { useState } from 'react';
import { useMutation } from "@apollo/client"
import  {ADD_USER} from "../utils/mutations"
import Auth from "../utils/auth";

const Signup = () => {
    const [formState, setFormState] = useState({
        email:"",
        username:"",
        password:"",
    });

    const [addUser, {error, data}]= useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState ({
            ...formState,
            [name]: value,
    });
};

    const signupFormHandler = async (event) => {
        event.preventDefault();
        try{
            const { data } = await addUser({
                variables: {...formState}
            });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.log(error)
        }
        setFormState({
            email:"",
            username:"",
            password:"",
        })
    };

    return(
    <main>
        <h1> Sign up </h1>
        {data ? (document.location.replace("/home")): (
             <form onSubmit= {signupFormHandler}>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="off"
                value= {formState.email}
                onChange={handleChange}/>

              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                autoComplete="off"
                value= {formState.username}
                onChange={handleChange}/>

              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="off"
                value= {formState.password}
                onChange={handleChange}/>

              <button type="submit"> Create account </button>
            </form>
        )}

        {error && (
            <div> Account already exists. Please log in or choose another email. </div>
        )}
    </main>
    )}


    export default Signup;