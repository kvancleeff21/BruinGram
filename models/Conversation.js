const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "users"
    }
  ],
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      text: {
        type: String
      },
      like: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users"
          }
        }
      ], 
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = Conversation = mongoose.model("conversation", ConversationSchema);