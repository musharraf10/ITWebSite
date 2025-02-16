import {Router} from "express";
import { deleteUsers, getOneUser, getUsers, postUsers, updateUser } from "../controllers/user.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const UserRouter = new Router();

UserRouter.get("/users",isAuth, getUsers);
UserRouter.get("/user/:id",isAuth, getOneUser);
UserRouter.post("/user",isAuth, postUsers);
UserRouter.delete("/user/:id",isAuth, deleteUsers);
UserRouter.put("/user/:id",isAuth, updateUser);


export default UserRouter;
