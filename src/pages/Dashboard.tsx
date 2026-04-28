import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { motion } from 'motion/react';
import { BookOpen, Briefcase, FileText, Layout, Play, Sparkles, TrendingUp, Trophy, CheckCircle2 } from 'lucide-react';
import { COURSES, JOBS } from '@/src/constants';
import { analyzeResume } from '@/src/services/geminiService';
import { cn } from '@/src/lib/utils';
import { useSearchParams } from 'react-router-dom';
import { db, serverTimestamp } from '@/src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/src/lib/firebaseUtils';

export default function Dashboard() {
  const { user, enrollInCourse, purchasedCourses, loading } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (loading) return;
    const paymentStatus = searchParams.get('payment');
    const courseId = searchParams.get('courseId');

    if (paymentStatus === 'success' && courseId && !purchasedCourses.includes(courseId)) {
      enrollInCourse(courseId);
      setShowSuccess(true);
      // Clean up URL
      setSearchParams({});
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams, enrollInCourse, purchasedCourses, setSearchParams, loading]);

  const handleResumeAnalysis = async () => {
    if (!resumeText || !user) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(resumeText);
      setAiResult(result);
      
      // Save to Firestore
      const analysisRef = collection(db, 'users', user.id, 'resumeAnalyses');
      await addDoc(analysisRef, {
        feedback: result.feedback,
        score: result.score,
        suggestedRoles: result.suggestedRoles,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error(error);
      handleFirestoreError(error, OperationType.WRITE, `users/${user.id}/resumeAnalyses`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-nigeria-green border-t-transparent" />
      </div>
    );
  }

  const userCourses = COURSES.filter(c => purchasedCourses.includes(c.id));

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl bg-nigeria-green p-4 text-white flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 size={24} />
            <span className="font-bold">Payment Successful! You are now enrolled in your new course.</span>
          </motion.div>
        )}

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-trust-blue">Hello, {user?.name}! 👋</h1>
            <p className="mt-1 text-gray-500">Track your progress and discover new opportunities.</p>
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-2 shadow-sm border border-gray-100">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-nigeria-green text-white">
              <Trophy size={18} />
            </div>
            <div className="pr-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Points</p>
              <p className="text-lg font-bold text-trust-blue">2,450 XP</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Resume Section */}
            <section className="overflow-hidden rounded-[2.5rem] bg-trust-blue p-8 text-white shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={120} />
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 text-nigeria-green">
                  <Sparkles size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">AI Power Feature</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">Resume AI Analyzer</h2>
                <p className="mt-2 text-blue-100">Paste your resume content below to get instant feedback and job recommendations.</p>
                
                <div className="mt-6">
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="h-32 w-full rounded-2xl border-none bg-white/10 p-4 text-white placeholder:text-blue-200/50 focus:ring-2 focus:ring-nigeria-green"
                    placeholder="Paste your CV content here..."
                  />
                  <button
                    onClick={handleResumeAnalysis}
                    disabled={isAnalyzing}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-nigeria-green py-3 font-bold transition-all hover:bg-nigeria-green-light disabled:opacity-50"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze with Gemini AI"}
                  </button>
                </div>

                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-nigeria-green uppercase text-xs tracking-widest">Analysis Results</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold">Employability Score:</span>
                        <span className="rounded-full bg-nigeria-green px-3 py-1 text-sm font-bold">{aiResult.score}%</span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed">{aiResult.feedback}</p>
                    <div className="mt-6">
                      <p className="text-xs font-bold uppercase text-blue-200">Suggested Paths</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {aiResult.suggestedRoles.map((role: string) => (
                          <span key={role} className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </section>

            {/* Courses Progress */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-trust-blue">Continue Learning</h2>
                <button className="text-sm font-bold text-nigeria-green hover:underline">View All</button>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {userCourses.length > 0 ? userCourses.map(course => (
                  <div key={course.id} className="group rounded-[2rem] bg-white p-4 shadow-sm border border-gray-100 transition-all hover:shadow-xl">
                    <div className="relative aspect-video overflow-hidden rounded-2xl">
                      <img src={course.image} className="h-full w-full object-cover transition-all group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <div className="h-12 w-12 rounded-full bg-nigeria-green text-white flex items-center justify-center shadow-lg">
                          <Play fill="currentColor" size={24} />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 px-2">
                      <p className="text-xs font-bold text-nigeria-green uppercase">{course.category}</p>
                      <h3 className="mt-1 font-bold text-trust-blue">{course.title}</h3>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full bg-nigeria-green" style={{ width: `${course.progress}%` }} />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-500">{course.progress}%</span>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 rounded-[2rem] border-2 border-dashed border-gray-200 p-12 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                      <BookOpen size={32} />
                    </div>
                    <p className="mt-4 font-bold text-gray-500">No active courses. Start learning today!</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Quick Links */}
            <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-trust-blue">Quick Actions</h3>
              <div className="mt-6 flex flex-col gap-3">
                {[
                  { icon: <Layout size={18} />, label: "Learning Path", color: "text-blue-500 bg-blue-50" },
                  { icon: <Briefcase size={18} />, label: "Job Matches", color: "text-nigeria-green bg-green-50" },
                  { icon: <FileText size={18} />, label: "Portfolio Builder", color: "text-purple-500 bg-purple-50" },
                  { icon: <TrendingUp size={18} />, label: "Skill Roadmap", color: "text-orange-500 bg-orange-50" },
                ].map(item => (
                  <button key={item.label} className="flex items-center gap-3 rounded-2xl p-3 transition-all hover:bg-gray-50 group">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-all group-hover:scale-110", item.color)}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-gray-700">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-trust-blue">Recommended Jobs</h3>
                  <button className="text-xs font-bold text-nigeria-green">See All</button>
                </div>
                <div className="space-y-4">
                  {JOBS.slice(0, 3).map(job => (
                    <div key={job.id} className="flex flex-col p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-nigeria-green/20 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-nigeria-green">{job.type}</span>
                        <span className="text-[10px] font-bold text-gray-400">{job.postedAt}</span>
                      </div>
                      <h4 className="mt-1 font-bold text-sm text-trust-blue">{job.title}</h4>
                      <p className="text-[10px] text-gray-500">{job.company} • {job.location}</p>
                      <button className="mt-3 w-full py-2 bg-white rounded-xl border border-gray-200 text-[10px] font-bold text-trust-blue hover:bg-trust-blue hover:text-white transition-all">
                        Quick Apply
                      </button>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
