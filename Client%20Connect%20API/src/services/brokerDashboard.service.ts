import { BrokerDashboardRepository } from "../repositories/brokerDashboard.repository";

const dashboardRepo = new BrokerDashboardRepository();

export class BrokerDashboardService {
  async getDashboardStats(representativeId: string) {
    const [activeLeads, activeQuotes, quotesExpiredToday] = await Promise.all([
      dashboardRepo.countActiveLeads(representativeId),
      dashboardRepo.countActiveQuotes(representativeId),
      dashboardRepo.countQuotesExpiringToday(representativeId),
    ]);

    // Active failed invoices - as requested, set to 0 as no DB exists for this yet
    const failedInvoices = 0;

    return {
      activeLeads,
      activeQuotes,
      quotesExpiredToday,
      failedInvoices,
    };
  }
}
