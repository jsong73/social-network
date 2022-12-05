// import React from "react"
// import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/client";
// import CommentList from "../components/CommentList"
// import CommentForm from "../components/CommentForm"

// import { QUERY_SINGLE_THOUGHT } from "../utils/queries";

// const SingleThought = () => {
//     const {thoughtId} = useParams();
//     const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
//         variables:{thoughtId: thoughtId},
//     });

//     const thought = data?.thought || {};
//     if (loading) {
//         return "Loading..."
//     }
//     return(
//         <div>
//             {thought.username} has this thought on {thought.createdAt}
//             {thought.thoughtText}

//             <div>
//                 <CommentList comments={thought.comment}/>
//             </div>
//             <div>
//                 <CommentForm thoughtId={thought.thought._id}/>
//             </div>

//         </div>
//     )
// }

// export default SingleThought;