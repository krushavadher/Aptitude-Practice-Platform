import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { User, Camera, Upload, Check, AlertCircle, LogOut, Lock } from 'lucide-react';
import { getImageUrl } from '../../utils/getImageUrl';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || ''); // preview URL or existing avatar string
  const [avatarFile, setAvatarFile] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);
  
  // To track if anything changed
  const hasChanges = (name !== (user?.name || '')) || avatarFile !== null;

  // Custom Toast State
  const [toastMessage, setToastMessage] = useState(null); // { type: 'success' | 'error', text: '' }

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setToastMessage({ type: 'error', text: 'File is too large. Max 5MB.' });
        return;
      }
      setAvatarFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatar('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!hasChanges) return;

    setIsSaving(true);
    setToastMessage(null);

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
      setAvatarFile(null);
      setToastMessage({ type: 'success', text: 'Profile updated' });
    } catch (err) {
      setToastMessage({ type: 'error', text: 'Could not save changes. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const initial = (name || user?.name || '?').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[color:var(--bg)] flex flex-col relative">
      <div className="max-w-[640px] mx-auto w-full px-6 pt-8 pb-[64px] flex-1">
        
        {/* Page Header */}
        <div className="flex items-center gap-5 mb-8">
          <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[color:var(--primary-soft)] to-[color:var(--primary)]/10 flex items-center justify-center shrink-0 border border-[color:var(--primary)]/20 shadow-sm">
            <User className="w-[28px] h-[28px] text-[color:var(--primary)]" />
          </div>
          <div>
            <h1 className="text-[32px] font-extrabold text-[color:var(--text)] leading-tight tracking-tight">My Profile</h1>
            <p className="text-[15px] font-medium text-[color:var(--text-muted)] mt-1 leading-tight">Update your personal information and avatar.</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-card rounded-[20px] p-8">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6">
              
              <label className="relative shrink-0 cursor-pointer group rounded-full">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
                <div className={`w-[96px] h-[96px] rounded-full flex items-center justify-center bg-[color:var(--primary-soft)] transition-colors ${
                  !avatar ? 'border-2 border-dashed border-[color:var(--primary)]/50 group-hover:border-opacity-100' : 'border-2 border-solid border-[color:var(--primary)]'
                }`}>
                  {avatar ? (
                    <img src={avatarFile ? avatar : getImageUrl(avatar)} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-[24px] font-bold text-[color:var(--primary)]">{initial}</span>
                  )}
                </div>
                
                {!avatar && (
                  <div className="absolute bottom-0 right-0 w-[28px] h-[28px] rounded-full bg-[color:var(--primary)] border-2 border-[color:var(--surface-strong)] flex items-center justify-center pointer-events-none">
                    <Camera className="w-[14px] h-[14px] text-white" />
                  </div>
                )}
              </label>

              <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                <div className="text-[14px] font-semibold text-[color:var(--text)] mb-2">Profile Photo</div>
                
                <div className="flex items-center gap-3">
                  <label className="h-[40px] px-4 rounded-[12px] border border-[color:var(--border-subtle)] bg-transparent hover:bg-[color:var(--surface)] text-[color:var(--text)] text-[14px] font-medium flex items-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-[16px] h-[16px]" />
                    Upload photo
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                  {(avatar || avatarFile) && (
                    <button type="button" onClick={handleRemoveAvatar} className="h-[40px] px-3 text-[14px] font-medium text-[color:var(--text-muted)] hover:text-[color:var(--text)] transition-colors">
                      Remove
                    </button>
                  )}
                </div>
                
                {toastMessage?.type === 'error' && toastMessage.text.includes('File') ? (
                  <div className="flex items-center gap-1.5 text-[13px] text-[color:var(--danger)] mt-2">
                    <AlertCircle className="w-[14px] h-[14px]" />
                    {toastMessage.text}
                  </div>
                ) : (
                  <div className="text-[13px] text-[color:var(--text-muted)] mt-2">JPG or PNG, max 5MB</div>
                )}
                
                {avatarFile && <div className="text-[13px] text-[color:var(--primary)] font-medium mt-1 truncate max-w-[200px]">{avatarFile.name}</div>}
              </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-[color:var(--border-subtle)] w-full" />

            {/* Form Fields */}
            <div className="space-y-6 pt-2">
              <div>
                <label className="block text-[14px] font-semibold text-[color:var(--text)] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full h-[48px] px-4 rounded-[12px] bg-[color:var(--surface-strong)] border border-[color:var(--border-subtle)] text-[16px] text-[color:var(--text)] placeholder-[color:var(--text-muted)] placeholder-opacity-70 focus:outline-none focus:border-[color:var(--primary)] focus:ring-[3px] focus:ring-[color:var(--primary-soft)] hover:border-[color:var(--primary)]/35 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[color:var(--text)] mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full h-[48px] px-4 pr-10 rounded-[12px] bg-[color:var(--primary-soft)]/50 border border-transparent text-[16px] text-[color:var(--text-muted)] focus:outline-none cursor-not-allowed"
                  />
                  <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[color:var(--text-muted)]" />
                </div>
                <div className="text-[13px] text-[color:var(--text-muted)] mt-2">Email cannot be changed</div>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-6 mt-6 border-t border-[color:var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button 
                type="submit" 
                disabled={!hasChanges || isSaving}
                className={`w-full sm:w-auto min-w-[160px] h-[48px] rounded-[12px] font-semibold flex items-center justify-center gap-2 transition-colors ${
                  !hasChanges || isSaving 
                    ? 'bg-[color:var(--primary)] text-white opacity-40 cursor-not-allowed' 
                    : 'bg-[color:var(--primary)] hover:bg-[color:var(--primary-hover)] text-white'
                }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>

              <button 
                type="button" 
                onClick={() => logout()}
                className="w-full sm:w-auto h-[48px] px-6 rounded-[12px] border border-[color:var(--danger)]/50 text-[color:var(--danger)] bg-transparent hover:bg-[color:var(--danger-soft)] hover:border-[color:var(--danger)] font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                Logout
                <LogOut className="w-[18px] h-[18px]" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Toast */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 bg-[color:var(--surface-strong)] border border-[color:var(--border-subtle)] border-l-[3px] px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          toastMessage.type === 'success' ? 'border-l-[color:var(--primary)]' : 'border-l-[color:var(--danger)]'
        }`}>
          {toastMessage.type === 'success' ? (
            <Check className="w-5 h-5 text-[color:var(--primary)]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[color:var(--danger)]" />
          )}
          <span className="text-[14px] font-medium text-[color:var(--text)]">{toastMessage.text}</span>
        </div>
      )}
    </div>
  );
}
