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
exports.deleteStudent = exports.updateStudent = exports.getSingleStudent = exports.getStudent = void 0;
const pick_1 = __importDefault(require("../../pick"));
const common_1 = require("../../utils/common");
const pagination_helper_1 = __importDefault(require("../../helper/pagination.helper"));
const student_schema_1 = require("./student.schema");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const getStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // searching
        const _a = (0, pick_1.default)(req.query, [
            "search",
            "id",
            "email",
            "contactNo",
        ]), { search } = _a, filterData = __rest(_a, ["search"]);
        const searchAbleField = ["id", "email", "name.firstName", "name.lastName"];
        const andCondition = [];
        if (search) {
            andCondition.push({
                $or: searchAbleField.map((field) => ({
                    [field]: {
                        $regex: search,
                        $options: "i",
                    },
                })),
            });
        }
        if (Object.keys(filterData).length) {
            andCondition.push({
                $and: Object.entries(filterData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
        const findCondition = andCondition.length > 0 ? { $and: andCondition } : {};
        // pagination
        const paginationOption = (0, pick_1.default)(req.query, common_1.filterFields);
        const { page, limit, skip, sortBy, sortOrder } = (0, pagination_helper_1.default)(paginationOption);
        const sortCondition = {};
        if (sortBy && sortOrder) {
            sortCondition[sortBy] = sortOrder;
        }
        const result = yield student_schema_1.Students.find(findCondition)
            .populate("semester")
            .populate("department")
            .populate("faculty")
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
        const total = yield student_schema_1.Students.countDocuments(findCondition);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "data get successfully",
            data: result,
            meta: {
                page: page,
                limit: limit,
                total: total,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getStudent = getStudent;
const getSingleStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_schema_1.Students.findById(id)
            .populate("semester")
            .populate("department")
            .populate("faculty");
        res.status(200).json({
            success: true,
            message: "student get successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleStudent = getSingleStudent;
const updateStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const _b = req.body, { name, guardian, localGuardian } = _b, studentObj = __rest(_b, ["name", "guardian", "localGuardian"]);
        const isExist = yield student_schema_1.Students.findOne({ _id: id });
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "student not found");
        }
        const newStudent = Object.assign({}, studentObj);
        // dynamic handle
        if (name && Object.keys(name).length > 0) {
            Object.keys(name).forEach((key) => {
                const keyName = `name.${key}`;
                newStudent[keyName] = name[key];
            });
        }
        if (guardian && Object.keys(guardian).length > 0) {
            Object.keys(guardian).forEach((key) => {
                const keyGuardian = `guardian.${key}`;
                newStudent[keyGuardian] = guardian[key];
            });
        }
        if (localGuardian && Object.keys(localGuardian).length > 0) {
            Object.keys(localGuardian).forEach((key) => {
                const keyLocalGuardian = `localGuardian.${key}`;
                newStudent[keyLocalGuardian] = localGuardian[key];
            });
        }
        const result = yield student_schema_1.Students.findOneAndUpdate({ _id: id }, newStudent, { new: true });
        res.status(200).json({
            success: true,
            message: "Student update successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield student_schema_1.Students.findOneAndDelete({ _id: id })
            .populate("semester")
            .populate("department")
            .populate("faculty");
        res.status(200).json({
            success: true,
            message: "Academic semester deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteStudent = deleteStudent;
