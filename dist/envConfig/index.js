"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    database_url: process.env.DATABASE_URL,
    default_pass: process.env.DEFAULT_PASSWORD,
    env: process.env.NODE_ENV,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expire_in: process.env.JWT_EXPIRES_IN,
        refresh_expire_in: process.env.JWT_REFRESH_EXPIRES_IN
    }
};
