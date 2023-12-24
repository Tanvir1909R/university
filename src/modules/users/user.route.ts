import  express  from "express"
import { createFaculty, createsStudent } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createStudentZodSchema } from "./user.validation"
const route = express.Router()

route.post('/create-student', validateRequest(createStudentZodSchema) , createsStudent)
route.post('/create-faculty', validateRequest(createStudentZodSchema) , createFaculty)


export default route