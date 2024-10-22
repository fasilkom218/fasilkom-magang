const Users = require("../../models").User;
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

module.exports = {
  // ------------------ START FITUR REGISTER -------------------------- //
  register: async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: error.array()[0].msg,
      });
    }

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        message: "Email already used!",
      });
    }

    if (password !== confPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match!",
      });
    }

    const hashPassword = await argon.hash(password);

    try {
      await Users.create({
        name,
        email,
        password: hashPassword,
        role,
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
  // ------------------ END FITUR REGISTER -------------------------- //

  //   ------------------ START FITUR LOGIN -------------------------- //
  login: async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          message: error.array()[0].msg,
        });
      }

      const user = await Users.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      const match = await argon.verify(user.password, req.body.password);
      if (!match) {
        return res.status(400).json({
          message: "Wrong password!",
        });
      }

      const id = user.id;
      const name = user.name;
      const email = user.email;
      const role = user.role;
      const profile = user.profile;

      const accessToken = jwt.sign(
        { id, name, email, role, profile },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1h",
        }
      );

      const refreshToken = jwt.sign(
        { id, name, email, role },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      await Users.update(
        {
          refresh_token: refreshToken,
        },
        {
          where: {
            id: user.id,
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
        message: "Success Login",
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   ------------------ END FITUR LOGIN -------------------------- //

  //   ------------------ START FITUR LOGOUT -------------------------- //
  logout: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (user === null) {
      return res.sendStatus(204);
    }

    try {
      await Users.update(
        {
          refresh_token: null,
        },
        {
          where: {
            id: user.id,
          },
        }
      );

      res.clearCookie("refreshToken");
      res.status(200).json({
        message: "Success Logout",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   ------------------ END FITUR LOGOUT -------------------------- //

  //   ------------------ START FITUR GET ALL USERS -------------------------- //
  getAllUser: async (req, res) => {
    try {
      const user = await Users.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "role",
          "alamat",
          "no_telpon",
          "profile",
          "desc",
          "createdAt",
        ],
      });

      if (user.length === 0) {
        return res.status(404).json({
          message: "No users found",
        });
      }

      res.status(200).json({
        message: "Success get all users",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   ------------------ END FITUR GET ALL USERS -------------------------- //

  //   ------------------ START FITUR GET USER BY ID -------------------------- //
  getUserById: async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          id: req.userId,
        },
        attributes: [
          "id",
          "name",
          "email",
          "role",
          "alamat",
          "no_telpon",
          "profile",
          "desc",
          "createdAt",
        ],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      res.status(200).json({
        message: "Success get user by id",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   ------------------ END FITUR GET USER BY ID -------------------------- //

  //   ------------------ START FITUR REFRESH TOKEN -------------------------- //
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.sendStatus(401);
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.sendStatus(403);
          }

          try {
            const user = await Users.findOne({
              where: {
                id: decoded.id,
              },
            });

            if (!user) {
              return res.status(404).json({
                message: "User not found",
              });
            }

            const accessToken = jwt.sign(
              {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.profile,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "2h",
              }
            );

            res.status(200).json({
              accessToken,
            });
          } catch (error) {
            res.status(500).json({
              message: "Internal Server Error",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  //   ------------------ END FITUR REFRESH TOKEN -------------------------- //

  // ------------------ START FITUR FORGOT PASSWORD -------------------------- //
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;

      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({
          message: error.array()[0].msg,
        });
      }

      const user = await Users.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({
          message: "Email tidak terdaftar!",
        });
      }

      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      const transport = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const receiver = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Click on the link to generate your new password ${process.env.FRONTEND_URL}/auth/reset-password/${token}`,
      };

      await transport.sendMail(receiver);

      return res.status(200).json({
        message: "Check your email to reset your password",
      });
    } catch (error) {
      res.status(500).json({
        message: error.response,
      });
    }
  },
  // ------------------ END FITUR FORGOT PASSWORD -------------------------- //

  // ------------------ START FITUR RESET PASSWORD -------------------------- //
  resetPassword: async (req, res) => {
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
          message: "Password dan konfirm password tidak boleh kosong!",
        });
      }

      if (password !== confPassword) {
        return res.status(400).json({
          message: "Password dan konfirm password tidak sama!",
        });
      }

      const hashPassword = await argon.hash(password);

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const user = await Users.findOne({
        where: {
          email: decoded.email,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "Email tidak terdaftar!",
        });
      }

      await Users.update(
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
        message: "Success reset password",
      });
    } catch (error) {
      res.status(500).json({
        message: error.response,
      });
    }
  },
  // ------------------ END FITUR RESET PASSWORD -------------------------- //
};
