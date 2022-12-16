import React, {useState} from 'react';
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth"
import { Link } from "react-router-dom";

const Login = (props) => {
    const [formState, setFormState] = useState({ 
        email: "", 
        password: "",
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

        <div className="flex min-h-full items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
       
        <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="mt-6 text-center text-4xl tracking-tight text-gray-900">Sign in to your account </h1>
      
        <p className="mt-2 text-center text-sm text-gray-600">  Or{' '}
        <button> <Link to="/signup" className ="mt-2 text-center font-medium text-indigo-600 hover:text-indigo-500"> create a new account </Link></button>
        </p>

        {data ? (window.location.assign("/home")): (
             <form className="mt-8 space-y-6"  onSubmit= {loginFormHandler}>
              <input
                className="relative block w-full appearance-none rounded-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="off"
                value= {formState.email}
                onChange={handleChange}/>

              <input
                className="relative block w-full appearance-none rounded-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="off"
                value= {formState.password}
                onChange={handleChange}/>
            
              <button 
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit"> Sign in </button>       
            </form>
        )}

        {error && (
            <div 
            className="mt-2 text-center text-sm text-gray-600">
            {error.message}</div>
        )}
         </div>
        </div>
        </main>
          )};



export default Login;

