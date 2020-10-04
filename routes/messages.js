import express from "express";
import Room from "../models/Message.js";

const router = express.Router();

router.get("/rooms/sync", async (req, res) => {
  try {
    const rooms = await Room.find().sort("-updatedAt");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }

  //   await Message.find({}, (err, data) => {
  //     if (err) {
  //       res.status(500).send("Error: " + err);
  //     } else {
  //       res.status(201).json(data);
  //     }
  //   });
});

router.post("/rooms/new", async (req, res) => {
  const { name } = req.body;

  const roomModel = new Room({
    name,
  });

  try {
    const room = await roomModel.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }

  //   const dbMessage = req.body;

  //   await Message.create(dbMessage, (err, data) => {
  //     if (err) {
  //       res.status(500).send("Error: " + err);
  //     } else {
  //       res.status(201).json(data);
  //     }
  //   });
});

router.put("/rooms/:id", async (req, res) => {
  const { text, user } = req.body;
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      room.messages.push({
        text,
        user,
      });

      const data = await room.save();

      res.status(200).send(data);
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

export default router;
