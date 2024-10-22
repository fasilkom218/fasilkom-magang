const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  editProfile,
  changePassword,
  getProfileById,
} = require("../../controllers/adminControllers/usersControllers");

const fileUpload = require("../../utils/fileUpload");

const { verifyUserToken, verifyAdmin } = require("../../middleware/auth");
const { body } = require("express-validator");
const {
  uploadImage,
} = require("../../controllers/timMagangControllers/editProfile");

router.get("/account", verifyUserToken, verifyAdmin, getAllUser);
router.get("/account/:id", verifyUserToken, verifyAdmin, getUserById);
router.get(
  "/account/profile/:id",
  verifyUserToken,
  verifyAdmin,
  getProfileById
);
router.post(
  "/account",
  verifyUserToken,
  verifyAdmin,
  [
    // ----- EMAIL VALIDATION ----- //

    body("email")
      .notEmpty()
      .withMessage("Kolom email tidka boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

    // ----- PASSWORD VALIDATION ----- //

    body("password")
      .notEmpty()
      .withMessage("Kolom password tidak boleh kosong!")
      .isLength({ min: 8 })
      .withMessage("Password harus terdiri minimal 8 karakter!")
      .matches(/[A-Z]/g)
      .withMessage("Password harus mengandung huruf besar")
      .matches(/[a-z]/g)
      .withMessage("Password harus mengandung huruf kecil")
      .matches(/[0-9]/g)
      .withMessage("Password harus mengandung angka")
      .not()
      .matches(/\s/g)
      .withMessage("Mohon tidak menggunakan karakter spasi!"),
  ],
  createUser
);

router.put(
  "/account/:id",
  verifyUserToken,
  verifyAdmin,
  [
    // ----- EMAIL VALIDATION ----- //

    body("email")
      .notEmpty()
      .withMessage("Kolom email tidka boleh kosong!")
      .isEmail()
      .withMessage("Mohon masukan email yang valid!"),

    // ----- PASSWORD VALIDATION ----- //
  ],
  updateUser
);

router.delete("/account/:id", verifyUserToken, verifyAdmin, deleteUser);
router.put("/account/profile/:id", verifyUserToken, verifyAdmin, editProfile);

router.put(
  "/change-pass/:id",
  verifyUserToken,
  verifyAdmin,
  [
    // ----- PASSWORD VALIDATION ----- //
    // body("password")
    //   .notEmpty()
    //   .withMessage("Kolom password tidak boleh kosong!")
    //   .isLength({ min: 8 })
    //   .withMessage("Password harus terdiri minimal 8 karakter!")
    //   .matches(/[A-Z]/g)
    //   .withMessage("Password harus mengandung huruf besar")
    //   .matches(/[a-z]/g)
    //   .withMessage("Password harus mengandung huruf kecil")
    //   .matches(/[0-9]/g)
    //   .withMessage("Password harus mengandung angka")
    //   .not()
    //   .matches(/\s/g)
    //   .withMessage("Mohon tidak menggunakan karakter spasi!")
  ],
  changePassword
);
router.put(
  "/upload/:id",
  verifyUserToken,
  verifyAdmin,
  fileUpload,
  uploadImage
);

module.exports = router;
