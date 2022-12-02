import './App.css';
import React from "react"
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Signup from "./pages/Signup"
import SingleThought from "./pages/SingleThought"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom" 



function App() {
  return (
    <div className="container">
 <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<Signup />} />

    <Route path="/me" element={<Profile />} />

    <Route path="/profile/:username" element={<Profile />} />

    <Route path="thoughts/:thoughtId" element={<SingleThought />} />
 
 </Routes>
    </div>
  );
}

export default App;
