import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/common/GlassCard';
import { Input } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';


const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export default function ForgotPassword() {
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [resetLink, setResetLink] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data) => {
    setServerError('');
    setSuccessMessage('');
    setResetLink('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setSuccessMessage('Password reset email sent!');
      if (result.resetUrl) {
        setResetLink(result.resetUrl);
      }
    } catch (err) {
      setServerError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <GlassCard strong className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Forgot Password</h1>
          <p className="text-secondary text-sm">Enter your email to receive a reset link.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 rounded-lg bg-error bg-opacity-10 border border-error text-error-text flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{serverError}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 p-4 rounded-lg bg-green-500 bg-opacity-10 border border-green-500 text-green-500 flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
            {resetLink && (
              <div className="mt-2 pt-2 border-t border-green-500/20 break-all">
                <p className="font-semibold text-xs mb-1 opacity-80">Test Mode - Reset Link:</p>
                <a href={resetLink} className="underline hover:text-green-400">
                  {resetLink}
                </a>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
            Send Reset Link
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          Remembered your password?{' '}
          <Link to="/login" className="text-accent hover:underline focus-visible">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
