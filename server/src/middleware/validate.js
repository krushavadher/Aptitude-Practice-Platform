import { ZodError } from 'zod';

export const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    try {
      req[target] = schema.parse(req[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
};
