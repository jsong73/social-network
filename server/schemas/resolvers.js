const { AuthenticationError } = require("apollo-server-express");
const { User, Thought, Reaction } = require("../models");
const { signToken } = require("../utils/auth")

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
        },
    },
    Mutation: {
        addUser: async(parent, {username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }
        },
        login: async(parent, {email, password}) => {
            const user = await User.findOne({ email });
            
            if(!user) {
                throw new AuthenticationError("No user found with this email!")
            }

            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError("Incorrect credentials!")
            }
            const token = signToken(user);
            return {token, user};
        },
        addThought: async (parent, { thoughtText, username }, context) => {
            if(context.user) {
                const thought= await Thought.create({
                    thoughtText,
                    username
                });
                await User.findOneAndUpdate(
                    {_id: context.user._id},
                    { $addtoSet: { thoughts: thought._id }}
                );
                return thought;
            }
                throw new AuthenticationError("You must be logged in!");
        },
        addReaction: async(parent, { reactionId, reactionBody}, context) => {
            if (context.user) {
                return Reaction.findOneAndUpdate(
                    {_id: reactionId },
                    { $addtoSet: { reactions: reactionBody }},
                    { new: true, runvalidators: true }
                );
            }
            throw new AuthenticationError("You must be logged in!");
        },
        removeThought: async(parent, { thoughtId, username }, context) =>{
            if (context.user){
                const thought = await Thought.findOneAndDelete({
                    _id: thoughtId,
                    username
                });
                await User.findOneAndUpdate(
                    {_id:context.user._id},
                    { $pull: { thoughts: thought._id }}
                );
                return thought;
            }
            throw new AuthenticationError("You must be logged in!")
        },
        removeReaction: async (parent, { reactionId }, context) => {
            if(context.user) {
                return Reaction.findOneAndUpdate(
                    { reactionId },
                    {
                        $pull: {
                            reactionId,
                            reactionBody,
                            username,
                        },
                    },
                    {new: true}
                );
            }
            throw new AuthenticationError("You must be logged in!")
        },
    },
}

module.exports = resolvers;