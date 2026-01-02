import multer, { MulterError } from "multer";
import { storage } from "../lib/cloudinary.js";

/**
 * @param { import("express").Request } req
 * @param { import("express").Response } res
 * @param { import("express").NextFunction } next
 */

export const uploadImg = (req, res, next) => {
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new MulterError("LIMIT_UNEXPECTED_FILE"), false);
      }
    },
    limits: { fileSize: 100 * 1024, files: 1 },
  }).single("img");

  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      return res.status(400).json(err.message)
    }

    if (err) {
      console.error(err)
      return res.status(500).json({
        message: 'Internal Server Error'
      })
    }

    next()
  })
};
