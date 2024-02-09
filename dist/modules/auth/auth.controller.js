"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const user_schema_1 = __importDefault(require("../users/user.schema"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = __importDefault(require("../../envConfig"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, password } = req.body;
        const user = new user_schema_1.default();
        const isExist = yield user.isExist(id); // methods create on userSchema.ts
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'user dose not exist');
        }
        const isPasswordMatch = yield user.isPasswordMatch(password, isExist === null || isExist === void 0 ? void 0 : isExist.password);
        if (!isPasswordMatch) {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "password is incorrect");
        }
        const accessToken = jsonwebtoken_1.default.sign({
            id: isExist === null || isExist === void 0 ? void 0 : isExist.id,
            role: isExist === null || isExist === void 0 ? void 0 : isExist.role
        }, envConfig_1.default.jwt.secret, {
            expiresIn: envConfig_1.default.jwt.expire_in
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
