"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: {
            firstName: {
                type: String,
                required: true,
            },
            middleName: {
                type: String,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        required: true,
    },
    dateOfBirth: String,
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNo: {
        type: String,
        required: true,
        unique: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: {
        required: true,
        type: {
            fatherName: {
                type: String,
                required: true,
            },
            fatherOccupation: {
                type: String,
                required: true,
            },
            fatherContactNo: {
                type: String,
                required: true,
            },
            motherName: {
                type: String,
                required: true,
            },
            motherOccupation: {
                type: String,
                required: true,
            },
            motherContactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    localGuardian: {
        required: true,
        type: {
            name: {
                type: String,
                required: true,
            },
            occupation: {
                type: String,
                required: true,
            },
            contactNo: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
        },
    },
    profileImg: {
        type: String,
    },
    semester: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicSemesters",
        required: true,
    },
    department: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicDepartments",
        required: true,
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "academicFaculties",
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Students = (0, mongoose_1.model)("students", studentSchema);
