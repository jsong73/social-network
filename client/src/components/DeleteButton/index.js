import React from "react";
import { REMOVE_THOUGHT } from "../../utils/mutations";
import { QUERY_THOUGHTS } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth"

const DeleteButton = () => {
    const [removeThought] = useMutation(REMOVE_THOUGHT, {
        update(cache, {data: { removeThought }}){
            try{
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data:  { thoughts: [removeThought,...thoughts]},
                });
            } catch (error){
            console.log(error);
            }
        }
    });

    const removeThoughtHandler = async () => {
        try{
            const { data } = await removeThought({
                variables: {
                    _id: Auth.getProfile().data.username, 
            }
        });
        console.log(data)
        } catch(error){
        console.log(error)
        }
    }

    return (
        <div>
            <button
            onClick={removeThoughtHandler}>
                DELETE
            </button>
        </div>
    )
}

export default DeleteButton;