import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle, Lock, ArrowRight, CheckCircle2, Mail, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function Login() {
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Redirect if already logged in
  if (isAuthenticated) {
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }

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
    <div className="absolute inset-0 w-full min-h-screen bg-gradient-to-br from-[#D1EADF] via-[#EEF8F3] to-[#C2E9D4] flex flex-col items-center justify-center p-4 z-[1]">
      {/* Decorative ambient blurred blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14724F]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[420px] mt-16 md:mt-0 relative z-10">
        <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(20,114,79,0.1)] border border-white/60">
          
          <div className="w-12 h-12 bg-white/80 text-[#14724F] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <Lock className="w-5 h-5" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-extrabold text-[#10241E] mb-2 tracking-tight">Welcome back</h1>
          <p className="text-[15px] font-medium text-[#5B6F67] mb-8">Log in to continue your practice.</p>

          {serverError && (
            <div className="mb-6 p-3 rounded-xl bg-red-50/80 border border-red-100 text-red-600 flex items-center gap-2 text-sm font-medium">
              <AlertCircle className="w-4 h-4" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-[#10241E] tracking-wide mb-1.5">Email</label>
              <div className="relative flex items-center border border-white/60 rounded-xl px-3 py-2.5 bg-white/70 focus-within:bg-white focus-within:border-[#14724F] focus-within:ring-1 focus-within:ring-[#14724F] transition-all">
                <Mail className="w-4 h-4 text-[#94A3B8] mr-2 flex-shrink-0" />
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-none focus:outline-none text-[13px] text-[#10241E] font-medium placeholder:text-[#94A3B8]"
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[11px] font-bold text-[#10241E] tracking-wide">Password</label>
                <Link to="/forgot-password" className="text-[11px] font-bold text-[#14724F] hover:text-[#10241E] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center border border-white/60 rounded-xl px-3 py-2.5 bg-white/70 focus-within:bg-white focus-within:border-[#14724F] focus-within:ring-1 focus-within:ring-[#14724F] transition-all">
                <Lock className="w-4 h-4 text-[#94A3B8] mr-2 flex-shrink-0" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-none focus:outline-none text-[13px] text-[#10241E] font-medium placeholder:text-[#94A3B8]"
                  {...register('password')}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-[#94A3B8] hover:text-[#14724F] transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#14724F] text-white rounded-xl py-3.5 font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-[#0F5A3E] transition-all mt-6 shadow-md shadow-[#14724F]/20 disabled:opacity-70"
            >
              Log in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-[13px] font-medium text-[#5B6F67]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#14724F] font-bold hover:text-[#10241E] transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
