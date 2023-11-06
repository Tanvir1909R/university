import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import academicZodSchema from './academic.valication'
import { createAcademicSemester, getAcademicSemester } from './academic.controller'
const route = express.Router()


route.post('/create', validateRequest(academicZodSchema),createAcademicSemester)
route.get('/', getAcademicSemester)

export default route