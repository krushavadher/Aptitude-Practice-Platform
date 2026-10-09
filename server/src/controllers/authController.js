import { asyncHandler } from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({
    success: true,
    data: result,
    message: 'User registered successfully'
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json({
    success: true,
    data: result,
    message: 'Login successful'
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar,
      createdAt: req.user.createdAt
    },
    message: 'User details fetched successfully'
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);
  res.status(200).json({
    success: true,
    message: result.message,
    resetUrl: result.resetUrl
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const result = await authService.resetPassword(req.params.token, req.body.password);
  res.status(200).json({
    success: true,
    data: result,
    message: 'Password reset successful'
  });
});
