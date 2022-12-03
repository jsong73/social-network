const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat")

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "You need to leave a thought!",
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    versionKey: false,
  }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
