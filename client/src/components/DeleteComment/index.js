import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from "../../utils/mutations";

const DeleteComment = ({ 
    commentId, 
    thoughtId,
    isLoggedInUser = false }) => {

    const [ removeComment ] = useMutation(REMOVE_COMMENT,{
        update(cache, { data: { removeComment } }) {
            try{
                cache.readQuery({
                    query: QUERY_ME,
                    data: { me: removeComment },
                });
            } catch (error){
            console.log(error)
            }
        },
    });

    const removeCommentHandler = async ( commentId, thoughtId ) => {
        try{
            const { data } = await removeComment({
                variables: { commentId, thoughtId },
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };
    
    return(
        
        <div>
            
        {isLoggedInUser && (
        <button
        className="mt-2 text-sm underline tracking-tight text-red-600"
        onClick={() => removeCommentHandler (commentId, thoughtId)}>
        Delete comment
         </button>
        )}

            
        </div>
            
    )

}

    export default DeleteComment;