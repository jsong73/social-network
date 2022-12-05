import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {ADD_COMMENT} from "../../utils/mutations"


const CommentForm = ({ thoughtId }) => {
    const [commentText, setCommentText] = useState("");
    const [characterCount, setCharacterCount] = useState(0);

    const [addComment, {error}] = useMutation(ADD_COMMENT);

    const commentFormHandler = async (event) => {
        event.preventDefault();
        try{
            const {data} = await addComment({
                variables:{
                    thoughtId,
                    commentText,
                },
            })

        setCommentText("");
        setCharacterCount("")
        } catch (error) {
            console.log(error)
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === "commentText" && value.length <= 280) {
            setCommentText(value);
            setCharacterCount(value.length);
        }
    };
    return(
        <div>
            <h1> leave a comment </h1>

            <form onSubmit={commentFormHandler}>
            
              <textarea
                name="commentText"
                placeholder="I think..."
                value={commentText}
                onChange={handleChange}></textarea>

                <button type="submit"> Add Comment </button>

                <p className={`${characterCount === 280 || error ? 'text-danger' : ''}`}>
                Character Count: {characterCount}/280
               </p>
    
    
             </form>
        </div>
    )
}

export default CommentForm;