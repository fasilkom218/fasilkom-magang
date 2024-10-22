const express = require("express");
const router = express.Router();
const fileUpload = require("../../utils/fileUpload");
const { verifyUserToken, verifyTimMagang } = require("../../middleware/auth");
const {
  editProfile,
  changePassword,
  getProfileById,
  uploadImage,
} = require("../../controllers/timMagangControllers/editProfile");
const { body } = require("express-validator");
const {
  getUserById,
} = require("../../controllers/adminControllers/authControllers");

router.get("/profile/:id", verifyUserToken, verifyTimMagang, getProfileById);
router.put(
  "/edit/:id",
  verifyUserToken,
  verifyTimMagang,
  // [
  // ----- EMAIL VALIDATION ----- //

  //   body("email")
  //     .notEmpty()
  //     .withMessage("Kolom email tidak boleh kosong!")
  //     .isEmail()
  //     .withMessage("Mohon masukan email yang valid!"),

  //  ----- NO TELPON VALIDATION ------ //
  //   body("no_telpon")
  //     .isMobilePhone("id-ID")
  //     .withMessage("No telpon tidak valid!"),
  // ],
  editProfile
);
router.put(
  "/upload/:id",
  verifyUserToken,
  verifyTimMagang,
  fileUpload,
  uploadImage
);

router.put(
  "/change-pass/:id",
  verifyUserToken,
  verifyTimMagang,
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
// router.get("/me", verifyUserToken, verifyMitra, getUserById);

module.exports = router;
