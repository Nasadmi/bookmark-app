import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { UserSchema } from "../schemas/user.schema.js";
import { User } from "../lib/models.js";
import { UniqueConstraintError } from "sequelize";
import { hash } from "bcrypt";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/user", validationMiddleware(UserSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hash(
      password,
      parseInt(process.env.HASH_ROUNDS || "8")
    );
    await User.create({ email, password: hashedPassword });
    return res.status(200).json({
      message: "User has been created",
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: "The user already exists",
      });
    }

    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const id = req["user"];
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User doesnt exist",
      });
    } else {
      const { password, updatedAt, ...result } = user.dataValues;
      return res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export { router as userRoutes };
