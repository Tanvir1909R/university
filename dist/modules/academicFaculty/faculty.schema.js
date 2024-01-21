"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AcademicFacultySchema = new mongoose_1.Schema({
    title: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});
const AcademicFaculty = (0, mongoose_1.model)("academicFaculties", AcademicFacultySchema);
exports.default = AcademicFaculty;
