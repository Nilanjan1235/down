import express from 'express'
import { addMenu, approveItems, getUserMenus, listMenu, rejectItems, removeMenu, showDetails } from '../controllers/menuController.js';
import multer from 'multer'
import authMiddleware from '../middleware/auth.js';

const menuRouter = express.Router();



//image storage engine

const storage = multer.diskStorage({

    destination:"uploads",
    filename:(req,file,cb)=>{

        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage:storage})

menuRouter.post("/add",upload.single("image"),addMenu)
menuRouter.get("/list",listMenu)
menuRouter.post("/remove",removeMenu)
menuRouter.get("/:id",showDetails)
menuRouter.post("/approve",approveItems)
menuRouter.post("/reject",rejectItems)
menuRouter.post("/usermenus",authMiddleware, getUserMenus)
menuRouter.post("/ordermenu",authMiddleware, getUserMenus)



export default menuRouter;
