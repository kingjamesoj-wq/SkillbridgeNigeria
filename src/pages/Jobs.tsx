import { JOBS } from '@/src/constants';
import { motion } from 'motion/react';
import { Search, MapPin, Briefcase, DollarSign, Clock, Bookmark, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Jobs() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-nigeria-green/5 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-trust-blue leading-tight">Your Next Big <span className="text-nigeria-green">Opportunity</span> Awaits</h1>
            <p className="mt-6 text-xl text-gray-600">Connect with innovative startups and global tech giants hiring directly from SkillBridge Nigeria.</p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-gray-200 focus:ring-2 focus:ring-nigeria-green transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="h-14 px-8 rounded-2xl bg-nigeria-green text-white font-bold shadow-lg shadow-nigeria-green/20 hover:scale-[1.02] transition-all">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="font-bold text-trust-blue mb-4">Job Type</h3>
              <div className="space-y-3">
                {['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'].map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-nigeria-green focus:ring-nigeria-green" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-trust-blue transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-trust-blue mb-4">Experience Level</h3>
              <div className="space-y-3">
                {['Entry Level', 'Intermediate', 'Senior', 'Manager'].map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-nigeria-green focus:ring-nigeria-green" />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-trust-blue transition-colors">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-nigeria-green/5 p-8 border border-nigeria-green/10">
                <Sparkles className="text-nigeria-green mb-4" />
                <h4 className="font-bold text-trust-blue text-lg">Smart Matching</h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">Let our AI match your skills with the perfect role.</p>
                <button className="mt-6 w-full py-3 bg-nigeria-green text-white rounded-xl font-bold text-xs">Analyze My Profile</button>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <p className="text-gray-500 font-medium">Showing <span className="text-trust-blue font-bold">{JOBS.length}</span> results</p>
              <select className="bg-transparent text-sm font-bold text-trust-blue border-none focus:ring-0">
                <option>Newest First</option>
                <option>Salary: High to Low</option>
              </select>
            </div>

            <div className="space-y-6">
              {JOBS.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-8 rounded-[2rem] border border-gray-100 hover:border-nigeria-green/20 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0">
                      <Briefcase className="text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 text-[10px] font-black uppercase text-gray-500">{job.type}</span>
                        {index === 1 && <span className="px-2.5 py-1 rounded-md bg-nigeria-green/10 text-[10px] font-black uppercase text-nigeria-green">Hot Opportunity</span>}
                      </div>
                      <h3 className="text-2xl font-bold text-trust-blue group-hover:text-nigeria-green transition-colors">{job.title}</h3>
                      <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                          <MapPin size={16} />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                          <DollarSign size={16} />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                          <Clock size={16} />
                          {job.postedAt}
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-col gap-3">
                      <button className="flex-1 md:flex-none px-8 py-3 bg-trust-blue text-white rounded-xl font-bold text-sm hover:bg-trust-blue-light transition-all">
                        Quick Apply
                      </button>
                      <button className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:text-nigeria-green hover:border-nigeria-green transition-all">
                        <Bookmark size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
