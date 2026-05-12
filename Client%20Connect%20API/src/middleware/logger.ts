import * as winston from "winston";
const WinstonTransportSequelize = require("winston-transport-sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const Sequelize = require("sequelize");

let sequelize: any;
let dbTransport: any = null;

// Create sequelize instance but don't connect immediately
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

// Initialize database transport lazily
const initializeDbTransport = () => {
  if (!dbTransport) {
    try {
      const options = {
        sequelize: sequelize,
        tableName: "logs",
        meta: { project: "rma" },
        fields: { meta: Sequelize.JSONB },
        modelOptions: { timestamps: true },
        level: process.env.LOGLEVEL || "info",
      };
      dbTransport = new WinstonTransportSequelize(options);
    } catch (err) {
      console.warn("Failed to initialize database transport:", err);
    }
  }
  return dbTransport;
};

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOGLEVEL || "info",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

// Add database transport after a delay to allow server to start
setTimeout(() => {
  const dbTransport = initializeDbTransport();
  if (dbTransport) {
    logger.add(dbTransport);
  }
}, 2000);
