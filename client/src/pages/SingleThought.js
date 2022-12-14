import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentList from "../components/CommentList"
import CommentForm from "../components/CommentForm"
import Navbar from "../components/Navbar"
import { QUERY_SINGLE_THOUGHT } from "../utils/queries";
import profile from "../images/profile.png"
import DeleteButton from "../components/DeleteButton";
import Auth from "../utils/auth";

const SingleThought = () => {
    const {thoughtId} = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
        variables:{thoughtId: thoughtId},
    });

    const thought = data?.thought || {};
    if (loading) {
        return <div className="text-lg text-gray-700"> loading... </div>;
    }
    return(
        <main>
            <Navbar />
            <div className=" min-h-full items-center justify-center py-16 px-2 sm:px-6 lg:px-8">
            <div className="bg-gray-50 border-solid border-1 shadow-md rounded-md px-8 pt-6 pb-2 mb-4">
            <img 
                className="float-left"
                src={profile}
                alt="profile" 
                width="20px"></img>
            <div className="truncate italic text-md text-gray-700">
            {thought.username} had this thought on {thought.createdAt}
            </div >
            <br></br>
            <p className="text-lg text-gray-700">{thought.thoughtText}</p>
            <br></br>
            
            <div>
                <CommentList comments={thought.comments} />
            </div>
    
            <div>
                <CommentForm thoughtId={thought._id} />
            </div>

            <div className="mb-7">
            <DeleteButton 
            isLoggedInUser={Auth.getProfile().data.username === thought.username && true}
            thoughtId={thought._id}/>
            </div>
     
            </div>
            </div>
        </main>
    );
};

export default SingleThought;