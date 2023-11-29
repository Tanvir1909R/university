import  express  from "express"
import { createsStudent } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import { createStudentZodSchema } from "./user.validation"
const route = express.Router()

route.post('/create-student', validateRequest(createStudentZodSchema) , createsStudent)


export default route