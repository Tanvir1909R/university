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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const user_route_1 = __importDefault(require("./modules/users/user.route"));
const academic_route_1 = __importDefault(require("./modules/academicSemester/academic.route"));
const faculty_route_1 = __importDefault(require("./modules/academicFaculty/faculty.route"));
const department_route_1 = __importDefault(require("./modules/academicDepartment/department.route"));
const student_route_1 = __importDefault(require("./modules/student/student.route"));
const faculty_route_2 = __importDefault(require("./modules/faculty/faculty.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('welcome to the server');
    // Promise.reject()
}));
app.use('/user', user_route_1.default);
app.use('/student', student_route_1.default);
app.use('/academic', academic_route_1.default);
app.use('/faculty', faculty_route_1.default);
app.use('/department', department_route_1.default);
app.use('/faculty-user', faculty_route_2.default);
app.use('/auth', auth_route_1.default);
// error handler
app.use(globalErrorHandler_1.default);
// handle not found error
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not found",
        errorMessage: [
            {
                Path: req.originalUrl,
                message: "Route not found"
            }
        ]
    });
    next();
});
exports.default = app;
