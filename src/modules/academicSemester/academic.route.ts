import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {academicZodSchema, updateAcademicZodSchema} from './academic.valication'
import { createAcademicSemester, deleteAcademicSemester, getAcademicSemester, getSingleSemester, updateAcademicSemester } from './academic.controller'
const route = express.Router()


route.post('/create', validateRequest(academicZodSchema),createAcademicSemester)
route.get('/:id', getSingleSemester)
route.patch('/:id', validateRequest(updateAcademicZodSchema),updateAcademicSemester)
route.delete('/:id', deleteAcademicSemester)
route.get('/', getAcademicSemester)

export default route