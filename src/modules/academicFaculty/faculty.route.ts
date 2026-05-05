import { Router } from 'express'
import { createFaculty, deleteFaculty, findFaculty, updateFaculty } from './faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyZodSchema } from './faculty.validation'
import authCheck from '../../middlewares/authCheck'
import { USER_ROLE } from '../../enums/user'

const route = Router()

route.post('/create', validateRequest(createFacultyZodSchema),
    // authCheck(USER_ROLE.ADMIN), 
    createFaculty)
route.patch('/update/:id',
    // authCheck(USER_ROLE.ADMIN,USER_ROLE.FACULTY), 
    updateFaculty)
route.patch('/delete/:id',
    // authCheck(USER_ROLE.ADMIN),
    deleteFaculty)
route.get('/',
    // authCheck(USER_ROLE.ADMIN,USER_ROLE.FACULTY,USER_ROLE.STUDENT), 
    findFaculty)

export default route