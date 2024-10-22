const Users = require("../models").User;
const jwt = require("jsonwebtoken");

module.exports = {
  // ------------------ START FITUR VERIFY TOKEN -------------------------- //
  verifyUserToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded.id;
      req.role = decoded.role;

      const user = await Users.findOne({
        where: {
          id: req.userId,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      next();
    } catch (error) {
      res.status(403).json({
        message: "Forbidden",
      });
    }
  },
  // ------------------ END FITUR VERIFY TOKEN -------------------------- //

  // ------------------ START FITUR VERIFY ADMIN -------------------------- //
  verifyAdmin: (req, res, next) => {
    if (req.role !== "admin") {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }
    next();
  },
  // ------------------ END FITUR VERIFY ADMIN -------------------------- //

  // ------------------ START FITUR VERIFY MITRA -------------------------- //
  verifyMitra: (req, res, next) => {
    if (req.role !== "mitra") {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }
    next();
  },
  // ------------------ END FITUR VERIFY MITRA -------------------------- //

  // ------------------ START FITUR VERIFY DOSEN -------------------------- //
  verifyDosen: (req, res, next) => {
    if (req.role !== "dospem") {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }
    next();
  },
  // ------------------ END FITUR VERIFY DOSEN -------------------------- //

  // ------------------ START FITUR VERIFY KAPRODI -------------------------- //
  verifyKaprodi: (req, res, next) => {
    if (req.role !== "kaprodi") {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }
    next();
  },
  // ------------------ END FITUR VERIFY KAPRODI -------------------------- //

  // ------------------ START FITUR VERIFY TIM MAGANG -------------------------- //
  verifyTimMagang: (req, res, next) => {
    if (req.role !== "tim-magang") {
      return res.status(403).json({
        message: "Access Forbidden",
      });
    }
    next();
  },
  // ------------------ END FITUR VERIFY TIM MAGANG -------------------------- //
};
