import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/customError.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authentication invalid');
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === '66b1aaf7e7e5e1823434bcfd';
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

export const authenticatePermission = (...roles) => {
  return (req, res, next) => {
    const role = req.user.role;
    if (!roles.includes(role))
      throw new UnauthorizedError('not authorized to access this route ');
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo User, Read only!');
  next();
};
