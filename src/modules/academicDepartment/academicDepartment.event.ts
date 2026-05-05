import { RedisClient } from "../../redis";
import { createAcademicDepartmentFromEvent } from "./department.controller";

const initAcademicDepartmentEvent = () => {
  RedisClient.subscribe("academic-department.create", async (e: string) => {
    const data = JSON.parse(e);
    await createAcademicDepartmentFromEvent(data)
  });
  RedisClient.subscribe("academic-semester.update", async (e: string) => {
    const data = JSON.parse(e);
  });
};

export default initAcademicDepartmentEvent;
