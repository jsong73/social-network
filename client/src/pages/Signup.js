import React , { useState } from 'react';
import { useMutation } from "@apollo/client"
import  {ADD_USER} from "../utils/mutations"
import Auth from "../utils/auth";
import { Link } from 'react-router-dom';

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
                variables: {...formState},
            });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.log(error);
        }
        setFormState({
            email:"",
            username:"",
            password:"",
        })
    };

    return(
    <main>
        <div className="flex min-h-full items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="mt-6 text-center text-4xl tracking-tight text-gray-900"> Create a new account </h1>

        <p className="mt-2 text-center text-sm text-gray-600">  Or{' '}
        <button> <Link to="/" className ="mt-2 text-center font-medium text-indigo-600 hover:text-indigo-500"> sign in </Link></button>
        </p>

        {data ? (document.location.replace("/home")): (
             <form  
             className="mt-8 space-y-6" 
             onSubmit= {signupFormHandler}>
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
                placeholder="Username"
                name="username"
                type="username"
                autoComplete="off"
                value= {formState.username}
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
              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" type="submit"> Create account </button>
            </form>
        )}

        {error && (
            <div 
            className="mt-2 text-center text-sm text-gray-600"> 
            Account already exists. Please log in or choose another email. </div>
        )}
        </div>
        </div>
    </main>
    )};


    export default Signup;