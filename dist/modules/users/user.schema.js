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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
        select: 0 // this line for not return this password after create this document 
    },
    needPasswordChange: {
        type: Boolean,
        default: true
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'students',
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'faculties',
    },
    admin: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'admins',
    }
}, {
    timestamps: true,
});
userSchema.methods.isExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield Users.findOne({ id }, { id: 1, role: 1, password: 1, needPasswordChange: 1 });
        return user;
    });
};
userSchema.methods.isPasswordMatch = function (givenPass, savePass) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPass, savePass);
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        next();
    });
});
const Users = (0, mongoose_1.model)('users', userSchema);
exports.default = Users;
