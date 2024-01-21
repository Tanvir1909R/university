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
exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastStudentId = void 0;
const user_schema_1 = __importDefault(require("../modules/users/user.schema"));
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_schema_1.default.findOne({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
const generateStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0');
    let incId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incId = `${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.year.substring(2)}${academicSemester === null || academicSemester === void 0 ? void 0 : academicSemester.code}${incId}`;
    return incId;
});
exports.generateStudentId = generateStudentId;
// faculty--------
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield user_schema_1.default.findOne({ role: 'faculty' }, { id: 1, _id: 0 }).sort({ createdAt: -1 }).lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0');
    let incId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incId = `F-${incId}`;
    return incId;
});
exports.generateFacultyId = generateFacultyId;
