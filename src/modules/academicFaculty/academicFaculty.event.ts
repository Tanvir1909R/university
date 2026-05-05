import { RedisClient } from "../../redis";
import { createAcademicDepartmentFromEvent } from "../academicDepartment/department.controller";
import { createAcademicFacultyFromEvent } from "./faculty.controller";

const initAcademicFacultyEvent = () => {
  RedisClient.subscribe("academic-faculty.create", async (e: string) => {
    const data = JSON.parse(e);
    await createAcademicFacultyFromEvent(data)
  });
  RedisClient.subscribe("academic-semester.update", async (e: string) => {
    const data = JSON.parse(e);
  });
};

export default initAcademicFacultyEvent;
