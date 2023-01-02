import './App.css';
import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import SingleThought from "./pages/SingleThought";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext ((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
            <div className="h-full">
              <Routes>
                  <Route path="/home" element={<Home />} />

                  <Route path="/" element={<Login />} />

                  <Route path="/signup" element={<Signup />} />

                  <Route path="/me" element={<Profile />} />

                  <Route path="/thoughts/:thoughtId" element={<SingleThought />} /> 

              </Routes>
            </div>
        </Router>
    </ApolloProvider>
  );
};

export default App;
