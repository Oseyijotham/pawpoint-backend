import { User } from '../models/usersModel.js';
import { httpError } from '../helpers/httpError.js';
import 'dotenv/config';
const { ACCESSKEY } = process.env;
import TheAuthAPI from "theauthapi";
const theAuthAPI = new TheAuthAPI(ACCESSKEY);

const ValidateKeyAPI = async (req, _res, next) => {

  const { "x-api-key": xApiKey } = req.headers;

  try {

     const isValidKey = await theAuthAPI.apiKeys.isValidKey(xApiKey);
     if (isValidKey) {
       console.log("The API key is valid!");
       const user = await User.findOne({ apiKey: xApiKey });
       req.user = user;
     } else {
       throw httpError(401, "Invalid API key!");
    }
     next(); 
  } catch (error) {
    next(error);
  }
};

export { ValidateKeyAPI };
