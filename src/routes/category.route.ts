import { Router } from "express";
import { CategoryController } from "../controller/category.controller";

const categoryRouter = Router();
const controller = new CategoryController();

categoryRouter.post("/create", controller.create.bind(controller));

categoryRouter.put("/update", controller.update.bind(controller));

categoryRouter.delete("/delete", controller.delete.bind(controller));

categoryRouter.get("/", controller.getAll.bind(controller));
categoryRouter.get("/:id", controller.getById.bind(controller));

export default categoryRouter;
