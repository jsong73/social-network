import React from 'react';
import { useParams } from "react-router-dom";
import {useQuery} from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries"
import ThoughtList from "../components/ThoughtList";
import Navbar from "../components/Navbar"

import Auth from "../utils/auth"

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: {username: userParam },
    });
    const user = data?.me || data?.user || {};
    console.log(user)
    //if logged in user matches username 
    if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return  window.location.assign("/me");
    }

    if (loading) {
        return "loading..."
    }

    return(
        <div>
         <Navbar />
           <h1> Viewing {userParam ? `${user.username}'s` : "my"} profile</h1>
           
            <h1> Account information: </h1>
            <p>Default email: {user.email}</p>
            <p>Username: {user.username}</p>
            <p></p>
  

            <h2> {user.username}'s posted thoughts...</h2>
           <ThoughtList
            thoughts={user.thoughts}
            showTitle={true}
            showUsername={true}
          />

        </div>

    )
}

export default Profile;