import { Router } from "express";
import { userController } from "../controller/user.controller";
import { authenticate, authorize } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const userRouter = Router();
const controller = new userController();

userRouter.get("/profile", authenticate, controller.getById.bind(controller));
userRouter.patch(
  "/update-profile",
  authenticate,
  controller.updateProfile.bind(controller),
);
userRouter.patch(
  "/profile-pic",
  authenticate,
  upload.single("img"), // "img" harus sama dengan field name dari FE
  controller.updateProfilePic.bind(controller),
);

export default userRouter;
