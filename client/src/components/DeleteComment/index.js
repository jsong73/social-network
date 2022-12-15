import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from '@apollo/client';
import { REMOVE_COMMENT } from "../../utils/mutations";

const DeleteComment = ({ 
    commentId, 
    isLoggedInUser = false }) => {
    console.log(commentId)
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

    const removeCommentHandler = async ( commentId ) => {
        try{
            const { data } = await removeComment({
                variables: { commentId },
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
        onClick={() => removeCommentHandler (commentId)}>

        Delete comment
         </button>
        )}

            
        </div>
            
    )

}

    export default DeleteComment;