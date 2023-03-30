import express from "express";
// middlewares
import awaitHandlerFactory from "../middlewares/awaitHandlerFactory.middleware.js";

//controllers
import userController from "../controllers/user.controller.js";

const router = express.Router();



//Register
// router.post('/sign-up', awaitHandlerFactory(userController.register), awaitHandlerFactory(userController.email_store));
router.post('/email-store', awaitHandlerFactory(userController.email_store));




export default router;