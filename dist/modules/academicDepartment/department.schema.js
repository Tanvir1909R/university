"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AcademicDepartmentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculties",
        require: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
const AcademicDepartment = (0, mongoose_1.model)("academicDepartments", AcademicDepartmentSchema);
exports.default = AcademicDepartment;
