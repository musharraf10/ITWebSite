import {Router} from "express";
import { deleteNotifications, getOneNotification, getNotifications, postNotifications, updateNotification } from "../controllers/notify.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const notificationRouter = new Router();

notificationRouter.get("/notifications", getNotifications);
notificationRouter.get("/notification/:id",isAuth, getOneNotification);
notificationRouter.post("/notification",isAuth, postNotifications);
notificationRouter.delete("/notification/:id",isAuth, deleteNotifications);
notificationRouter.put("/notification/:id",isAuth, updateNotification);


export default notificationRouter;
