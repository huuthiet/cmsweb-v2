import { Router } from "express";
import { projectController } from "@controllers";

export const projectRoute: Router = Router();

projectRoute.route("/")
  .get(projectController.getAllProjects)
  .post(projectController.createProject);


