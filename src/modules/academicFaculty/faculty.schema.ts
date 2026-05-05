import { Schema, model } from "mongoose"

interface iAcademicFaculty{
    title:string,
    syncId:string
}

const AcademicFacultySchema = new Schema({
    title:{
        type:String,
        require:true
    },
    syncId:String
},{
    timestamps:true,
    toJSON:{
        virtuals:true
    }
})

const AcademicFaculty = model<iAcademicFaculty>("academicFaculties", AcademicFacultySchema)

export default AcademicFaculty