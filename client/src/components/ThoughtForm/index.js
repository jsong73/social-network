import React, {useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations"
import  { QUERY_THOUGHTS, QUERY_ME } from "../../utils/queries"
import Auth from "../../utils/auth";

const ThoughtForm = () => {
    const [thoughtText, setThoughtText] = useState("");
    const [characterCount, setCharacterCount ] = useState(0);

    const [addThought, {error}] = useMutation(ADD_THOUGHT, {
        update(cache, {data: {addThought}}){
            try {
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS});
                

                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought,...thoughts]}, 
                });
           
            } catch (error){
                console.log(error);
            }

            const { me } = cache.readQuery({ query: QUERY_ME});
            cache.writeQuery({
                query: QUERY_ME, 
                data: { me: { ...me, thoughts: [...me.thoughts, addThought] } }
            });
        },
    });

    const thoughtFormHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addThought ({
                variables: {
                    thoughtText,
                    username: Auth.getProfile().data.username,
                }
            });

        setThoughtText("");
        } catch (error) {
        console.log(error);
        }
    };

    const handleChange = (event) => {
        const {name, value } = event.target;

        if ( name === "thoughtText" && value.length <= 280) {
            setThoughtText(value);
            setCharacterCount(value.length);
        }
    };

    return(
    <div>
        <h1> Hello {Auth.getProfile().data.username}, </h1>
    
            <form onSubmit={thoughtFormHandler}>
                <textarea
                    name="thoughtText"
                    placeholder="Whats on your mind?"
                    value={thoughtText}
                    onChange={handleChange}></textarea>
            
             <button type="submit"> Submit </button>
             </form>
             
           <p className={`${characterCount === 280 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/280
          </p>
    
    </div>
   
    )
}

export default ThoughtForm;