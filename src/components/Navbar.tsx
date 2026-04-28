import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/context/AuthContext';
import { GraduationCap, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Courses', href: '/courses' },
    { title: 'Jobs', href: '/jobs' },
    { title: 'Mentorship', href: '/mentorship' },
    { title: 'Community', href: '/community' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nigeria-green text-white">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-trust-blue sm:text-2xl">
              SkillBridge<span className="text-nigeria-green">NG</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-nigeria-green"
            >
              {link.title}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium transition-all hover:border-nigeria-green hover:bg-nigeria-green/5"
              >
                <User size={16} />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 text-gray-400 hover:text-red-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="rounded-full bg-nigeria-green px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-nigeria-green/20 transition-all hover:bg-nigeria-green-light hover:shadow-nigeria-green/40"
            >
              Join SkillBridge
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-900"
                >
                  {link.title}
                </Link>
              ))}
              <hr className="border-gray-50" />
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-gray-900"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-lg font-medium text-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-nigeria-green py-3 text-center text-lg font-bold text-white"
                >
                  Join SkillBridge
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
