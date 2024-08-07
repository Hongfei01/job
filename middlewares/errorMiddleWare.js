import { StatusCodes } from 'http-status-codes';

export const errorMiddleWare = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'something went wrong, please try again later';
  res.status(statusCode).json({ msg: message });
  // next();
};
