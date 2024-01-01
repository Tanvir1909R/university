import  express  from "express"
import { findOneFaculty, getAllFaculty, updateFaculty } from "./faculty.controller"
import validateRequest from "../../middlewares/validateRequest"
import { facultyValidationZobSchema } from "./faculty.validation"
const route = express.Router()

route.get('/', getAllFaculty)
route.get('/:id', findOneFaculty)
route.patch('/:id', validateRequest(facultyValidationZobSchema) , updateFaculty)

export default route