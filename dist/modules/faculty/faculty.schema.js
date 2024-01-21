"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faculty = void 0;
const mongoose_1 = require("mongoose");
const facultySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"],
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    },
    designation: {
        type: String,
        required: true,
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicDepartments",
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "academicFaculties",
    },
    profileImage: {
        type: String,
    },
});
exports.Faculty = (0, mongoose_1.model)("faculties", facultySchema);
