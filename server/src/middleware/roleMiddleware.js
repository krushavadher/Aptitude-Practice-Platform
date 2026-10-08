import { ApiError } from '../utils/apiError.js';

export const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, 'Not authorized'));
    }
    if (req.user.role !== role) {
      return next(new ApiError(403, 'Access denied. Insufficient permissions.'));
    }
    next();
  };
};
