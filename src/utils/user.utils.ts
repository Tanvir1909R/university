import Users from "../modules/users/user.schema"

// student----
type iAcademicSemester={
    code:string,
    year:string
}

export const findLastStudentId = async():Promise<string |undefined > =>{
    const lastStudent = await Users.findOne({},{id:1,_id:0}).sort({createdAt:-1}).lean();
    return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
}

export const generateStudentId = async(academicSemester:iAcademicSemester | null)=>{
    const currentId = (await findLastStudentId()) || (0).toString().padStart(5,'0')
    let incId = (parseInt(currentId) + 1).toString().padStart(5,'0')
    incId = `${academicSemester?.year.substring(2)}${academicSemester?.code}${incId}`
    return incId
}


// faculty--------
export const findLastFacultyId = async():Promise<string |undefined > =>{
    const lastFaculty = await Users.findOne({role:'faculty'},{id:1,_id:0}).sort({createdAt:-1}).lean();
    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined
}

export const generateFacultyId = async():Promise<string> =>{
    const currentId = (await findLastFacultyId()) || (0).toString().padStart(5,'0')
    let incId = (parseInt(currentId) + 1).toString().padStart(5,'0')
    incId = `F-${incId}`
    return incId
}