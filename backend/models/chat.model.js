import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
    max: 10000,
  },
  sender: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [MessageSchema],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Chat = mongoose.model('Chat', ChatSchema);

export default Chat;