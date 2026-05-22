import { Dog } from "../models/dogModel.js";
import {
  findPlacesValidation,
  updatePlaceDetailsValidation,
} from "../validations/validation.js";
import { httpError } from "../helpers/httpError.js";
import path from "path";
import fs from "fs/promises";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import sharp from "sharp";
import {
  fetchPlaces,
  fetchCatPics,
  fetchMoreCatPics,
  fetchDogPics,
  fetchMoreDogPics,
  fetchLocationKey,
  fetchCurrentWeatherConditions,
} from "../API's/Api.js";


const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;


// Cloudinary configuration for storing the user image
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET, 
});


const addDogImage = async (req, res) => {
  const { _id } = req.user;

const result = await Dog.create({ ...req.body, owner: _id });

  res.status(201).json(result);
};

const getSavedDogImages = async (req, res) => {
  const { _id } = req.user;

  const result = await Dog.find({ owner: _id }).sort({ _id: -1 });

  res.status(200).json(result);
};

const deleteDogImageById = async (req, res) => {
  
  const { imageId } = req.params;

  const myDeleted = await Dog.findByIdAndDelete(imageId);

  if (!myDeleted) {
    throw httpError(404, "Resource not found");
  }

   res.status(201).json(myDeleted);
  
};




// prettier-ignore
export { addDogImage, getSavedDogImages, deleteDogImageById };
