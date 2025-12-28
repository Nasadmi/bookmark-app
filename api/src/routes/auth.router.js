import jwt from "jsonwebtoken";
import { Router } from "express";
import { User } from "../lib/models.js";
import { compare } from "bcrypt";
import ms from "ms";
import { UserSchema } from "../schemas/user.schema.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/login", validationMiddleware(UserSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!(await compare(password, user.password))) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: ms(process.env.JWT_EXPIRES || "10m"),
  });

  return res.status(200).json({
    token,
  });
});

export { router as authRoutes };
