const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Reaction } = require("../models")

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate("thoughts");
        },
        user: async (parent, {username}) => {
            return User.findOne({ username }).populate("thoughts");
        },
        thoughts: async (parent, {username}) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 })
        },
        thought: async (parent, {thoughtId}) => {
            return Thought.findOne({_id: thoughtId });
        },
        reactions: async (parent, {username}) => {
            return Reaction.find();
        },
        reaction: async (parent, {reactionId}) => {
            return Reaction.findOne({_id: reactionId})
        },
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id }).populate("thoughts");
            }
            throw new AuthenticationError("You must be logged in.")
        }
    }
}

module.exports = resolvers;