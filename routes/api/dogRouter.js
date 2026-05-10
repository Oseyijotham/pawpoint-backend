import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { addDogImage } from "../../controllers/dogController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { authenticateAndValidateKey } from "../../middlewares/authenticateAndValidateKey.js";

import { upload } from "../../middlewares/upload.js";

const router = express.Router();


router.post("/saveImage",authenticateToken, ctrlWrapper(addDogImage));



export { router };
