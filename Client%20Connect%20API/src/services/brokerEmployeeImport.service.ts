const { BrokerEmployee, BrokerLead, sequelize } = require("../models");
import { brokerImportEmployeesSchema } from "../utils/brokerValidation";
import { v4 as uuidv4 } from "uuid";

export interface BrokerImportResult {
  success: boolean;
  totalEmployees: number;
  insertedEmployees: number;
  duplicateEmployees: number;
  message?: string;
  errors?: any[];
}

export const brokerImportEmployeesService = async (leadId: string, employees: any[]): Promise<BrokerImportResult> => {
  const t = await sequelize.transaction();

  try {
    // 1. Validation
    try {
      await brokerImportEmployeesSchema.validate({ lead_id: leadId, employees }, { abortEarly: false });
    } catch (validationError: any) {
      const formattedErrors = validationError.inner.map((err: any) => ({
        row: err.path,
        field: err.path.split(".").pop(),
        message: err.message,
      }));
      return { success: false, totalEmployees: employees.length, insertedEmployees: 0, duplicateEmployees: 0, errors: formattedErrors };
    }

    // 2. Verify Lead Exists
    const lead = await BrokerLead.findByPk(leadId, { transaction: t });
    if (!lead) {
      await t.rollback();
      return {
        success: false,
        totalEmployees: employees.length,
        insertedEmployees: 0,
        duplicateEmployees: 0,
        message: "Lead not found. Please provide a valid Lead ID.",
      };
    }

    // 3. Duplicate Detection (within the lead)
    const existingEmployees = await BrokerEmployee.findAll({
      where: { lead_id: leadId },
      attributes: ["id_number"],
      transaction: t,
    });

    const existingIdNumbers = new Set(existingEmployees.map((emp: any) => emp.id_number));
    
    const employeesToInsert: any[] = [];
    let duplicateCount = 0;

    employees.forEach((emp) => {
      if (existingIdNumbers.has(emp.idNumber)) {
        duplicateCount++;
      } else {
        employeesToInsert.push({
          employee_id: uuidv4(),
          lead_id: leadId,
          first_name: emp.firstName,
          last_name: emp.surname,
          gender: emp.gender,
          salary: emp.income,
          date_of_birth: emp.dateOfBirth,
          id_number: emp.idNumber,
          id_type: "ID", 
          is_active: true,
        });
        existingIdNumbers.add(emp.idNumber);
      }
    });

    // 3. Bulk Insert
    if (employeesToInsert.length > 0) {
      await BrokerEmployee.bulkCreate(employeesToInsert, { transaction: t });
    }

    await t.commit();

    return {
      success: true,
      totalEmployees: employees.length,
      insertedEmployees: employeesToInsert.length,
      duplicateEmployees: duplicateCount,
    };
  } catch (error: any) {
    if (t) await t.rollback();
    console.error("BROKER IMPORT EMPLOYEES SERVICE ERROR:", error);
    throw error;
  }
};
