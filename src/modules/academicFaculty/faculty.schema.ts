import { Schema, model } from "mongoose"

interface iAcademicFaculty{
    title:string
}

const AcademicFacultySchema = new Schema({
    title:{
        type:String,
        require:true
    }
})

const AcademicFaculty = model<iAcademicFaculty>("academicFaculties", AcademicFacultySchema)

export default AcademicFaculty