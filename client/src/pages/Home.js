import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import Navbar from "../components/Navbar"
import ThoughtForm from "../components/ThoughtForm"
import ThoughtList from "../components/ThoughtList"

const Home = () => {

    const {loading, data} = useQuery(QUERY_THOUGHTS);
    const thoughts = data?.thoughts || [];


    return (
      <main>
        <Navbar />

        <div style={{border: "1px solid black"}}>
            <ThoughtForm />
        </div>
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
        <ThoughtList 
        title= "Discussions"
        thoughts= {thoughts} />
         )}

          </div>
      </main>
    );
  };
  
  export default Home;
  