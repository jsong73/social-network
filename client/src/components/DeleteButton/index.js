import React from "react";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from "../../utils/mutations";
import trashcan from "../../images/trashcan.png"


const DeleteButton = ({ 
    thoughtId,  
    isLoggedInUser = false }) => {

    const [ removeThought ] = useMutation(REMOVE_THOUGHT, {
        update(cache, { data: { removeThought } }) {
            try{
                cache.readQuery({
                    query: QUERY_ME,
                    data: { me: removeThought },
                });
            } catch (error){
            console.log(error)
            }
        },
    });

    const removeThoughtHandler = async ( thoughtId ) => {
        try{
            const { data } = await removeThought({
                variables: { thoughtId },
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
                onClick={() => removeThoughtHandler (thoughtId)}
                className="">
  

                <img
                src={trashcan}
                alt="trashcan" 
                width="22px">
                </img>

                </button>
                
                )}
                </div>
        

    )

}

    export default DeleteButton;