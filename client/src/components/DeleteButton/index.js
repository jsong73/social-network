// import React from "react";
// import { REMOVE_THOUGHT } from "../../utils/mutations";
// import { useMutation } from "@apollo/client";
// import { QUERY_ME } from "../../utils/queries";

// const DeleteButton = ({ thoughtId, isLoggedInUser = false }) => {
//     const [ removeThought ] = useMutation(REMOVE_THOUGHT, {
//         update(cache, {data: {removeThought}}){
//             try{
//                 cache.writeQuery({
//                     query: QUERY_ME,
//                     data: { me: removeThought },
//                 });
//             } catch (error){
//             console.log(error)
//             }
//         },
//     });

//     const removeThoughtHandler = async (thoughtId) => {
//         try{
//             const {data}= await removeThought({
//                 variables: { thoughtId },
//             });
//         console.log(data)
//         } catch (error) {
//         console.log(error)
//         }
//     };

//     return (
//         <div>
//             <button
//             onClick={() => removeThoughtHandler(thoughtId)}>
//                 DELETE
//             </button>
//         </div>
//     )
// }

// export default DeleteButton;