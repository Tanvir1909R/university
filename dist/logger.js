"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const { timestamp, combine, label, printf } = winston_1.format;
const path_1 = __importDefault(require("path"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
//custom logger
const infoFormat = printf(({ level, message, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${`${date.toDateString()} ${hour}:${minute}`} ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(timestamp(), infoFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'successes', '%DATE%.log'),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        })
    ],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
    level: "error",
    format: winston_1.format.json(),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join(process.cwd(), 'logs', 'errors', '%DATE%.log'),
            datePattern: "YYYY-MM-DD-HH",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d"
        })
    ],
});
exports.errorLogger = errorLogger;
