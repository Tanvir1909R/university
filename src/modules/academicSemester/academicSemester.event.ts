import { RedisClient } from "../../redis";
import { createAcademicSemesterFromEvent, updateAcademicSemesterFromEvent } from "./academic.controller";

const initAcademicSemesterEvent = () => {
  RedisClient.subscribe("academic-semester.create", async (e: string) => {
    const data = JSON.parse(e);
    await createAcademicSemesterFromEvent(data);
  });
  RedisClient.subscribe("academic-semester.update", async (e: string) => {
    const data = JSON.parse(e);
    await updateAcademicSemesterFromEvent(data);
  });
};

export default initAcademicSemesterEvent;
