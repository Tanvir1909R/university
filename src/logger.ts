import {createLogger, transports, format} from "winston";
const { timestamp, combine, label, printf } = format
import path from 'path'
import DailyRotateFile from "winston-daily-rotate-file";


//custom logger
const infoFormat = printf(({level, message, timestamp})=>{
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${`${date.toDateString()} ${hour}:${minute}`} ${level}: ${message}`
})



const logger = createLogger({
  level: "info",
  format: combine(timestamp(),infoFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(),'logs','successes','%DATE%.log'),
      datePattern:"YYYY-MM-DD-HH",
      zippedArchive:true,
      maxSize:"20m",
      maxFiles:"14d"
    })
  ],
});
const errorLogger = createLogger({
  level: "error",
  format: format.json(),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(process.cwd(),'logs','errors','%DATE%.log'),
      datePattern:"YYYY-MM-DD-HH",
      zippedArchive:true,
      maxSize:"20m",
      maxFiles:"14d"
    })
  ],
});

export { logger, errorLogger};
