import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/common/GlassCard';
import { Input } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function ResetPassword() {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/reset-password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: data.password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSuccessMessage('Password reset successfully! You can now login.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setServerError(err.message || 'Failed to reset password');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <GlassCard strong className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Reset Password</h1>
          <p className="text-secondary text-sm">Enter your new password.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 rounded-lg bg-error bg-opacity-10 border border-error text-error-text flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{serverError}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 p-3 rounded-lg bg-green-500 bg-opacity-10 border border-green-500 text-green-500 flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="New Password" 
            type="password" 
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input 
            label="Confirm New Password" 
            type="password" 
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
            Reset Password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          <Link to="/login" className="text-accent hover:underline focus-visible">Back to Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
