import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: String,
    messages: [
      {
        text: String,
        user: String,
        timestamps: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
