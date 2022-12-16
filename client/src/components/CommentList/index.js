import React from "react";
import DeleteComment from "../DeleteComment";
import Auth from "../../utils/auth"

const CommentList = ({ comments = [""]  , thoughtId }) => {
    if(!comments.length) {
        return <div className="text-sm italic text-gray-700">No comments to view as of yet!</div>;
    };

    return(
        <div>
        <h1 className="text-md font-semibold tracking-tight text-indigo-600"> Comments ({comments.length})</h1>
        {comments && comments.map((comment) => (
            
        <div
        key={comment._id}>
        <div className="truncate italic text-md text-gray-700">
        {comment.username} commented {" "} on {comment.createdAt}
        </div>

        <p className="text-md text-gray-700"> {comment.commentText} </p>

        <div>
        <DeleteComment 
        commentId={comment._id} 
        thoughtId={thoughtId}
        isLoggedInUser={Auth.getProfile().data.username === comment.username && true}/>
        </div>

        <br></br>
        </div>
        ))}
        
        </div>
    )};

    export default CommentList;