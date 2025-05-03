import { RequestHandler } from 'express';

export const allowMarketingAndAdmins: RequestHandler = (req, res, next) => {
  const userRole = req.headers['x-user-role'] as string;

  if (userRole === 'admin' || userRole === 'marketing') {
    return next();
  }

  res.status(403).json({
    message: 'Access denied: Only admins and marketing managers can perform this action.',
  });
};
