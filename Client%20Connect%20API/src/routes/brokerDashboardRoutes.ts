import { Router } from "express";
import { getBrokerDashboardStats } from "../controllers/brokerDashboardController";

const router = Router();

router.get("/metrics", getBrokerDashboardStats);

export default router;
