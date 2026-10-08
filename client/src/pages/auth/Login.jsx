import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GlassCard } from '../../components/common/GlassCard';
import { Input } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  const from = location.state?.from?.pathname || (user?.role === 'admin' ? '/admin' : '/dashboard');

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const loggedInUser = await login(data);
      const redirectPath = location.state?.from?.pathname || (loggedInUser.role === 'admin' ? '/admin' : '/dashboard');
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <GlassCard strong className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Welcome Back</h1>
          <p className="text-secondary text-sm">Log in to continue your practice.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 rounded-lg bg-error bg-opacity-10 border border-error text-error-text flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{serverError}</span>
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
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" className="w-full mt-2" isLoading={isSubmitting}>
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:underline focus-visible">Sign up</Link>
        </p>
      </GlassCard>
    </div>
  );
}
