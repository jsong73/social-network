import React from "react"
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommentList from "../components/CommentList"
import CommentForm from "../components/CommentForm"
import Navbar from "../components/Navbar"
import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

const SingleThought = () => {
    const {thoughtId} = useParams();
    const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
        variables:{thoughtId: thoughtId},
    });

    const thought = data?.thought || {};
    if (loading) {
        return <div>loading...</div>
    }
    return(
        <main>
            <Navbar />

            {thought.username} has this thought on {thought.createdAt}
           <p>{thought.thoughtText}</p> 

            <div>
                <CommentList comments={thought.comment}/>
            </div>
            <div>
                <CommentForm thoughtId={thought._id}/>
            </div>

        </main>
    )
}

export default SingleThought;