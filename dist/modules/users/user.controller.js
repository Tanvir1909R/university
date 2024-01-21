"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaculty = exports.createsStudent = void 0;
const envConfig_1 = __importDefault(require("../../envConfig"));
const user_schema_1 = __importDefault(require("./user.schema"));
const user_utils_1 = require("../../utils/user.utils");
const academic_schema_1 = require("../academicSemester/academic.schema");
const mongoose_1 = __importStar(require("mongoose"));
const student_schema_1 = require("../student/student.schema");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const faculty_schema_1 = require("../faculty/faculty.schema");
const createsStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { student } = _a, user = __rest(_a, ["student"]);
        if (!user.password) {
            user.password = envConfig_1.default.default_pass;
        }
        user.role = "student";
        const academicSemester = yield academic_schema_1.AcademicSemester.findById(student.semester);
        const session = yield mongoose_1.default.startSession();
        let newUserAllData = null;
        try {
            session.startTransaction();
            const generateId = yield (0, user_utils_1.generateStudentId)(academicSemester);
            user.id = generateId;
            student.id = generateId;
            const newStudent = yield student_schema_1.Students.create([student], { session });
            if (!newStudent.length) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "failed to create a student");
            }
            user.student = newStudent[0]._id;
            const newUser = yield user_schema_1.default.create([user], { session });
            newUserAllData = newUser[0];
            if (!newUser.length) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "failed to create user");
            }
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
        if (newUserAllData) {
            newUserAllData = yield user_schema_1.default.findOne({ id: newUserAllData.id }).populate({
                path: "student",
                populate: [
                    { path: "semester" },
                    { path: "department" },
                    { path: "faculty" },
                ],
            });
        }
        res.status(200).json({
            success: true,
            message: "created successfully",
            data: newUserAllData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createsStudent = createsStudent;
const createFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _b = req.body, { faculty } = _b, user = __rest(_b, ["faculty"]);
        console.log(user);
        user.role = 'faculty';
        let userAllData = null;
        0;
        const session = yield (0, mongoose_1.startSession)();
        try {
            session.startTransaction();
            const generateId = yield (0, user_utils_1.generateFacultyId)();
            user.id = generateId;
            faculty.id = generateId;
            const newFaculty = yield faculty_schema_1.Faculty.create([faculty], { session });
            if (!newFaculty.length) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'fail to create faculty');
            }
            user.faculty = newFaculty[0]._id;
            const newUser = yield user_schema_1.default.create([user], { session });
            userAllData = newUser[0];
            if (!newUser.length) {
                throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "fail to create user");
            }
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (error) {
            yield session.abortTransaction();
            yield session.endSession();
            throw error;
        }
        if (userAllData) {
            userAllData = yield user_schema_1.default.findOne({ id: userAllData.id }).populate({
                path: "faculty",
                populate: [
                    { path: "department" },
                    { path: 'faculty' }
                ]
            });
        }
        res.status(200).json({
            success: true,
            message: "created successfully",
            data: userAllData,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createFaculty = createFaculty;
