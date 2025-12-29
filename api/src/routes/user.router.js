import { Router } from "express";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import { UpdateUserSchema, UserSchema } from "../schemas/user.schema.js";
import { User } from "../lib/models.js";
import { UniqueConstraintError, Error } from "sequelize";
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
    return res.status(201).json({
      message: "Created",
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: "Conflict",
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
        message: "Not Found",
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

router.put(
  "/user",
  authMiddleware,
  validationMiddleware(UpdateUserSchema),
  async (req, res) => {
    try {
      const id = req["user"];
      if (req.body.password) {
        req.body.password = await hash(req.body.password, parseInt(process.env.HASH_ROUNDS || '8'))
      }
      const newUser = req.body;
      const [rowsUpdated] = await User.update(newUser, { where: { id } });
      if (rowsUpdated === 0) {
        return res.status(404).json({
          message: "Not Found",
        });
      }
      return res.status(200).json({
        message: "Updated",
      });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
          message: "Conflict",
        });
      }

      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

router.delete('/user', authMiddleware, async (req, res) => {
  try {
    const id = req['user']
    const rowDeleted = await User.destroy({ where: { id } })
    if (rowDeleted === 0) {
      return res.status(404).json({
        message: 'Not Found'
      })
    }
    return res.status(200).json({
      message: 'Deleted'
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
})

export { router as userRoutes };
