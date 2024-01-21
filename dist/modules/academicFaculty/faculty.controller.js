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
exports.updateFaculty = exports.deleteFaculty = exports.findFaculty = exports.createFaculty = void 0;
const faculty_schema_1 = __importDefault(require("./faculty.schema"));
const http_status_1 = require("http-status");
const pick_1 = __importDefault(require("../../pick"));
const common_1 = require("../../utils/common");
const pagination_helper_1 = __importDefault(require("../../helper/pagination.helper"));
const createFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield faculty_schema_1.default.create(data);
        res.status(http_status_1.OK).json({
            success: true,
            message: "Academic faculty get successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createFaculty = createFaculty;
const findFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //search
        const _a = (0, pick_1.default)(req.query, ["search", "title"]), { search } = _a, filterData = __rest(_a, ["search"]);
        const searchAbleField = ["title"];
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
        //pagination
        const paginationOption = (0, pick_1.default)(req.query, common_1.filterFields);
        const { limit, page, skip, sortBy, sortOrder } = (0, pagination_helper_1.default)(paginationOption);
        const sortOrderFaculty = {};
        if (sortOrder && sortBy) {
            sortOrderFaculty[sortBy] = sortOrder;
        }
        const result = yield faculty_schema_1.default.find(findCondition).sort(sortOrderFaculty).skip(skip).limit(limit);
        res.status(http_status_1.OK).json({
            success: true,
            message: "data get successfully",
            data: result,
            meta: {
                page: page,
                limit: limit,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findFaculty = findFaculty;
const deleteFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield faculty_schema_1.default.findOneAndDelete({ _id: id }, req.body);
        res.status(http_status_1.OK).json({
            success: true,
            message: "Academic faculty deleted successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFaculty = deleteFaculty;
const updateFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield faculty_schema_1.default.findOneAndUpdate({ _id: id }, req.body, { new: true });
        res.status(http_status_1.OK).json({
            success: true,
            message: "Academic faculty updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateFaculty = updateFaculty;
