import mongoose from "mongoose";
import app from "./app";
import envConfig from "./envConfig";
import { errorLogger, logger } from "./logger";
import { Server } from "http";
import { RedisClient } from "./redis";
import subscribeToEvent from "./events";

process.on("uncaughtException", (err) => {
  errorLogger.error("uncaught exception");
  process.exit(1);
});

let server: Server;
const db = async () => {
  try {
    await RedisClient.connect().then(()=>{
      subscribeToEvent()
    })
    await mongoose.connect(`${envConfig.database_url}`);
    server = app.listen(5000, () => {
      logger.info("server start at 5000");
    });
  } catch (error) {
    logger.error(error);
  }
};
db()
// mongoose
//   .connect(`${envConfig.database_url}`)
//   .then(() => {
//     logger.info("database connect");
//     server = app.listen(5000, () => {
//       logger.info("server start at 5000");
//     });
//   })
//   .catch((er) => {
//     errorLogger.error(er.message);
//   });

process.on("unhandledRejection", (err) => {
  console.log("unhandle reject we are closing....");

  if (server) {
    server.close(() => {
      errorLogger.error(err);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("SIGTERM", () => {
  logger.info("sigterm received");
  if (server) {
    server.close();
  }
});
