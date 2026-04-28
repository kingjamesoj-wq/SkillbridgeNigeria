import { motion } from 'motion/react';
import { COURSES } from '@/src/constants';
import { Search, Filter, Play, Clock, BarChart, CreditCard, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Courses() {
  const { user, isAuthenticated, purchasedCourses } = useAuth();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
  const categories = ['All', 'Development', 'Data Science', 'Design', 'Marketing'];

  const filteredCourses = activeCategory === 'All' 
    ? COURSES 
    : COURSES.filter(c => c.category === activeCategory);

  const handleEnroll = async (courseId: string, amount: number) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setLoadingCourseId(courseId);
    try {
      const response = await axios.post('/api/payments/initialize', {
        email: user?.email,
        amount,
        courseId
      });

      if (response.data.status && response.data.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.data.authorization_url;
      }
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Failed to initialize payment. Please try again.');
    } finally {
      setLoadingCourseId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-trust-blue py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-6xl">Master the Skills of the <span className="text-nigeria-green">Future</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
            Expertly crafted curriculum designed to make you employable in the global digital economy.
          </p>
          
          <div className="mt-10 mx-auto max-w-2xl px-4">
             <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-blue-200">
                  <Search size={24} />
                </div>
                <input 
                  type="text" 
                  placeholder="What do you want to learn today?"
                  className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-blue-200/50 focus:outline-none focus:ring-2 focus:ring-nigeria-green transition-all"
                />
             </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-nigeria-green text-white shadow-lg shadow-nigeria-green/20' 
                    : 'bg-white text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-100">
            <Filter size={16} />
            Sort by: Popularity
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, index) => {
            const isEnrolled = purchasedCourses.includes(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="relative aspect-video">
                  <img src={course.image} className="h-full w-full object-cover group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase text-trust-blue">
                      {course.level}
                    </span>
                  </div>
                  {!isEnrolled && (
                    <div className="absolute bottom-4 right-4">
                      <div className="rounded-xl bg-trust-blue px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        ₦{course.price.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-nigeria-green tracking-widest">{course.category}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-trust-blue leading-tight">{course.title}</h3>
                  <p className="mt-4 text-gray-600 line-clamp-2 text-sm leading-relaxed">{course.description}</p>
                  
                  <div className="mt-8 flex items-center gap-6 border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Clock size={14} />
                      <span>24 Hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <BarChart size={14} />
                      <span>All Levels</span>
                    </div>
                  </div>

                  {isEnrolled ? (
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-nigeria-green text-white rounded-2xl font-bold transition-all"
                    >
                      Continue Learning
                      <Play size={16} fill="currentColor" />
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleEnroll(course.id, course.price)}
                      disabled={loadingCourseId === course.id}
                      className="mt-8 flex items-center justify-center gap-2 w-full py-4 bg-gray-50 rounded-2xl text-trust-blue font-bold transition-all group-hover:bg-trust-blue group-hover:text-white disabled:opacity-50"
                    >
                      {loadingCourseId === course.id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <CreditCard size={16} />
                      )}
                      Enroll Now
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
