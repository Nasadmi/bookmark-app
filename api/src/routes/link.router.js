import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validationMiddleware } from "../middleware/validationMiddleware.js";
import * as cheerio from "cheerio";
import { LinkSchema, UpdateLinkSchema } from "../schemas/link.schema.js";
import { extractMeta } from "../lib/extractMeta.js";
import { Link, User } from "../lib/models.js";
import { UniqueConstraintError } from "sequelize";

const router = Router();

router.use(authMiddleware);

router.post("/link", validationMiddleware(LinkSchema), async (req, res) => {
  const url = req.body.url;
  const {
    archived,
    tags,
    last_visited,
    title: customTitle,
    description: customDescription,
    favicon: customFavicon,
  } = req.body;
  const id = req["user"];

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
        title: customTitle || title,
        description: customDescription || description,
        favicon: customFavicon || favicon,
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
        message: "Conflict",
      });
    }

    if (err instanceof TypeError) {
      return res.status(404).json({
        message: "The page doesnt exist or a problem with DNS/CORS",
      });
    }

    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/link/:id", async (req, res) => {
  const userId = req["user"];
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "ID invalid",
    });
  }

  try {
    const result = await Link.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
        },
      ],
    });

    if (!result) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    const { User: user, updatedAt, ...link } = result.dataValues;

    return res.status(200).json({
      message: "OK",
      link,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put(
  "/link/:id",
  validationMiddleware(UpdateLinkSchema),
  async (req, res) => {
    const userId = req["user"];
    const id = parseInt(req.params.id);
    let url = req.body.url;
    const {
      archived,
      tags,
      last_visited,
      title: customTitle,
      description: customDescription,
      favicon: customFavicon,
    } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID invalid",
      });
    }

    try {
      const linkSaved = await Link.findOne({
        where: { id },
        include: [
          {
            model: User,
            where: {
              id: userId,
            },
          },
        ],
      });

      if (!linkSaved) {
        return res.status(404).json({
          message: "Link not found",
        });
      }

      const linkSavedResult = linkSaved.dataValues;
      url = url || linkSavedResult.url;

      if (url && linkSavedResult.url === url) {
        const [_, newLinks] = await Link.update(
          {
            archived,
            tags,
            last_visited,
            title: customTitle,
            description: customDescription,
            favicon: customFavicon,
            userId,
          },
          {
            where: {
              id,
            },
            returning: true,
          }
        );

        const newLink = newLinks[0];

        return res.status(200).json({
          message: "Updated",
          newLink,
        });
      } else {
        const response = await fetch(url, {
          method: "GET",
        });

        if (response.status !== 200) {
          return res.status(response.status).json({
            message: "Metadata load errror",
          });
        }

        const text = await response.text();
        const $ = cheerio.load(text);
        const { title, description, favicon } = extractMeta($, url);

        const [_, newLinks] = await Link.update(
          {
            archived,
            tags,
            last_visited,
            title: customTitle || title,
            description: customDescription || description,
            favicon: customFavicon || favicon,
            userId,
          },
          {
            where: {
              id,
            },
            returning: true,
          }
        );

        const newLink = newLinks[0];

        return res.status(200).json({
          message: "Updated",
          newLink,
        });
      }
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        return res.status(409).json({
          message: "Conflict",
        });
      }

      if (err instanceof TypeError) {
        return res.status(404).json({
          message: "The page doesnt exist or a problem with DNS/CORS",
        });
      }

      console.error(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
);

router.delete("/link/:id", async (req, res) => {
  const userId = req['user']
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    res.status(400).json({
      message: 'ID invalid'
    })
  }

  try {
    const rowDeleted = await Link.destroy({ where: { id, userId } })
    if (rowDeleted === 0) {
      return res.status(404).json({
        message: 'Link not found'
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

export { router as linkRoutes };
