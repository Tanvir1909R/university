import mongoose from 'mongoose'
import app from './app';
import envConfig from './envConfig';

mongoose.connect(`${envConfig.database_url}`)
.then(()=>{
    console.log('database connect');
    app.listen(5000,()=>{
        console.log('server start at 5000');
    })
})
.catch(er=>{
    console.log(er.message);
})