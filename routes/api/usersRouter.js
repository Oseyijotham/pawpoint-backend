import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { signupUser, loginUser, logoutUser, getCurrentUsers, updateUserAvatar, createAPIkey, retrieveAPIKey} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { authenticateAndValidateKey } from "../../middlewares/authenticateAndValidateKey.js";

import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", ctrlWrapper(signupUser));


router.post("/login", ctrlWrapper(loginUser));

router.get("/logout", authenticateToken, ctrlWrapper(logoutUser));


router.get("/current", authenticateToken, ctrlWrapper(getCurrentUsers));


router.patch("/avatars", authenticateToken, upload.single("avatar"), ctrlWrapper(updateUserAvatar));

router.post("/create", authenticateToken, ctrlWrapper(createAPIkey));

router.get("/retrieve", authenticateAndValidateKey, ctrlWrapper(retrieveAPIKey));




export { router };
