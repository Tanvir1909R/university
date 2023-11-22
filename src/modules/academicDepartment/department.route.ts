import { Router } from 'express'
import { createDepartment,deleteDepartment,findDepartment,updateDepartment } from './department.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createDepartmentZodSchema } from './department.validation'

const route = Router()

route.post('/create', validateRequest(createDepartmentZodSchema), createDepartment)
route.patch(':id', updateDepartment)
route.delete('/:id', deleteDepartment)
route.get('/', findDepartment)

export default route