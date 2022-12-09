import React from "react";
import {Link} from "react-router-dom";
import profile from "../../images/profile.png"

const ThoughtList = ({
    thoughts,
    showUsername = true,
}) => {
    if (!thoughts.length) {
        return "No thoughts to view as of yet!"
    }  
    return(
    <div className="min-h-full px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 border-solid border-1 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl tracking-tight text-indigo-600"> Discussions  </h1>
            <br>
            </br>
           
            {thoughts && thoughts.map((thought) => ( 
            <div className="bg-gray-50 border-solid border-2 rounded-lg px-7 pt-4 pb-4 mb-3">
            <div 
            key= {thought._id}>
                {showUsername ? (
                <div className=" truncate italic text-md text-gray-700"> 
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
                <p className="tracking-tight text-gray-700">{thought.thoughtText}</p>      
                </div>
                <br></br>
                <Link 
                className="italic underline text-gray-600 text-sm"
                to= {`/thoughts/${thought._id}`}> Comments 
                </Link>
        </div>
         
             </div>

            ))}
          
        </div>
    </div>
        
    )
}

export default ThoughtList;
