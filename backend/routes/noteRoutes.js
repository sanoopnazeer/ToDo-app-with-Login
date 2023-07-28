const Note = require("../models/noteModel");
const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

router.post("/addItem", async (req, res) => {
  try {
    const content = req.body.item;
    const userId = req.body.id;
    const newNote = await Note.create( {content, userId} );
    await newNote.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/getAllNotes/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const allNotes = await Note.find({userId: userId}).sort({ createdAt: -1 });
    return res.status(200).json({ status: true, allNotes: allNotes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/deleteNote/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    await Note.findByIdAndDelete(noteId);
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.patch("/completeTask/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const isCompleted = req.body.isChecked;
    await Note.updateOne({ _id: noteId }, { $set: { isCompleted } });
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.patch("/saveNote/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const content = req.body.item;
    await Note.updateOne({ _id: noteId }, { $set: { content } });
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

/* User Routes */

router.post("/register", async (req, res) => {
  try {
    const newUser = req.body;
    const data = await User.create(newUser);
    await data.save();
    return res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("access-token", token)
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
