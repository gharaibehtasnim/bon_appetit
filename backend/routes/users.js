const { Router } = require("express");
const authentication = require("../middlewares/authentication");

const usersRouter = Router();
const { register,login ,checkGoogleUser,editUserInfo,profileInfo} = require("../controllers/users");
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/google", checkGoogleUser);

usersRouter.get("/info", authentication, profileInfo);
usersRouter.put("/update/user/info", authentication, editUserInfo);

module.exports = usersRouter;
