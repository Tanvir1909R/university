import  express  from "express"
import { createAdmin, createFaculty, createsStudent } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createAdminZodSchema, createFacultyZodSchema, createStudentZodSchema } from "./user.validation"
const route = express.Router()

route.post('/create-student', validateRequest(createStudentZodSchema) , createsStudent)
route.post('/create-faculty', validateRequest(createFacultyZodSchema) , createFaculty)
route.post('/create-admin', validateRequest(createAdminZodSchema) , createAdmin)


export default route