export interface iErrorResponse{
    statusCode:number,
    message:string,
    errorMessages:{
        path:string,
        message:string
    }[]
}