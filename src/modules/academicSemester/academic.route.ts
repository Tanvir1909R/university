import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import {academicZodSchema, updateAcademicZodSchema} from './academic.valication'
import { createAcademicSemester, getAcademicSemester, getSingleSemester, updateAcademicSemester } from './academic.controller'
const route = express.Router()


route.post('/create', validateRequest(academicZodSchema),createAcademicSemester)
route.get('/:id', getSingleSemester)
route.patch('/:id', validateRequest(updateAcademicZodSchema),updateAcademicSemester)
route.get('/', getAcademicSemester)

export default route