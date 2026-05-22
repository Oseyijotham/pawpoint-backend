import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import { addDogImage, getSavedDogImages } from "../../controllers/dogController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { authenticateAndValidateKey } from "../../middlewares/authenticateAndValidateKey.js";
import { ValidateKeyAPI } from "../../middlewares/ValidateKeyAPI.js";

import { upload } from "../../middlewares/upload.js";

const router = express.Router();


router.post("/saveImage", authenticateToken, ctrlWrapper(addDogImage));

router.get("/dogpicsApi", ValidateKeyAPI, ctrlWrapper(getSavedDogImages));



export { router };
