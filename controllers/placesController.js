import { Place } from "../models/placeModel.js";
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
import { fetchPlaces, fetchCatPics, fetchMoreCatPics, fetchDogPics, fetchMoreDogPics } from "../API's/Api.js";


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


const findPlaces = async (req, res) => {
  const { _id } = req.user;
  const { error } = findPlacesValidation.validate(req.body);

  if (error) {
    throw httpError(400, error.details[0].message);
  }

  const { category, country } = req.body;

  const response = await fetchPlaces(category, country);

  const result = await response.json();

  const savedPlaces = await Place.find({ owner: _id }).sort({ _id: -1 });

  const amendedResult = result.map((place) => {
  const isSaved = savedPlaces.some(savedPlace => 
    savedPlace.data.id === place.id
  );
  return { ...place, status: isSaved };
});

  res.status(201).json(amendedResult);
};

const getMyPlaceById = async (req, res) => {
  const { placeId } = req.params;
  const result = await Place.findById(placeId);

  if (!result) {
    throw httpError(404, "Place Details Not Found");
  }

  res.status(200).json(result);
};

const addPlaces = async (req, res) => {
  const { _id } = req.user;

  const id  = req.body.data.id;
  
  let result;

  const place = await Place.findOne({ "data.id": id, owner: _id });
  if (place) {
    const filename = `${place._id}`; //Getting the filename for the image
    const publicId = "placeAvatars/" + filename;
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image", // or "raw" if it's not an image
      invalidate: true, // optional: tells CDN to remove cached copies
    });
    const strVar = await Place.findOneAndDelete({ "data.id": id, owner: _id });
    result = {
      data: {
        id: strVar.data.id,
        status: false,
      },
    };

    
  }
  
  else {
    result = await Place.create({ ...req.body, owner: _id });
  }



  res.status(201).json(result);
};

const deletePlaceById = async (req, res) => {
  const { _id } = req.user;
  //console.log(req.params);
  const { placeId } = req.params;

  let result;

  const myDeleted = await Place.findByIdAndDelete(placeId);

  if (myDeleted) {
  result = {
    data: {
      id: myDeleted.data.id,
      status: false,
    },
  };
  }

  if (!myDeleted) {
    throw httpError(404, "Resource not found");
  }
  const myResult = await Place.find({ owner: _id }).sort({ _id: -1 });

  const filename = `${placeId}`; //Getting the filename for the image
  const publicId = "placeAvatars/" + filename;
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image", // or "raw" if it's not an image
    invalidate: true, // optional: tells CDN to remove cached copies
  });
  res.json({ result: myResult, deleted: result });
};

const getSavedPlaces = async (req, res) => {
  const { _id } = req.user;

  const result = await Place.find({ owner: _id }).sort({ _id: -1 });

  res.status(200).json(result);
};

const updatePlaceAvatar = async (req, res) => {

   if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpeg") {
      throw httpError(400, 'Invalid image format, only PNG, JPG and JPEG are allowed'); // Only throws if neither PNG nor JPEG is chosen
    }
  const { placeId } = req.params;
  const { path: oldPath, originalname } = req.file;

  const filename = `${placeId}`; //creating a new unique filename for the image
  const extension = path.extname(originalname);
  const filenamePath = `${placeId}${extension}`;

  const newPath = path.join("public", "avatars", filenamePath);

  //Getting the image from the tmp folder, resizing it and overwriting the previous image with the resized one
  await sharp(oldPath)
    .resize(250, 250, {
      fit: "cover", // Crop to fill 250×250
      position: "center", // Crop from center (default)
    })
    .toFile(newPath);

  const result = await cloudinary.uploader.upload(newPath, {
    folder: "placeAvatars", // This creates a folder in Cloudinary
    public_id: filename,
    overwrite: true,
  });

  // Delete the local files after upload
  await fs.unlink(oldPath);
  await fs.unlink(newPath);

  const avatarURL = result.secure_url;
  //const avatarURL = `https://res.cloudinary.com/airboxify-cloud/image/upload/f_auto,q_auto/customerAvatars/${filename}.${result.format}`;
  //console.log(avatarURL);

  await Place.findByIdAndUpdate(placeId, { avatarURL });
  res.status(200).json({ avatarURL });
};


const updatePlaceDetailsById = async (req, res) => {
  // Validating name update
  const { error } = updatePlaceDetailsValidation.validate(req.body);
  if (error) {
    throw httpError(400, error.details[0].message);
  }

  const { placeId } = req.params;
  const result = await Place.findByIdAndUpdate(placeId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404, "Resource not found");
  }

  res.json(result);
};

const getCatPics = async (req, res) => {

  const response = await fetchCatPics();
  
  const result = await response.json();

  res.status(201).json(result);
};

const getMoreCatPics = async (req, res) => {
  const response = await fetchMoreCatPics(req.body.pageNum);

  console.log(req.body.pageNum);

  const result = await response.json();

  res.status(201).json({ moreCatPics: result, newPageNum: req.body.pageNum });
};

const getDogPics = async (req, res) => {
  const response = await fetchDogPics();

  const result = await response.json();

  res.status(201).json(result);
};

const getMoreDogPics = async (req, res) => {
  const response = await fetchMoreDogPics(req.body.pageNum);

  console.log(req.body.pageNum);

  const result = await response.json();

  res.status(201).json({ moreDogPics: result, newPageNum: req.body.pageNum });
};




// prettier-ignore
export {
  findPlaces,
  addPlaces,
  getSavedPlaces,
  updatePlaceAvatar,
  getMyPlaceById,
  deletePlaceById,
  updatePlaceDetailsById,
  getCatPics,
  getDogPics,
  getMoreCatPics,
  getMoreDogPics,
};
