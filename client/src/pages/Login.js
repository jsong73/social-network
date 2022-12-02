import React, {useState} from 'react';
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth"
import { Link } from "react-router-dom";


const Login = (props) => {
    const [formState, setFormState] = useState({ 
        email: "", 
        password: ""
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const loginFormHandler = async (event) => {
        event.preventDefault();
        try{
            const { data } = await login({
                variables: {...formState},
            });

            Auth.login(data.login.token);
        } catch (error) {
            console.log(error);
        }
        setFormState({
            email: "",
            password: "",
        });
   
    }

    return(
    <main>
        <h1>Login</h1>
        {data ? (document.location.replace("/home")): (
             <form onSubmit= {loginFormHandler}>
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
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="off"
                value= {formState.password}
                onChange={handleChange}/>

              <button type="submit"> Submit </button>
            </form>
        )}

        {error && (
            <div>{error.message}</div>
        )}

        <br></br>

        <button> <Link to="/signup"> Create new account </Link></button>
           
        </main>
          )}



export default Login;

