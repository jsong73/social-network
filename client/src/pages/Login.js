import React, {useState} from 'react';
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth"


const Login = (props) => {
    const [formState, setFormState] = useState({ email: " ", password: " "});
    const [login, {error, data}] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const {name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try{
            const { data } = await login({
                variables: { ...formState},
            });
            
            Auth.login(data.login.token);
        } catch (error) {
            console.log(error);
        }
        setFormState({
            email: " ",
            password: " ",
        });
        console.log(data)
    }

    return(
    <div>
        <h1>Login</h1>
             <form>
              <input
                className="form-input"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="username"
                value= {formState.email}
                onChange={handleChange}/>

              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value= {formState.password}
                onChange={handleChange}/>

              <button type="submit"> Submit </button>

            </form>
    </div>
          )}

export default Login;

