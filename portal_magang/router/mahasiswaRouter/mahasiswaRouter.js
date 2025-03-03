const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Logout,
  getMahasiswa,
  getMahasiswaByID,
  forgotPasswordMhs,
  resetPasswordMhs,
} = require("../../controllers/mahasiswaControllers/mahasiswaControllers");
const { VerifyToken } = require("../../middleware/verifyToken");
const {
  refreshToken,
} = require("../../controllers/mahasiswaControllers/refreshToken");
const { body } = require("express-validator");

router.get("/get-user", VerifyToken, getMahasiswa);
router.get("/me", VerifyToken, getMahasiswaByID);
router.post(
  "/register",
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
  Register
);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Mohon masukan email yang valid!")],
  Login
);

router.get("/token", refreshToken);
router.delete("/logout", Logout);
router.post(
  "/forgot-password",
  [
    body("email")
      .notEmpty()
      .withMessage("Email tidak boleh kosong!")
      .isEmail()
      .withMessage("Email tidak valid!"),
  ],
  forgotPasswordMhs
);
router.put(
  "/reset-password/:token",
  [
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
  resetPasswordMhs
);

module.exports = router;
