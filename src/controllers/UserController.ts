import { NextFunction, Request, Response } from "express";

const validateToken = (req: Request, res: Response, next: NextFunction) => {};

const register = (req: Request, res: Response, next: NextFunction) => {};

const login = (req: Request, res: Response, next: NextFunction) => {};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};

const updateUser = (req: Request, res: Response, next: NextFunction) => {};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {};

export default {
  register,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  validateToken,
};
