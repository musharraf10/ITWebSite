import {Router} from "express";
import { getEmployeePerformance, getSalaryAndBonusData, updateSalaryOrBonus } from "../controllers/employee.controller.js";
import { generateLastMonthInvoice } from "../controllers/eInvoice.controller.js";
import { getTasksForEmployee } from "../controllers/task.controller.js";
import { isAuth } from "../middlewares/isAuth.js";

const empRouter = new Router();

empRouter.route("/updateemppayment").put(updateSalaryOrBonus)

empRouter.route("/emppaymenthistory").get(getSalaryAndBonusData)

empRouter.route("/empinvoice").get(generateLastMonthInvoice)

empRouter.route("/mytask").get(isAuth, getTasksForEmployee);

empRouter.route("/mytask/performance").get(isAuth, getEmployeePerformance);

export default empRouter;