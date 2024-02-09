"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./envConfig"));
const logger_1 = require("./logger");
process.on('uncaughtException', err => {
    logger_1.errorLogger.error('uncaught exception');
    process.exit(1);
});
let server;
mongoose_1.default
    .connect(`${envConfig_1.default.database_url}`)
    .then(() => {
    logger_1.logger.info("database connect");
    server = app_1.default.listen(5000, () => {
        logger_1.logger.info("server start at 5000");
    });
})
    .catch((er) => {
    logger_1.errorLogger.error(er.message);
});
process.on("unhandledRejection", (err) => {
    console.log("unhandle reject we are closing....");
    if (server) {
        server.close(() => {
            logger_1.errorLogger.error(err);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on('SIGTERM', () => {
    logger_1.logger.info('sigterm received');
    if (server) {
        server.close();
    }
});
