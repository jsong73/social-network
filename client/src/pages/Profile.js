import React from 'react';
import { Navigate, useParams } from "react-router-dom";
import {useQuery} from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries"
import ThoughtForm from "../components/ThoughtForm";
import ThoughtList from "../components/ThoughtList";
import Navbar from "../components/Navbar"

import Auth from "../utils/auth"

const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: {username: userParam },
    });
    const user = data?.me || data?.user || {};
    if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />
    }

    if (loading) {
        return "loading...."
    }

    return(
        <div>
         <Navbar />
           <h1> Viewing {userParam ? `${user.username}'s` : "my"} profile</h1>
           <h2> {user.username}'s thoughts...`</h2>
           
           <ThoughtList
            thoughts={user.thoughts}
            showTitle={false}
            showUsername={false}
          />

        </div>

    )
}

export default Profile;