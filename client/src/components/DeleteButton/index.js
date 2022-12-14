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
        
        <div className="float-right">

            {isLoggedInUser && (
                <button
                onClick={() => removeThoughtHandler (thoughtId)}
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300">
  
                <img
                src={trashcan}
                alt="trashcan" 
                width="25px">
                </img>

                </button>
                
                )}
                </div>
            
    )

}

    export default DeleteButton;