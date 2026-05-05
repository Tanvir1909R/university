import {Router} from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidationZodSchema, passwordChangeZodSchema, refreshTokenZodSchema } from './auth.validation'
import { changePassword, loginUser, refreshToken } from './auth.controller'
import authCheck from '../../middlewares/authCheck'
import { USER_ROLE } from '../../enums/user'

const route = Router()

route.post('/login',validateRequest(authValidationZodSchema), loginUser)
route.post('/refresh-token', validateRequest(refreshTokenZodSchema),refreshToken)
route.post('/change-password', validateRequest(passwordChangeZodSchema),authCheck(USER_ROLE.ADMIN,USER_ROLE.FACULTY,USER_ROLE.STUDENT), changePassword)
export default route