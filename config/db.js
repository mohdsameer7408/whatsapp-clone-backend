import mongoose from "mongoose";
import Pusher from "pusher";

const connectDB = async () => {
  const dbUrl = `mongodb+srv://admin:${process.env.PASS}@cluster0.qvrc9.mongodb.net/whatsappDB?retryWrites=true&w=majority`;

  const pusher = new Pusher({
    appId: "1080594",
    key: "17927f8f600679dcc53f",
    secret: "60225277a207f7a1fd6e",
    cluster: "ap2",
    encrypted: true,
  });

  try {
    const conn = await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);

    const changeStream = mongoose.connection.collection("rooms").watch();

    changeStream.on("change", (change) => {
      console.log("Change stream triggered");
      console.log(change);
      console.log("End of change");

      if (change.operationType === "insert") {
        console.log("Pusher triggered room creation");

        const roomDetail = change.fullDocument;
        pusher.trigger("rooms", "inserted", {
          _id: roomDetail._id,
          messages: roomDetail.messages,
          name: roomDetail.name,
        });
      } else if (change.operationType === "update") {
        console.log("Pusher triggered add message");

        pusher.trigger("rooms", "inserted", {});
      } else {
        console.log("Unknown trigger from pusher!");
      }
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

export default connectDB;
