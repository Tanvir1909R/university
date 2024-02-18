import {Router} from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidationZodSchema, refreshTokenZodSchema } from './auth.validation'
import { loginUser, refreshToken } from './auth.controller'

const route = Router()

route.post('/login',validateRequest(authValidationZodSchema), loginUser)
route.post('/refresh-token', validateRequest(refreshTokenZodSchema),refreshToken)
export default route