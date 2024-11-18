import express from 'express'
import multer from 'multer'
import { addEvent, approveEvents,  getUserEvents,  listEvent, markOutdatedEvents, rejectEvents, removeEvent, showEvents } from '../controllers/eventController.js';
import authMiddleware from '../middleware/auth.js';

const eventRouter = express.Router();



//image storage engine

const storage = multer.diskStorage({

    destination:"uploads",
    filename:(req,file,cb)=>{

        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

eventRouter.post("/add",upload.single("image"),addEvent)
eventRouter.get("/list",listEvent)
eventRouter.post("/remove",removeEvent)
eventRouter.get("/:id",showEvents)
eventRouter.post("/approve",approveEvents)
eventRouter.post("/reject",rejectEvents)
eventRouter.post('/mark-outdated', markOutdatedEvents);
eventRouter.post("/userevents",authMiddleware,getUserEvents);



export default eventRouter;