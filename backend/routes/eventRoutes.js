import express from "express";
import { addAttendee, createEvent, deleteEvent, getEventById, getEvents, searchEvents, sendReminder } from "../controllers/eventcontroller.js";


const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);
router.post("/attendees/:eventId", addAttendee);
router.post("/reminder/:eventId", sendReminder);
router.get("/search", searchEvents);
router.get("/:id", getEventById);

export default router;
