import express from "express"
import { protect } from "../middleware/auth.js"
import User from "../models/User.js"

const router = express.Router()

router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      user.username = req.body.username || user.username
      user.email = req.body.email || user.email
      if (req.body.password) {
        user.password = req.body.password
      }
      const updatedUser = await user.save()
      res.json({
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      })
    } else {
      res.status(404).json({ message: "User not found" })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router

