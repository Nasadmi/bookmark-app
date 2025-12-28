import { ZodError } from "zod";

/**
 * @param { import("zod").ZodObject } schema
 */
export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      console.log(req.body);
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: JSON.parse(err.message).map((err) => err.message),
        });
      } else {
        console.error(err)
        return res.status(500).json({
          message: 'Internal Server Error'
        })
      }
    }
  };
};
