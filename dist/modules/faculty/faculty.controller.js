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
exports.updateFaculty = exports.findOneFaculty = exports.getAllFaculty = void 0;
const faculty_schema_1 = require("./faculty.schema");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const getAllFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield faculty_schema_1.Faculty.find({}).populate('department').populate('faculty');
        res.status(200).json({
            success: true,
            message: " successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllFaculty = getAllFaculty;
const findOneFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield faculty_schema_1.Faculty.find({ _id: req.params.id }).populate('department').populate('faculty');
        res.status(200).json({
            success: true,
            message: "faculty found successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.findOneFaculty = findOneFaculty;
const updateFaculty = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { name } = _a, facultyObj = __rest(_a, ["name"]);
        const isExist = yield faculty_schema_1.Faculty.findOne({ _id: req.params.id });
        if (!isExist) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "student not found");
        }
        const updatedFaculty = Object.assign({}, facultyObj);
        //dynamic update for name
        if (name && Object.keys(name).length > 0) {
            Object.keys(name).map((key) => {
                const keyName = `name.${key}`;
                updatedFaculty[keyName] = name[key];
            });
        }
        const result = yield faculty_schema_1.Faculty.findOneAndUpdate({ _id: req.params.id }, updatedFaculty, { new: true });
        res.status(200).json({
            success: true,
            message: "faculty update successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateFaculty = updateFaculty;
