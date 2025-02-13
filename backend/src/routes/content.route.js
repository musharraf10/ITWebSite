import { Router } from "express";
import { 
    createContent,
    addService, 
    addProject, 
    updateContactUs, 
    updateLocation,
    updateAboutSection,
    getContent
} from "../controllers/content.controller.js";

import { isAuth, isAdmin } from "../middlewares/isAuth.js";

const contentRouter = new Router();

contentRouter.route('/content').get(getContent);

contentRouter.route('/content')
    .post(isAuth, isAdmin, createContent);

contentRouter.route('/content/about/:contentId')
    .put(isAuth, isAdmin, updateAboutSection);

contentRouter.route('/content/services/:contentId')
    .post(isAuth, isAdmin,  addService);

contentRouter.route('/content/projects/:contentId')
    .post(isAuth, isAdmin, addProject);

contentRouter.route('/content/contact/:contentId')
    .put(isAuth, isAdmin, updateContactUs);

contentRouter.route('/content/locations/:contentId')
    .put(isAuth, isAdmin, updateLocation);

export default contentRouter;
