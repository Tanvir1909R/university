"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'students',
    },
    faculty: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'faculties',
    },
    // admin:{
    //     type:Schema.Types.ObjectId,
    //     ref:'admins',
    // }
}, {
    timestamps: true,
});
const Users = (0, mongoose_1.model)('users', userSchema);
exports.default = Users;
