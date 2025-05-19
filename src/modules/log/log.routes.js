import { Router } from "express";
import { createLog, getAllLogs } from "./log.controller.js";

const logRoutes = Router()

logRoutes.get('/',getAllLogs)
logRoutes.post('/',createLog)

export default logRoutes