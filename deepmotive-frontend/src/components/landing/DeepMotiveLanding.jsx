// src/components/landing/DeepMotiveLanding.jsx
import React, { useState, useEffect } from "react";
import {
  Target,
  Cpu,
  TrendingUp,
  BookOpen,
  Menu,
  X,
  Star,
  CheckCircle,
  Zap,
  Shield,
  Users,
  ArrowRight,
  Sparkles,
  Award,
  Rocket,
  Heart,
  Calendar,
  BarChart3,
  Globe,
  Lock,
  MessageCircle,
  Waves,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeepMotiveLanding = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      avatar: "SC",
      text: "DeepMotive transformed how I build habits. The AI coach feels like having a personal mentor!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Entrepreneur",
      avatar: "MJ",
      text: "Best habit tracker I've used. The analytics helped me understand my patterns and improve.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Software Engineer",
      avatar: "ER",
      text: "Simple, powerful, and actually helps me stick to my goals. Love the community features!",
      rating: 5,
    },
  ];

  return (
    <div className='bg-white text-gray-900 overflow-x-hidden'>
      {/* CSS Styles */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.5); }
          50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.8); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 8s ease infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @media (max-width: 640px) {
          h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          h2 {
            font-size: 2rem !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-gray-200 py-2 sm:py-3"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className='container mx-auto px-4 sm:px-6 flex justify-between items-center'>
          <div
            className='flex items-center space-x-2 sm:space-x-3 cursor-pointer group'
            onClick={() => navigate("/")}
          >
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl blur opacity-50 group-hover:opacity-75 transition'></div>
              <div className='relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg'>
                <Waves size={24} className='sm:w-7 sm:h-7' />
              </div>
            </div>
            <span className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
              DeepMotive
            </span>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-6 lg:space-x-8'>
            {[
              { id: "features", label: "Features" },
              { id: "how-it-works", label: "How it Works" },
              { id: "pricing", label: "Pricing" },
              { id: "testimonials", label: "Reviews" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className='hover:text-cyan-600 font-medium transition-all hover:scale-105 text-sm lg:text-base'
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className='hidden md:flex items-center space-x-3 lg:space-x-4'>
            <button
              onClick={handleLogin}
              className='font-medium hover:text-cyan-600 transition-all hover:scale-105 text-sm lg:text-base px-3 lg:px-0'
            >
              Log in
            </button>

            <button
              onClick={handleGetStarted}
              className='relative group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-cyan-500/50 text-sm lg:text-base whitespace-nowrap'
            >
              <span className='flex items-center space-x-1 lg:space-x-2'>
                <span>Start Free Trial</span>
                <ArrowRight
                  size={16}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className='md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-white md:hidden transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "64px" }}
      >
        <div className='flex flex-col h-full p-6 space-y-6 overflow-y-auto'>
          {[
            { id: "features", label: "Features" },
            { id: "how-it-works", label: "How it Works" },
            { id: "pricing", label: "Pricing" },
            { id: "testimonials", label: "Reviews" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className='text-left text-lg font-medium py-3 border-b border-gray-100 hover:text-cyan-600 transition'
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogin}
            className='text-left text-lg font-medium py-3 border-b border-gray-100 hover:text-cyan-600 transition'
          >
            Log in
          </button>
          <button
            onClick={handleGetStarted}
            className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-2xl font-semibold w-full shadow-lg mt-4'
          >
            Start Free Trial
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className='relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden pt-16 sm:pt-20'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float'></div>
          <div
            className='absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-float'
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className='absolute top-1/2 left-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/20 rounded-full blur-3xl animate-float'
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-12 sm:py-0'>
          {/* Badge */}
          <div className='inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 px-3 sm:px-5 py-2 rounded-full mb-6 sm:mb-8 hover:bg-white/20 transition-all'>
            <Sparkles className='w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1 sm:mr-2' />
            <span className='text-xs sm:text-sm font-medium whitespace-nowrap'>
              Trusted by 10,000+ users
            </span>
          </div>

          {/* Main Heading */}
          <h1 className='text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4 sm:mb-6 px-2'>
            Build Habits That
            <span className='block mt-2 sm:mt-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-gradient text-3xl sm:text-4xl md:text-6xl lg:text-8xl'>
              Actually Stick
            </span>
          </h1>

          {/* Subheading */}
          <p className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 px-4'>
            Intelligent habit tracking powered by{" "}
            <span className='text-cyan-400 font-semibold'>AI coaching</span> and{" "}
            <span className='text-blue-400 font-semibold'>
              advanced analytics
            </span>
            . Transform your life, one habit at a time.
          </p>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4'>
            <button
              onClick={handleGetStarted}
              className='group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-cyan-500/50'
            >
              <span className='flex items-center justify-center space-x-2'>
                <Rocket size={18} className='sm:w-5 sm:h-5' />
                <span>Start Your Journey</span>
                <ArrowRight
                  size={18}
                  className='sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform'
                />
              </span>
            </button>

            <button
              onClick={() => scrollToSection("features")}
              className='border-2 border-white/30 hover:bg-white/10 px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all hover:scale-105 backdrop-blur-sm'
            >
              Learn More
            </button>
          </div>

          {/* Social Proof */}
          <div className='flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 px-4'>
            <div className='flex items-center space-x-2'>
              <div className='flex -space-x-2'>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className='w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-[10px] sm:text-xs font-bold'
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>10k+ users</span>
            </div>
            <div className='flex items-center space-x-1'>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  className='sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400'
                />
              ))}
              <span className='ml-2'>4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id='features'
        className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
            <div className='inline-flex items-center bg-cyan-50 text-cyan-600 px-3 sm:px-4 py-2 rounded-full mb-4'>
              <Zap size={14} className='sm:w-4 sm:h-4 mr-1 sm:mr-2' />
              <span className='text-xs sm:text-sm font-semibold'>
                POWERFUL FEATURES
              </span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4'>
              Everything You Need to{" "}
              <span className='block sm:inline bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
                Succeed
              </span>
            </h2>
            <p className='text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4'>
              Comprehensive tools designed to help you build and maintain
              lasting habits
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
            {[
              {
                icon: (
                  <Target className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />
                ),
                title: "Smart Habit Tracking",
                desc: "Intuitive tracking with intelligent reminders and streak protection",
                color: "from-cyan-500 to-blue-600",
              },
              {
                icon: <Cpu className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />,
                title: "AI-Powered Coach",
                desc: "Personalized advice and motivation based on your unique patterns",
                color: "from-blue-500 to-purple-600",
              },
              {
                icon: (
                  <BarChart3 className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />
                ),
                title: "Advanced Analytics",
                desc: "Beautiful visualizations to understand your progress at a glance",
                color: "from-purple-500 to-pink-600",
              },
              {
                icon: <Users className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />,
                title: "Community Challenges",
                desc: "Join group challenges and stay motivated with friends",
                color: "from-pink-500 to-red-600",
              },
              {
                icon: (
                  <BookOpen className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />
                ),
                title: "Smart Journal",
                desc: "Document your journey with AI-powered insights and reflections",
                color: "from-orange-500 to-yellow-600",
              },
              {
                icon: (
                  <Shield className='w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8' />
                ),
                title: "Privacy First",
                desc: "Bank-level encryption keeps your personal data secure",
                color: "from-green-500 to-emerald-600",
              },
            ].map((item, i) => (
              <div
                key={i}
                className='group relative bg-white p-5 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100'
              >
                <div
                  className={`mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${item.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {item.icon}
                </div>

                <h3 className='font-bold text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-gray-800'>
                  {item.title}
                </h3>
                <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                  {item.desc}
                </p>

                <div className='mt-4 sm:mt-6 flex items-center text-cyan-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity'>
                  <span className='text-xs sm:text-sm'>Learn more</span>
                  <ArrowRight
                    size={14}
                    className='ml-1 sm:ml-2 group-hover:translate-x-2 transition-transform'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section
        id='how-it-works'
        className='py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl'></div>

        <div className='relative z-10 container mx-auto px-4 sm:px-6'>
          <div className='text-center mb-12 sm:mb-16 lg:mb-20'>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4'>
              How It Works
            </h2>
            <p className='text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto px-4'>
              Get started in minutes and transform your life in days
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
            {[
              {
                step: "01",
                icon: (
                  <Target size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                ),
                title: "Set Your Goals",
                desc: "Choose habits you want to build and set realistic targets",
              },
              {
                step: "02",
                icon: (
                  <Calendar size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                ),
                title: "Track Daily",
                desc: "Check in each day and watch your streaks grow",
              },
              {
                step: "03",
                icon: (
                  <TrendingUp
                    size={24}
                    className='sm:w-7 sm:h-7 lg:w-8 lg:h-8'
                  />
                ),
                title: "See Progress",
                desc: "Analyze your patterns and celebrate milestones",
              },
            ].map((item, i) => (
              <div
                key={i}
                className='relative bg-white/10 backdrop-blur-lg p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-2'
              >
                <div className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white/20 mb-3 sm:mb-4'>
                  {item.step}
                </div>
                <div className='w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6'>
                  {item.icon}
                </div>
                <h3 className='text-xl sm:text-2xl font-bold mb-2 sm:mb-3'>
                  {item.title}
                </h3>
                <p className='text-sm sm:text-base text-white/80 leading-relaxed'>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id='testimonials' className='py-16 sm:py-20 lg:py-24 bg-white'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='text-center mb-12 sm:mb-16'>
            <div className='inline-flex items-center bg-purple-50 text-purple-600 px-3 sm:px-4 py-2 rounded-full mb-4'>
              <Heart size={14} className='sm:w-4 sm:h-4 mr-1 sm:mr-2' />
              <span className='text-xs sm:text-sm font-semibold'>
                LOVED BY THOUSANDS
              </span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4'>
              What Our Users Say
            </h2>
            <p className='text-base sm:text-lg lg:text-xl text-gray-600'>
              Real stories from real people
            </p>
          </div>

          <div className='max-w-4xl mx-auto px-4'>
            <div className='relative bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl'>
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className={`transition-all duration-500 ${
                    i === activeTestimonial
                      ? "opacity-100 relative"
                      : "opacity-0 absolute inset-0 pointer-events-none"
                  }`}
                >
                  <div className='flex items-center mb-4 sm:mb-6'>
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className='sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400'
                      />
                    ))}
                  </div>
                  <p className='text-base sm:text-lg lg:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed italic'>
                    "{testimonial.text}"
                  </p>
                  <div className='flex items-center'>
                    <div className='w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg mr-3 sm:mr-4'>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className='font-bold text-base sm:text-lg text-gray-800'>
                        {testimonial.name}
                      </div>
                      <div className='text-sm sm:text-base text-gray-600'>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Dots */}
              <div className='flex justify-center space-x-2 mt-6 sm:mt-8'>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 sm:h-3 rounded-full transition-all ${
                      i === activeTestimonial
                        ? "w-6 sm:w-8 bg-cyan-500"
                        : "w-2 sm:w-3 bg-gray-300"
                    }`}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id='pricing'
        className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white'
      >
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='text-center mb-12 sm:mb-16'>
            <div className='inline-flex items-center bg-green-50 text-green-600 px-3 sm:px-4 py-2 rounded-full mb-4'>
              <Award size={14} className='sm:w-4 sm:h-4 mr-1 sm:mr-2' />
              <span className='text-xs sm:text-sm font-semibold'>
                SIMPLE PRICING
              </span>
            </div>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4'>
              Choose Your{" "}
              <span className='block sm:inline bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent'>
                Perfect Plan
              </span>
            </h2>
            <p className='text-base sm:text-lg lg:text-xl text-gray-600'>
              Start free, upgrade when you're ready
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto'>
            {[
              {
                name: "Free",
                price: "$0",
                features: [
                  "Track up to 5 habits",
                  "7-day history",
                  "Basic analytics",
                  "Mobile app access",
                ],
                icon: <Target size={20} className='sm:w-6 sm:h-6' />,
                color: "from-gray-500 to-gray-600",
              },
              {
                name: "Pro",
                price: "$9",
                features: [
                  "Unlimited habits",
                  "AI-powered coaching",
                  "Advanced analytics",
                  "Priority support",
                  "Custom themes",
                ],
                popular: true,
                icon: <Zap size={20} className='sm:w-6 sm:h-6' />,
                color: "from-cyan-500 to-blue-600",
              },
              {
                name: "Teams",
                price: "$29",
                features: [
                  "Everything in Pro",
                  "Team challenges",
                  "Admin dashboard",
                  "Dedicated support",
                  "Custom integrations",
                ],
                icon: <Users size={20} className='sm:w-6 sm:h-6' />,
                color: "from-purple-500 to-pink-600",
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                  plan.popular
                    ? "border-cyan-500 md:scale-105 hover:scale-110"
                    : "border-gray-200 hover:border-cyan-200 hover:scale-105"
                }`}
              >
                {plan.popular && (
                  <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 w-max'>
                    <div className='bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center space-x-1'>
                      <Star size={12} className='fill-white' />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r ${plan.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg`}
                >
                  {plan.icon}
                </div>

                <h3 className='text-xl sm:text-2xl font-bold mb-2'>
                  {plan.name}
                </h3>
                <div className='mb-4 sm:mb-6'>
                  <span className='text-3xl sm:text-4xl lg:text-5xl font-bold'>
                    {plan.price}
                  </span>
                  <span className='text-sm sm:text-base text-gray-500 ml-2'>
                    /month
                  </span>
                </div>

                <ul className='space-y-3 sm:space-y-4 mb-6 sm:mb-8'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start'>
                      <CheckCircle className='w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 mr-2 sm:mr-3 flex-shrink-0 mt-0.5' />
                      <span className='text-sm sm:text-base text-gray-600'>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleGetStarted}
                  className={`w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-lg ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/50"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className='py-16 sm:py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center'>
            {[
              {
                number: "10,000+",
                label: "Active Users",
                icon: (
                  <Users size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                ),
              },
              {
                number: "1M+",
                label: "Habits Tracked",
                icon: (
                  <Target size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                ),
              },
              {
                number: "95%",
                label: "Success Rate",
                icon: (
                  <TrendingUp
                    size={24}
                    className='sm:w-7 sm:h-7 lg:w-8 lg:h-8'
                  />
                ),
              },
              {
                number: "4.9/5",
                label: "User Rating",
                icon: (
                  <Star size={24} className='sm:w-7 sm:h-7 lg:w-8 lg:h-8' />
                ),
              },
            ].map((stat, i) => (
              <div key={i} className='group'>
                <div className='mb-2 sm:mb-3 lg:mb-4 text-cyan-400 flex justify-center group-hover:scale-110 transition-transform'>
                  {stat.icon}
                </div>
                <div className='text-xl sm:text-2xl lg:text-3xl xl:text-5xl font-bold mb-1 sm:mb-2'>
                  {stat.number}
                </div>
                <div className='text-xs sm:text-sm lg:text-base text-gray-400'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className='py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 text-white text-center relative overflow-hidden'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl animate-float'></div>
        <div
          className='absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl animate-float'
          style={{ animationDelay: "1s" }}
        ></div>

        <div className='relative z-10 container mx-auto px-4 sm:px-6'>
          <div className='max-w-4xl mx-auto'>
            <Sparkles
              size={32}
              className='sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-4 sm:mb-6 text-yellow-300'
            />
            <h2 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 px-4'>
              Ready to Transform Your Life?
            </h2>
            <p className='text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto px-4'>
              Join thousands of users building better habits with DeepMotive.
              Start your journey today, absolutely free.
            </p>
            <button
              onClick={handleGetStarted}
              className='group bg-white text-cyan-600 hover:bg-gray-100 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg lg:text-xl transition-all hover:scale-110 active:scale-95 shadow-2xl inline-flex items-center space-x-2 sm:space-x-3'
            >
              <Rocket size={20} className='sm:w-5 sm:h-5 lg:w-6 lg:h-6' />
              <span>Start Your Free Trial</span>
              <ArrowRight
                size={20}
                className='sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:translate-x-2 transition-transform'
              />
            </button>
            <p className='mt-4 sm:mt-6 text-xs sm:text-sm text-white/70'>
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className='bg-gray-900 text-gray-400 py-12 sm:py-16'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12'>
            <div className='text-center sm:text-left'>
              <div className='flex items-center justify-center sm:justify-start space-x-2 mb-3 sm:mb-4'>
                <div className='w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold'>
                  <Waves size={16} className='sm:w-5 sm:h-5' />
                </div>
                <span className='text-base sm:text-lg lg:text-xl font-bold text-white'>
                  DeepMotive
                </span>
              </div>
              <p className='text-xs sm:text-sm leading-relaxed max-w-xs mx-auto sm:mx-0'>
                Build habits that actually stick with AI-powered coaching and
                analytics.
              </p>
            </div>

            <div className='text-center sm:text-left'>
              <h4 className='text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base'>
                Product
              </h4>
              <ul className='space-y-2 text-xs sm:text-sm'>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className='hover:text-cyan-400 transition'
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("pricing")}
                    className='hover:text-cyan-400 transition'
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Mobile App
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    API
                  </button>
                </li>
              </ul>
            </div>

            <div className='text-center sm:text-left'>
              <h4 className='text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base'>
                Company
              </h4>
              <ul className='space-y-2 text-xs sm:text-sm'>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    About Us
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Blog
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Careers
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className='text-center sm:text-left'>
              <h4 className='text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base'>
                Legal
              </h4>
              <ul className='space-y-2 text-xs sm:text-sm'>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className='hover:text-cyan-400 transition'>
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className='border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-xs sm:text-sm text-center sm:text-left'>
              © 2026 DeepMotive. All rights reserved.
            </p>
            <div className='flex space-x-4 sm:space-x-6'>
              {[Globe, MessageCircle, Lock].map((Icon, i) => (
                <button
                  key={i}
                  className='hover:text-cyan-400 transition p-1'
                  aria-label='Social link'
                >
                  <Icon size={18} className='sm:w-5 sm:h-5' />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeepMotiveLanding;
