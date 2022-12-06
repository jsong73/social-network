import React from "react";
import {Link} from "react-router-dom";


const ThoughtList = ({
    thoughts,
    showUsername = true,
}) => {
    if (thoughts === 0 ) {
        return "No thoughts to view as of yet!"
    }  

    return(
        <div>
            <h1>Discussions</h1>
            {thoughts && thoughts.map((thought) => (
            <div key= {thought._id}>
                {showUsername ? (
                    <Link to= {`/thoughts/${thought._id}`}>
                   {thought.username} created this thought on {thought.createdAt}
                    </Link>
                ) : (
                    <>
                    </>
                )}
                <div>
                <p>{thought.thoughtText}</p>          
                </div>

            </div>
            ))}
        </div>
    )
}

export default ThoughtList;