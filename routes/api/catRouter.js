import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import {
  addCatImage,
  deleteCatImageById,
  getSavedCatImages
} from "../../controllers/catController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { authenticateAndValidateKey } from "../../middlewares/authenticateAndValidateKey.js";
import { ValidateKeyAPI } from "../../middlewares/ValidateKeyAPI.js";

import { upload } from "../../middlewares/upload.js";

const router = express.Router();


router.post("/saveImage", authenticateAndValidateKey, ctrlWrapper(addCatImage));

router.get("/catpicsApi", ValidateKeyAPI, ctrlWrapper(getSavedCatImages));

router.delete("/removeCatimageApi/:imageId", ValidateKeyAPI, ctrlWrapper(deleteCatImageById));



export { router };
