import { Router } from "express";
import { getBrokerDashboardStats } from "../controllers/brokerDashboardController";

const router = Router();

router.get("/status", getBrokerDashboardStats);

export default router;
