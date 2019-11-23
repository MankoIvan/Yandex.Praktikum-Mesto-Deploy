const userRouter = require("express").Router();
const { getUsers, getUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

userRouter.get("/users", auth, getUsers);
userRouter.get("/users/:id", auth, getUser);

module.exports = userRouter;
