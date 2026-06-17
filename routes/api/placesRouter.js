import express from "express";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
// prettier-ignore
import {
  findPlaces,
  addPlaces,
  getSavedPlaces,
  getMyPlaceById,
  deletePlaceById,
  updatePlaceDetailsById,
  updatePlaceAvatar,
  getCatPics,
  getDogPics,
  getMoreCatPics,
  getMoreDogPics,
  getWeather,
  getSavedPlacesApi,
  getWeatherApi,
  getNewWeather,
  fetchEndpointById,
} from "../../controllers/placesController.js";
import { authenticateToken } from "../../middlewares/authenticateToken.js";
import { upload } from "../../middlewares/upload.js";
import { authenticateAndValidateKey } from "../../middlewares/authenticateAndValidateKey.js";
import { ValidateKeyAPI } from "../../middlewares/ValidateKeyAPI.js";

const router = express.Router();


router.get("/savedPlaces", authenticateAndValidateKey, ctrlWrapper(getSavedPlaces));

router.get("/savedPlacesApi", ValidateKeyAPI, ctrlWrapper(getSavedPlaces));

router.post("/", authenticateToken, ctrlWrapper(findPlaces));

router.post("/saveplace", authenticateToken, ctrlWrapper(addPlaces));

router.get("/catpics", ctrlWrapper(getCatPics));

router.get("/dogpics", ctrlWrapper(getDogPics));

router.get("/dogpicsApi", ValidateKeyAPI, ctrlWrapper(getDogPics));

router.post("/morecatpics", ctrlWrapper(getMoreCatPics));

router.post("/moredogpics", ctrlWrapper(getMoreDogPics));

router.get("/getOnePlace/:placeId", authenticateAndValidateKey, ctrlWrapper(getMyPlaceById));

router.delete("/deletePlaces/:placeId", authenticateAndValidateKey, ctrlWrapper(deletePlaceById));

router.patch("/avatars/:placeId", authenticateAndValidateKey, upload.single("avatar"), ctrlWrapper(updatePlaceAvatar));

router.patch("/detailsUpdate/:placeId", authenticateAndValidateKey, ctrlWrapper(updatePlaceDetailsById));

router.patch("/detailsUpdateApi/:placeId", ValidateKeyAPI, ctrlWrapper(updatePlaceDetailsById));

router.get("/getWeather", authenticateToken, ctrlWrapper(getWeather));

router.get("/getNewWeatherApi", ValidateKeyAPI, ctrlWrapper(getNewWeather));

router.get("/getWeatherApi/:id", ValidateKeyAPI, ctrlWrapper(getWeatherApi));

router.get("/getEndpoint/:pointId", authenticateAndValidateKey, ctrlWrapper(fetchEndpointById));


export { router };
