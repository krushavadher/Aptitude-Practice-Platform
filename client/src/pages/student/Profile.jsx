import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { GlassCard } from '../../components/common/GlassCard';
import { Input } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { User, Image as ImageIcon, Camera } from 'lucide-react';
import { getImageUrl } from '../../utils/getImageUrl';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || ''); // This now holds preview URL or existing avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/me/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }

      updateUser(result.data);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <User className="w-8 h-8 text-accent" />
          My Profile
        </h1>
        <p className="text-secondary mt-2">Update your personal information and avatar.</p>
      </div>

      <GlassCard strong>
        <form onSubmit={handleSave} className="space-y-6">
          {message && (
            <div className="p-3 bg-green-500/10 border border-green-500 text-green-500 rounded-lg text-sm">
              {message}
            </div>
          )}
          {error && (
            <div className="p-3 bg-error/10 border border-error text-error-text rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden border-2 border-accent shrink-0">
              {avatar ? (
                <img src={getImageUrl(avatar)} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-10 h-10 text-accent opacity-50" />
              )}
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-secondary mb-1">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setAvatarFile(file);
                    setAvatar(URL.createObjectURL(file));
                  }
                }}
                className="block w-full text-sm text-secondary
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-accent file:text-white
                  hover:file:bg-accent/90"
              />
              <p className="text-xs text-secondary mt-1">Upload an image file from your device (max 5MB).</p>
            </div>
          </div>

          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            value={user?.email || ''}
            disabled
            className="opacity-60 cursor-not-allowed"
          />

          <div className="pt-4 border-t border-glass-border flex flex-col sm:flex-row gap-4">
            <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto">
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="danger" 
              className="w-full sm:w-auto bg-error/10 text-error-text hover:bg-error/20"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
