import {Router} from "express";
import { deleteCompanies, getOneCompany, getCompanies, postCompanies, updateCompany } from "../controllers/comp.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const companyRouter = new Router();

companyRouter.get("/companies", getCompanies);
companyRouter.post("/company",isAuth, postCompanies);
companyRouter.get("/company/:id",isAuth, getOneCompany);
companyRouter.delete("/company/:id",isAuth, deleteCompanies);
companyRouter.put("/company/:id",isAuth, updateCompany);

export default companyRouter;
