import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import * as cheerio from "cheerio";
import { LinkSchema } from "../schemas/link.schema.js";
import { extractMeta } from "../lib/extractMeta.js";
import { Link } from "../lib/models.js";
import { UniqueConstraintError } from "sequelize";

const router = Router();

router.use(authMiddleware);

router.post("/link", validationMiddleware(LinkSchema), async (req, res) => {
  const url = req.body.url;
  const { archived, tags, last_visited } = req.body;
  const id = req["user"];
  if (!url) {
    return res.status(400).json({
      message: "Url Invalid",
    });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (response.status !== 200) {
      return res.status(response.status).json({
        message: "Metadata load error",
      });
    }
    const text = await response.text();
    const $ = cheerio.load(text);
    const { title, description, favicon } = extractMeta($, url);
    const { userId, ...link } = (
      await Link.create({
        url,
        archived,
        tags,
        last_visited,
        title,
        description,
        favicon,
        userId: id,
      })
    ).dataValues;
    res.status(200).json({
      message: "Created",
      link,
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: "Conflict"
      })
    }

    if (err instanceof TypeError) {
      return res.status(404).json({
        message: 'The page doesnt exist or a problem with DNS/CORS'
      })
    }

    console.error(err);
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
});

export { router as linkRoutes };
