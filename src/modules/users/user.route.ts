import  express  from "express"
import { createUser } from "./user.controller"
import validateRequest from "../../middlewares/validateRequest"
import createUserZodSchema from "./user.validation"
const route = express.Router()

route.post('/create', validateRequest(createUserZodSchema) , createUser)


export default route