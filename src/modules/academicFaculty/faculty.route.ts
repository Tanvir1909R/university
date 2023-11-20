import { Router } from 'express'
import { createFaculty, deleteFaculty, findFaculty, updateFaculty } from './faculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyZodSchema } from './faculty.validation'

const route = Router()

route.post('/create', validateRequest(createFacultyZodSchema), createFaculty)
route.patch('/update/:id', updateFaculty)
route.patch('/delete/:id', deleteFaculty)
route.get('/', findFaculty)

export default route