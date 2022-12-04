const { AuthenticationError } = require("apollo-server-express");
const { User, Thought } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("thoughts");
    },
    user: async (parent, {username}) => {
      return User.findOne({ username }).popoulate("thoughts")
    },
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    thought: async (parent, { thoughtId }) => {
      return Thought.findOne({ _id: thoughtId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("thoughts");
      }
      throw new AuthenticationError("You must be logged in.");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email!");
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addThought: async (parent, { thoughtText }, context) => {
      if (context.user) {
        const thought = await Thought.create({
          thoughtText,
        });
        console.log(thought);
        await User.findOneAndUpdate(
          { _id: context.user._id },      
          { $push: { thoughts: thought._id } },
        );
        return thought;
      }
      throw new AuthenticationError("You must be logged in!");
    },
    addComment: async (parent, { thoughtId, commentText, username}, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          { $addtoSet: { comments: commentText, comments: username } },
          { new: true, runvalidators: true }
        );
      }
      throw new AuthenticationError("You must be logged in!");
    },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );
        return thought;
      }
      throw new AuthenticationError("You must be logged in!");
    },
    removeComment: async (parent, { thoughtId, commentId, username }, context) => {
      if (context.user) {
        return Thought.findOneAndUpdate(
          { _id: thoughtId },
          {
            $pull: {
              comments:{ username , _id: commentId}
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You must be logged in!");
    },
  },
};

module.exports = resolvers;
