import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(),'.env')})

export default {
    database_url:process.env.DATABASE_URL,
    default_pass:process.env.DEFAULT_PASSWORD,
    env:process.env.NODE_ENV,
    jwt:{
        secret:process.env.JWT_SECRET,
        refresh_secret:process.env.JWT_REFRESH_SECRET,
        expire_in:process.env.JWT_EXPIRES_IN,
        refresh_expire_in:process.env.JWT_REFRESH_EXPIRES_IN
    }
}