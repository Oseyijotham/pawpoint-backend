import jwt from 'jsonwebtoken';
import { User } from '../models/usersModel.js';
import { httpError } from '../helpers/httpError.js';
import 'dotenv/config';
const { SECRET_KEY, ACCESSKEY } = process.env;
import TheAuthAPI from "theauthapi";
const theAuthAPI = new TheAuthAPI(ACCESSKEY);

const authenticateAndValidateKey = async (req, _res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(httpError(401, 'Not authorized'));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token || !user.token) {
      next(httpError(401, "Not authorized"));
    }

    req.user = user;

    const isValidKey = await theAuthAPI.apiKeys.isValidKey(user.apiKey);
    if (isValidKey) {
      console.log("The API key is valid!");
    } else {
      throw httpError(401, "Invalid API key!");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export { authenticateAndValidateKey };
