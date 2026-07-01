import { body } from "express-validator";

export const registerValidation = [
body("name")
  .trim()
  .escape()
  .isLength({ min: 3, max: 60 })
  .withMessage("Name must be between 20 and 60 characters."),

body("email")
  .trim()
  .normalizeEmail()
  .isEmail()
  .withMessage("Please enter a valid email address."),

body("address")
  .trim()
  .escape()
  .isLength({ max: 400 })
  .withMessage("Address cannot exceed 400 characters."),

  body("password")
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character.")
];

// Login Validation
export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .notEmpty()
    .withMessage("Password is required."),
];

export const createUserValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("Name must be between 20 and 60 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("address")
    .trim()
    .isLength({ max: 400 })
    .withMessage("Address cannot exceed 400 characters."),

  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),

  body("role")
    .isIn(["ADMIN", "USER", "OWNER"])
    .withMessage("Role must be ADMIN, USER or OWNER."),
];

export const createStoreValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Store name must be between 3 and 100 characters."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid store email."),

  body("address")
    .trim()
    .isLength({ min: 5, max: 400 })
    .withMessage("Address must be between 5 and 400 characters."),

  body("ownerId")
    .notEmpty()
    .withMessage("Store owner is required."),
];

export const submitRatingValidation = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5."),
];

export const updatePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required."),

  body("newPassword")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character."),
];