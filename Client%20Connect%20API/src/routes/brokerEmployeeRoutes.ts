import { Router } from "express";
import { brokerImportEmployeesController } from "../controllers/brokerEmployeeImportController";

const router = Router();

router.post("/import", brokerImportEmployeesController);

export default router;
