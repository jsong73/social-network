import React from "react";
import {Link } from "react-router-dom";

//NEED TO ADD CURRENT USER TO THE DISCUSSION CURRENTLY SHOWS AS NULL

const ThoughtList = ({
    thoughts,
    showUsername = true,
}) => {
    console.log(thoughts)

    if (!thoughts.length) {
        return "No thoughts to view as of yet!"
    }
    return(
        <div>
            <h1>Discussions</h1>
            {thoughts &&  thoughts.map((thought) => (
            <div key= {thought._id}>
                {showUsername ? (
                    <Link to= {`/profiles/${thought.username}`}>
                   { thought.username } created this thought on {thought.createdAt}
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