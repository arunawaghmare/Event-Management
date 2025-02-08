import express from "express"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.create({ username, email, password })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" })
      res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
    } else {
      res.status(401).json({ message: "Invalid email or password" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post("/guest-login", (req, res) => {
  const guestUser = { id: "guest", username: "Guest", email: "guest@example.com" }
  const token = jwt.sign({ id: guestUser.id }, process.env.JWT_SECRET, { expiresIn: "1d" })
  res.json({ token, user: guestUser })
})

export default router

