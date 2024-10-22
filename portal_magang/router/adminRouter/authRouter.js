const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getAllUser,
  register,
  login,
  refreshToken,
  logout,
  getUserById,
  forgotPassword,
  resetPassword,
} = require("../../controllers/adminControllers/authControllers");
const { verifyUserToken, verifyAdmin } = require("../../middleware/auth");

router.get("/me", verifyUserToken, getUserById);
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Mohon masukan email yang valid!"),
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
  register
);
router.post(
  "/login",
  [body("email").isEmail().withMessage("Mohon masukan email yang valid!")],
  login
);
router.delete("/logout", logout);
router.get("/token-admin", refreshToken);
router.post(
  "/forgot-password",
  [
    body("email")
      .notEmpty()
      .withMessage("Email tidak boleh kosong!")
      .isEmail()
      .withMessage("Masukan email yang valid"),
  ],
  forgotPassword
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
  resetPassword
);

module.exports = router;
