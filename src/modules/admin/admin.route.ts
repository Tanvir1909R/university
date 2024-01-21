import  express  from "express"
import { findOneAdmin, getAllAdmin, updateAdmin } from "./admin.controller"
import validateRequest from "../../middlewares/validateRequest"
import { adminValidationZobSchema } from "./admin.validation"
const route = express.Router()

route.get('/', getAllAdmin)
route.get('/:id', findOneAdmin)
route.patch('/:id', validateRequest(adminValidationZobSchema) , updateAdmin)

export default route