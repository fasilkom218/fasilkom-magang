const Mahasiswa = require("../../models").Mahasiswa;
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

module.exports = {
  // ------------------ START FITUR GET ALL MAHASISWA -------------------------- //

  getMahasiswa: async (req, res) => {
    try {
      const mhs = await Mahasiswa.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "profile_pict",
          "prodi",
          "semester",
          "tgl_lahir",
          "alamat",
          "no_hp",
          "npm",
          "linkRekom",
          "linkCV",
          "desc",
        ],
      });

      if (!mhs) {
        return res.status(404).json({
          message: "404 data not found!",
        });
      }

      res.status(200).json({
        message: "Success get all data mahasiswa",
        data: mhs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ END FITUR GET ALL MAHASISWA --------------------------- //

  // ------------------ START FITUR GET ALL MAHASISWA BY ID -------------------------- //

  getMahasiswaByID: async (req, res) => {
    try {
      const mhs = await Mahasiswa.findOne({
        where: {
          id: req.mhsId,
        },
        attributes: [
          "id",
          "name",
          "email",
          "profile_pict",
          "prodi",
          "semester",
          "npm",
          "tgl_lahir",
          "alamat",
          "no_hp",
          "linkRekom",
          "linkCV",
          "desc",
          "refresh_token",
        ],
      });

      if (!mhs) {
        return res.status(404).json({
          message: "404 data not found!",
        });
      }

      res.status(200).json({
        message: "Success get all data mahasiswa",
        data: mhs,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ END FITUR GET ALL MAHASISWA BY ID --------------------------- //

  // ------------------ START FITUR REGISTRASI MAHASISWA --------------------------- //
  Register: async (req, res) => {
    const {
      name,
      email,
      password,
      confPassword,
      prodi,
      semester,
      npm,
      tgl_lahir,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
      });
    }

    const mhs = await Mahasiswa.findOne({
      where: {
        email,
      },
    });

    if (mhs) {
      return res.status(400).json({
        message: "Email already registered!",
      });
    }

    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match!",
      });
    }

    const hashPassword = await argon.hash(password);

    try {
      await Mahasiswa.create({
        name,
        email,
        password: hashPassword,
        prodi,
        semester,
        npm,
        tgl_lahir,
      });

      res.status(201).json({
        message: "Success Create New Account",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ END FITUR REGISTRASI MAHASISWA ---------------------------- //

  // ------------------ START FITUR LOGIN MAHASISWA ---------------------------- //

  Login: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const mhs = await Mahasiswa.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!mhs) {
        return res.status(404).json({
          message: "Email doesn't exist!",
        });
      }

      const { password } = req.body;

      const match = await argon.verify(mhs.password, password);
      if (!match) {
        return res.status(400).json({
          message: "Wrong password!",
        });
      }

      const mhsId = mhs.id;
      const name = mhs.name;
      const email = mhs.email;
      const profile_pict = mhs.profile_pict;
      const linkCV = mhs.linkCV;

      const accessToken = jwt.sign(
        { mhsId, name, email, profile_pict, linkCV },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        { mhsId, name, email, profile_pict },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await Mahasiswa.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            id: mhsId,
          },
        }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login Successfully",
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  // ------------------ END FITUR LOGIN MAHASISWA ----------------------------- //

  // ------------------ START FITUR LOGOUT MAHASISWA ----------------------------- //

  Logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(204); // Tidak ada token, tidak perlu logout
    }

    const mhs = await Mahasiswa.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (mhs === null) {
      return res.sendStatus(204); // Token tidak ditemukan dalam database
    }

    const mhsId = mhs.id;
    await Mahasiswa.update(
      {
        refresh_token: null, // Perbaiki nama properti di sini
      },
      {
        where: {
          id: mhsId,
        },
      }
    );

    res.clearCookie("refreshToken");
    return res.status(200).json({
      message: "Logout successfully",
    });
  },

  // ------------------ END FITUR LOGOUT MAHASISWA ------------------------------ //

  // ------------------ START FITUR FORGOT PASSWORD MAHASISWA ----------------------------- //
  forgotPasswordMhs: async (req, res) => {
    try {
      const { email } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      const mhs = await Mahasiswa.findOne({
        where: {
          email,
        },
      });

      if (!mhs) {
        return res.status(404).json({
          message: "Email tidak terdaftar!",
        });
      }

      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      const transport = nodemailer.createTransport({
        service: "gmail",
        // secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const receiver = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Click here to reset your password: ${process.env.FRONTEND_URL}/mahasiswa/reset-password/${token}`,
      };

      await transport.sendMail(receiver);

      return res.status(200).json({
        message: "Silahkan cek email anda untuk reset password",
      });
    } catch (error) {
      res.status(500).json({
        message: error.response,
      });
    }
  },
  // ------------------ END FITUR FORGOT PASSWORD MAHASISWA ----------------------------- //

  // ------------------ START FITUR RESET PASSWORD MAHASISWA ----------------------------- //
  resetPasswordMhs: async (req, res) => {
    try {
      const { token } = req.params;
      const { password, confPassword } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      }

      if (!password && !confPassword) {
        return res.status(400).json({
          message: "Password dan konfirmasi password harus diisi!",
        });
      }

      if (password !== confPassword) {
        return res.status(400).json({
          message: "Password dan konfirmasi password tidak cocok!",
        });
      }

      const hashPassword = await argon.hash(password);

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const mhs = await Mahasiswa.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (!mhs) {
        return res.status(404).json({
          message: "Email tidak terdaftar!",
        });
      }

      await Mahasiswa.update(
        {
          password: hashPassword,
        },
        {
          where: {
            email: decoded.email,
          },
        }
      );

      res.status(200).json({
        message: "Password berhasil direset!",
      });
    } catch (error) {
      res.status(500).json({
        message: error.response,
      });
    }
  },
  // ------------------ END FITUR RESET PASSWORD MAHASISWA ----------------------------- //
};
