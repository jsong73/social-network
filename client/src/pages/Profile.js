import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery} from "@apollo/client";
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
    //if logged in user matches username 
    if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return  window.location.assign("/me");
    }
    if (loading) {
        return <div className="text-lg text-gray-700"> loading... </div>;
    }

    return(
        <div>
        <Navbar />
        <div className="min-h-full items-center justify-center py-12 px-6 sm:px-6 lg:px-8">
   
         <div className="min-h-full px-4 sm:px-6 lg:px-8 text-gray-700 ">
        
            <div className="bg-gray-50 border-solid border-1 shadow-md rounded-md px-10 pt-6 pb-8 mb-6 ">
           <h1 className="text-xl tracking-tight text-indigo-600"> Viewing {userParam ? `${user.username}'s` : "my"} profile</h1>
            <br></br>
           
            <h1 className="font-semibold underline underline-offset-8 leading-10"> Account information </h1>
            <div className="leading-10">
            <p className="font-semibold inline">Email</p> {user.email}
            <br></br>
            <p className="font-semibold inline">Username</p> {user.username}
            </div>
            </div>
            </div>
            
           <ThoughtList
            showUsername={true}
            thoughts={user.thoughts}
            isLoggedInUser={!userParam && true}
          />

        </div>
        </div>
    );
};

export default Profile;