const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const adminRouter = require("./router/adminRouter");
const timMagangRouter = require("./router/timMagangRouter");
const mahasiswaRouter = require("./router/mahasiswaRouter");
const kaprodiRouter = require("./router/kaprodiRouter");
const dospemRouter = require("./router/dospemRouter");
const mitraRouter = require("./router/mitraRouter");
const dotenv = require("dotenv");

dotenv.config();

const allowedOrigins = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Jika menggunakan cookies atau session
  })
);

app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(adminRouter);
app.use(timMagangRouter);
app.use(mahasiswaRouter);
app.use(kaprodiRouter);
app.use(dospemRouter);
app.use(mitraRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});
