const { Router } = require("express");
const UserController = require("../controllers/userController");

const userController = new UserController();
userRouter = Router();

userRouter.post("/", userController.create);

userRouter.put("/:id", userController.update);

userRouter.delete("/:id", userController.delete);

userRouter.get("/:id", userController.index);

module.exports = userRouter;
