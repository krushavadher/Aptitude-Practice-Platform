import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { GlassCard } from '../../components/common/GlassCard';
import { Input } from '../../components/common/Form';
import { Button } from '../../components/common/Button';
import { AlertCircle } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function Register() {
  const { register: registerUser, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  if (isAuthenticated) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    setServerError('');
    try {
      const newUser = await registerUser(data);
      const redirectPath = newUser.role === 'admin' ? '/admin' : '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setServerError(err.message || 'Failed to register');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <GlassCard strong className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-2">Create an Account</h1>
          <p className="text-secondary text-sm">Start your aptitude practice journey today.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 rounded-lg bg-error bg-opacity-10 border border-error text-error-text flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Name" 
            type="text" 
            placeholder="John Doe"
            error={errors.name?.message}
            {...register('name')}
          />
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
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-secondary">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline focus-visible">Log in</Link>
        </p>
      </GlassCard>
    </div>
  );
}
