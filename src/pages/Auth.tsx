import React, { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Sparkles, Building2, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'graduate' | 'employer'>('graduate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(role);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      handleGoogleLogin(); // Defaulting to Google login for now as it's the real flow implemented
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-gray-200"
      >
        <div className="bg-trust-blue px-8 py-10 text-white">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <GraduationCap size={28} />
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join SkillBridge'}
          </h2>
          <p className="mt-2 text-center text-blue-200">
            {isLogin ? 'Login to your account' : 'Create an account to get started'}
          </p>
        </div>

        <div className="px-8 py-10">
          <div className="mb-8 flex rounded-2xl bg-gray-100 p-1">
            <button
              onClick={() => setRole('graduate')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold transition-all ${
                role === 'graduate' ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={16} />
              Graduate
            </button>
            <button
              onClick={() => setRole('employer')}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold transition-all ${
                role === 'employer' ? 'bg-white text-trust-blue shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 size={16} />
              Employer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700">Email Address</label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-2xl border-gray-100 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-nigeria-green focus:bg-white focus:ring-nigeria-green"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <div className="relative mt-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-2xl border-gray-100 bg-gray-50 py-3 pl-11 pr-4 text-sm font-medium transition-all focus:border-nigeria-green focus:bg-white focus:ring-nigeria-green"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-nigeria-green py-4 text-lg font-bold text-white shadow-xl shadow-nigeria-green/20 transition-all hover:bg-nigeria-green-light hover:scale-[1.02] active:scale-100"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
              <Sparkles size={20} />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs font-bold text-gray-400 uppercase">Or continue with</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white py-4 text-sm font-bold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5 w-5" alt="Google" />
            Google
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-trust-blue hover:text-nigeria-green"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
