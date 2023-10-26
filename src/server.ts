import mongoose from 'mongoose'
import app from './app';
import envConfig from './envConfig';
import { errorLogger, logger } from './logger';

mongoose.connect(`${envConfig.database_url}`)
.then(()=>{
    logger.info('database connect');
    app.listen(5000,()=>{
        logger.info('server start at 5000');
    })
})
.catch(er=>{
    errorLogger.error(er.message);
})