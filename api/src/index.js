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
      if (!o || process.env.NODE_ENV === "dev" || !process.env.WHITELIST) {
        return cb(null, true);
      }

      const whitelist = process.env.WHITELIST.split(",")

      if (!whitelist.includes(o)) {
        return cb(null, false);
      }

      return cb(null, true);
    },
  })
);

app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

app.disable("x-powered-by");

app.get('/health', async (_req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }

  try {
    res.send(healthCheck)
  } catch (e) {
    healthCheck.message = e;
    res.status(503).send(healthCheck)
  }
})

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
