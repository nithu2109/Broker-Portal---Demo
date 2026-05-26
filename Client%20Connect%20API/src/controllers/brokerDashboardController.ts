import { Request, Response } from "express";
import { BrokerDashboardService } from "../services/brokerDashboard.service";

const dashboardService = new BrokerDashboardService();

/**
 * @swagger
 * /broker/dashboard/metrics:
 *   get:
 *     summary: Get dashboard statistics for the authenticated broker representative
 *     tags: [Broker Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     activeLeads:
 *                       type: integer
 *                     activeQuotes:
 *                       type: integer
 *                     quotesExpiredToday:
 *                       type: integer
 *                     failedInvoices:
 *                       type: integer
 *       401:
 *         description: User not authenticated
 *       403:
 *         description: User not authorized
 *       500:
 *         description: Internal server error
 */
export const getBrokerDashboardStats = async (req: Request, res: Response) => {
  try {
    const authReq = req as any;
    const representativeId = authReq?.auth?.payload?.rmaAppAppMetadata?.representativeId;

    if (!representativeId) {
      return res.status(401).json({
        success: false,
        message: "Representative ID not found in token.",
      });
    }

    const stats = await dashboardService.getDashboardStats(String(representativeId));

    return res.status(200).json({
      success: true,
      message: "Broker dashboard stats retrieved successfully.",
      data: stats,
    });
  } catch (err: any) {
    console.error("Error fetching broker dashboard stats:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "An error occurred while fetching dashboard stats",
    });
  }
};
