import Joi from "joi";

// validation for signup
const signupValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
  phone: Joi.string().required(),
  password: Joi.string().min(6).max(16).required().messages({
    "any.required": "Missing required password field",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
  }),
});

// validation for login
const loginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "uk"] } })
    .required()
    .messages({
      "any.required": "Missing required email field",
      "string.email": "Invalid email format",
    }),
  password: Joi.string().min(6).max(16).required().messages({
    "any.required": "Missing required password field",
    "string.min": "Password must be at least {#limit} characters long",
    "string.max": "Password cannot be longer than {#limit} characters",
  }),
});

// validation for searching for a place
const validCategories = [
  "Animal Hospital",
  "Animal Physical Therapy",
  "Aquarium Services",
  "Dog Walkers",
  "Emergency Pet Hospital",
  "Farrier Services",
  "Holistic Animal Care",
  "Pet Breeder",
  "Pet Cemetery and Crematorium Services",
  "Pet Groomer",
  "Pet Hospice",
  "Pet Insurance",
  "Pet Photography",
  "Pet Sitting",
  "Pet Transportation",
  "Pet Waste Removal",
  "Pet Boarding",
  "Pet Training",
  "Dog Trainer",
  "Dog Park",
  "Horse Trainer",
  "Animal Rescue Service",
  "Animal Shelter",
  "Horse Boarding",
  "Pet Adoption",
  "Veterinarian",
];

const findPlacesValidation = Joi.object({
  category: Joi.string()
    .valid(...validCategories)
    .required()
    .messages({
      "any.required": `"categorie" is required`,
      "any.only": `"categorie" must be one of: ${validCategories.join(", ")}`,
    }),

  country: Joi.string()
    .pattern(/^[A-Z]{2}$/)
    .required()
    .messages({
      "any.required": `"country" is required`,
      "string.pattern.base": `"country" must be a valid ISO 3166-1 Alpha-2 code (e.g., US, NG, GB)`,
    }),
});


// validation for updating Place Details
const updatePlaceDetailsValidation = Joi.object({
  description: Joi.string().max(60).required().messages({
    "string.max": "Customer name cannot be longer than {#limit} characters",
  }),
});

// prettier-ignore
export {
  updatePlaceDetailsValidation,
  findPlacesValidation,
  signupValidation,
  loginValidation,
};
