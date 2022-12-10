import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_THOUGHT } from "../../utils/mutations";
import  { QUERY_THOUGHTS} from "../../utils/queries";
import Auth from "../../utils/auth";

const ThoughtForm = () => {
    const [thoughtText, setThoughtText] = useState("");
    const [characterCount, setCharacterCount ] = useState(0);

    const [addThought, { error }] = useMutation(ADD_THOUGHT, {
        update(cache, {data: { addThought }}){
            try {
                const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS});
                cache.writeQuery({
                    query: QUERY_THOUGHTS,
                    data: { thoughts: [addThought,...thoughts]}, 
                });
            } catch (error){
                console.log(error);
            }
        }
    });
    
    const thoughtFormHandler = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addThought({
            variables: {
              thoughtText,
              _id: Auth.getProfile().data.username,
            }
          });
          console.log(data)
          setThoughtText("");
          setCharacterCount("0");
        } catch (error) {
          console.error(error);
        };
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "thoughtText" && value.length <= 280) {
            setThoughtText(value);
            setCharacterCount(value.length);
        }
    };

    return(
    <div className="min-h-full items-center justify-center py-12 px-6 sm:px-6 lg:px-8">
    <div className="bg-gray-50 border-solid border-1 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <h1 className ="text-2xl tracking-tight text-gray-900"> Welcome {Auth.getProfile().data.username}, </h1>
     
   
            <form 
                className="mt-8 space-y-6"  
                onSubmit={thoughtFormHandler}>
            <textarea
                className="relative block w-full appearance-none rounded-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:text-sm"
                name="thoughtText"
                placeholder="Whats on your mind?"
                value={thoughtText}
                onChange={handleChange}></textarea>
            
            <div className="flex justify-between">
                
            <div className="mt-2 text-right text-sm text-gray-600">
            <p className={`${characterCount === 280 || error ? 'text-danger' : ''}`}>
            Character Count: {characterCount}/280
            </p>
            </div>
            
             <button 
             className="float-right rounded-md border border-transparent bg-indigo-600 py-2 px-6 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
             type="submit"> Publish </button>
             </div>
             </form>

          
    </div>
 
   </div>
);
};

export default ThoughtForm;