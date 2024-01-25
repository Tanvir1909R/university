import {Router} from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidationZodSchema } from './auth.validation'
import { loginUser } from './auth.controller'

const route = Router()

route.post('/login',validateRequest(authValidationZodSchema), loginUser)
export default route