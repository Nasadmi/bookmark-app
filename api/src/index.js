import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { sequelize } from "./lib/connection.js";
import { userRoutes } from "./routes/user.router.js";
import { authRoutes } from "./routes/auth.router.js";
import { linkRoutes } from "./routes/link.router.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 200,
    origin: (o, cb) => {
      if (process.env.NODE_ENV === "dev" || !process.env.WHITELIST) {
        return cb(null, true);
      }

      if (process.env.WHITELIST.split(",").indexOf(o) === -1) {
        return cb(new Error("Blocked by CORS Policy"), false);
      }

      return cb(null, true);
    },
  })
);

if (process.env.NODE_ENV === "dev") app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.disable("x-powered-by");

app.use(userRoutes)
app.use(authRoutes)
app.use(linkRoutes)

const port = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connecton Success");
    await sequelize.sync();
    console.log("Sync Models");
    app.listen(port, () => {
      console.log("Express is listening on port:", port);
    });
  } catch (err) {
    console.error('Connection failed', err)
  }
})();
