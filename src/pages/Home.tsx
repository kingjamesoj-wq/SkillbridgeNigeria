import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Briefcase, CheckCircle2, Globe, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <BookOpen className="text-nigeria-green" />,
    title: "Expert-Led Training",
    description: "Curated paths in high-demand digital skills specifically for Nigerian graduates."
  },
  {
    icon: <Briefcase className="text-trust-blue" />,
    title: "Job Placement",
    description: "Exclusive access to remote and local roles at top-tier companies like Flutterwave and Paystack."
  },
  {
    icon: <Users className="text-nigeria-green" />,
    title: "Mentorship",
    description: "Connect with seasoned professionals who provide guidance, support, and industry insights."
  },
  {
    icon: <Sparkles className="text-trust-blue" />,
    title: "AI Career Tools",
    description: "Advanced resume analysis and job recommendations powered by Google's Gemini AI."
  }
];

const partners = [
  "Flutterwave", "Paystack", "Andela", "Kuda", "Moniepoint", "Interswitch"
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="gradient-mesh absolute inset-0 opacity-50" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-nigeria-green/10 px-4 py-1.5 text-sm font-semibold text-nigeria-green">
                <Globe size={16} />
                <span>Bridge the Employability Gap</span>
              </div>
              <h1 className="mt-8 text-5xl leading-tight font-extrabold text-trust-blue sm:text-6xl lg:text-7xl">
                Empowering Nigerian <span className="text-nigeria-green">Graduates</span> for the Global Market
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-gray-600">
                Unlock your potential with job-ready digital skills, expert mentorship, and direct connections to top employers in Nigeria and beyond.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/auth"
                  className="inline-flex h-14 items-center justify-center rounded-2xl bg-nigeria-green px-8 text-lg font-bold text-white shadow-xl shadow-nigeria-green/30 transition-all hover:bg-nigeria-green-light hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-gray-100 bg-white px-8 text-lg font-bold text-trust-blue transition-all hover:border-trust-blue/20 hover:bg-gray-50"
                >
                  View Courses
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-100"
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                      alt="User avatar"
                    />
                  ))}
                </div>
                <span>Joined by 5,000+ local graduates this month</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                  alt="Students learning together"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-trust-blue/40 to-transparent" />
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nigeria-green/10 text-nigeria-green">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-trust-blue">85%</p>
                    <p className="text-sm font-medium text-gray-500">Placement Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-gray-400">
            Trusted by the best in the ecosystem
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 grayscale opacity-70 sm:gap-16">
            {partners.map((partner) => (
              <span key={partner} className="text-2xl font-black text-gray-400 tracking-tighter">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-trust-blue sm:text-5xl">
              Everything you need to <span className="text-nigeria-green">Succeed</span>
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              We've built a holistic platform to handle your transition from graduation to professional excellence.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-[2rem] bg-white p-8 border border-gray-100 transition-all hover:border-nigeria-green/20 hover:shadow-2xl hover:shadow-nigeria-green/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 transition-all group-hover:bg-nigeria-green/10">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-trust-blue">{feature.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3rem] bg-trust-blue px-8 py-20 text-center shadow-2xl lg:px-24">
          <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-nigeria-green opacity-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-nigeria-green opacity-20 blur-3xl" />
          
          <h2 className="relative text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
            Ready to Build Your <span className="text-nigeria-green">Future</span>?
          </h2>
          <p className="relative mt-6 text-xl text-gray-300">
            Join thousands of graduates who have transformed their careers through SkillBridge Nigeria.
          </p>
          <div className="relative mt-12">
            <Link
              to="/auth"
              className="inline-flex h-16 items-center justify-center rounded-2xl bg-white px-12 text-lg font-bold text-trust-blue shadow-xl transition-all hover:bg-gray-100 hover:scale-105"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
