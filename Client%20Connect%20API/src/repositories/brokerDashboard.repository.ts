const { BrokerLead, BrokerQuote } = require("../models");
const { Op } = require("sequelize");

export class BrokerDashboardRepository {
  async countActiveLeads(representativeId: string) {
    return await BrokerLead.count({
      where: {
        representative_id: representativeId,
        is_active: true,
      },
    });
  }

  async countActiveQuotes(representativeId: string) {
    return await BrokerQuote.count({
      include: [
        {
          model: BrokerLead,
          as: "lead",
          where: { representative_id: representativeId },
          required: true,
        },
      ],
      where: {
        quote_status: {
          [Op.notIn]: ["Expired", "Rejected", "Cancelled"],
        },
      },
    });
  }

  async countQuotesExpiringToday(representativeId: string) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    return await BrokerQuote.count({
      include: [
        {
          model: BrokerLead,
          as: "lead",
          where: { representative_id: representativeId },
          required: true,
        },
      ],
      where: {
        quote_expiry_date: {
          [Op.between]: [todayStart, todayEnd],
        },
      },
    });
  }
}
