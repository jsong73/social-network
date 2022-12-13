import React from "react";
import { Link } from "react-router-dom";
import profile from "../../images/profile.png";
import { QUERY_ME } from "../../utils/queries";
import { useMutation } from '@apollo/client';
import { REMOVE_THOUGHT } from "../../utils/mutations";

const ThoughtList = ({
    thoughts,
    showUsername = true,
    isLoggedInUser = false
}) => {
    const [removeThought] = useMutation(REMOVE_THOUGHT, {
        update(cache, { data: { removeThought }}) {
            try{
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: removeThought },
                });
            } catch (error){
            console.log(error)
            }
        },
    });

    const removeThoughtHandler = async ( thoughts ) => {
        try{
            const { data} = await removeThought({
                variables: {thoughts},
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };
    if (!thoughts.length) {
        return <div className="text-sm italic text-gray-700 text-center"> No thoughts to view as of yet! </div>;
    }

    return(
    <div className="min-h-full px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border-solid border-1 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl tracking-tight text-gray-900"> Discussions  </h1>
            <br>
            </br>   
            {thoughts && thoughts.map((thought) => (    
            <div 
            className="bg-gray-50 border-solid border-2 rounded-lg px-7 pt-4 pb-4 mb-3"
            key= {thought._id}>
                {showUsername ? (
                <div className=" mb-2 truncate italic text-md text-gray-700"> 
                <img 
                className="float-left"
                src={profile}
                alt="profile" 
                width="20px"></img>
                {thought.username} created this thought on {thought.createdAt}
                </div> 
                ) : (
                <>
                </> 
                )}

                <div>
                <p className="mb-2 tracking-tight text-gray-700">{thought.thoughtText}</p>      
                </div>

                {isLoggedInUser && (
                <button
                onClick={() => removeThoughtHandler (thought)}>
                DELETE
                </button>
                )}

                <Link 
                className="text-sm font-medium underline tracking-tight text-indigo-600"
                to= {`/thoughts/${thought._id}`}> Comments 
                </Link>
                




        </div>
            ))}
        </div>
    </div>   
    );
};

export default ThoughtList;