import { asyncHandler } from '../utils/asyncHandler.js';
import * as meService from '../services/meService.js';

export const getAttempts = asyncHandler(async (req, res) => {
  const result = await meService.getMyAttempts(req.user._id, req.query.page, req.query.limit);
  res.status(200).json({ success: true, data: result, message: 'Attempts retrieved' });
});

export const getStats = asyncHandler(async (req, res) => {
  const result = await meService.getMyStats(req.user._id);
  res.status(200).json({ success: true, data: result, message: 'Stats retrieved' });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    // Construct the avatar URL path
    updateData.avatar = `/uploads/${req.file.filename}`;
  }
  
  const user = await meService.updateProfile(req.user._id, updateData);
  res.status(200).json({
    success: true,
    data: user,
    message: 'Profile updated successfully'
  });
});
