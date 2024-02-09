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
exports.deleteAcademicSemester = exports.updateAcademicSemester = exports.getSingleSemester = exports.getAcademicSemester = exports.createAcademicSemester = void 0;
const academic_schema_1 = require("./academic.schema");
const apiError_1 = __importDefault(require("../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../pick"));
const common_1 = require("../../utils/common");
const pagination_helper_1 = __importDefault(require("../../helper/pagination.helper"));
const academicTitleCode = {
    autumn: "01",
    summer: "02",
    fall: "03",
};
const createAcademicSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (academicTitleCode[data.title] !== data.code) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid semester code");
        }
        const result = yield academic_schema_1.AcademicSemester.create(data);
        res.status(200).json({
            success: true,
            message: "Academic semester is created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createAcademicSemester = createAcademicSemester;
const getAcademicSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // searching
        const _a = (0, pick_1.default)(req.query, ["search", "title", "code"]), { search } = _a, filterData = __rest(_a, ["search"]);
        const searchAbleField = ["title", "code"];
        const andCondition = [];
        if (search) {
            andCondition.push({
                $or: searchAbleField.map((field) => ({
                    [field]: {
                        $regex: search,
                        $options: 'i'
                    }
                }))
            });
        }
        if (Object.keys(filterData).length) {
            andCondition.push({
                $and: Object.entries(filterData).map(([field, value]) => ({
                    [field]: value
                }))
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
        const result = yield academic_schema_1.AcademicSemester.find(findCondition)
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
        const total = yield academic_schema_1.AcademicSemester.countDocuments();
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
exports.getAcademicSemester = getAcademicSemester;
const getSingleSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield academic_schema_1.AcademicSemester.findById(id);
        res.status(200).json({
            success: true,
            message: "Academic semester get successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getSingleSemester = getSingleSemester;
const updateAcademicSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const payload = req.body;
        if (academicTitleCode[payload.title] !== payload.code) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Invalid semester code");
        }
        const result = yield academic_schema_1.AcademicSemester.findOneAndUpdate({ _id: id }, payload, { new: true });
        res.status(200).json({
            success: true,
            message: "Academic semester update successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAcademicSemester = updateAcademicSemester;
const deleteAcademicSemester = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield academic_schema_1.AcademicSemester.findOneAndDelete({ _id: id });
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
exports.deleteAcademicSemester = deleteAcademicSemester;
