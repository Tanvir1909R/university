import  express  from "express"
import { deleteStudent, getSingleStudent, getStudent, updateStudent } from "./student.controller"
import validateRequest from "../../middlewares/validateRequest"
import { studentValidationZodSchema } from "./student.validation"
const route = express.Router()

route.get('/' , getStudent)
route.patch('/:id',validateRequest(studentValidationZodSchema),updateStudent)
route.get('/:id', getSingleStudent)
route.delete('/:id', deleteStudent)


export default route