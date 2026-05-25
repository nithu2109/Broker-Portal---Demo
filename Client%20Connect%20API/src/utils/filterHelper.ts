import { Op } from "sequelize";

/**
 * Reusable utility to apply filtering, pagination, and sorting to Sequelize queries.
 * 
 * @param query req.query object
 * @param allowedFilters Array of fields allowed for direct filtering (e.g. ['lead_status', 'broker_id'])
 * @param dateField The field to use for date range filtering (default: 'createdAt')
 * @param searchableFields Array of fields to search by if 'search' parameter is provided
 */
export const applyFilters = (
  query: any, 
  allowedFilters: string[] = [], 
  dateField: string = "createdAt",
  searchableFields: string[] = []
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "DESC",
    search,
    dateFrom,
    dateTo,
  } = query;

  const where: any = {};

  // 1. Direct Field Filters
  allowedFilters.forEach((field) => {
    if (query[field] !== undefined && query[field] !== "") {
      const value = query[field];
      if (Array.isArray(value)) {
        where[field] = { [Op.in]: value };
      } else if (typeof value === "string" && value.includes(",")) {
        where[field] = { [Op.in]: value.split(",") };
      } else {
        // Handle ID, Enum, status, and boolean-like fields with strict equality
        const isStrict = ["id", "uuid", "status", "type", "method", "is_"].some(s => field.toLowerCase().includes(s));
        
        if (value === "true" || value === "false") {
          where[field] = value === "true";
        } else if (typeof value === "string" && !isStrict) {
          where[field] = { [Op.like]: `%${value}%` };
        } else {
          where[field] = value;
        }
      }
    }
  });

  // 2. Global Search
  if (search && searchableFields.length > 0) {
    where[Op.or] = searchableFields.map((field: string) => ({
      [field]: { [Op.like]: `%${search}%` },
    }));
  }

  // 3. Date Range
  if (dateFrom || dateTo) {
    where[dateField] = {};
    if (dateFrom) where[dateField][Op.gte] = new Date(dateFrom as string);
    if (dateTo) where[dateField][Op.lte] = new Date(dateTo as string);
  }

  const offset = (Number(page) - 1) * Number(limit);

  // 4. Handle Sorting (supports nested sorting like 'employer.employer_name')
  let order: any[] = [];
  if (sortBy) {
    if (String(sortBy).includes(".")) {
      const parts = String(sortBy).split(".");
      order = [[...parts, sortOrder as string]];
    } else {
      order = [[sortBy as string, sortOrder as string]];
    }
  } else {
    order = [[dateField, sortOrder as string]];
  }

  return {
    where,
    limit: Number(limit),
    offset: Number(offset),
    order,
    pagination: {
      page: Number(page),
      limit: Number(limit),
    },
  };
};
