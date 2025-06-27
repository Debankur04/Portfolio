'use client'
import { BookDown, FolderKanban, Home, Pen, GraduationCap, Send, Trophy, Wrench, Github, Linkedin, Twitter, Mail, Phone, MapPin, Plus, X } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedTechs, setSelectedTechs] = useState([])
  const [animatedAchievements, setAnimatedAchievements] = useState(0)
  const [animatedEducation, setAnimatedEducation] = useState(0)
  
  const [formStatus, setFormStatus] = useState('')

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const sendEmail = (e) => {
    e.preventDefault();
     

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      form,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      alert('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error(err);
      alert('Failed to send message. Please try again later.');
    });
  };

  // Tech stack data with combination logic
  const techStack = {
    html: { name: 'HTML', logo: '🌐', category: 'frontend' },
    css: { name: 'CSS', logo: '🎨', category: 'frontend' },
    js: { name: 'JavaScript', logo: '⚡', category: 'frontend' },
    react: { name: 'React', logo: '⚛️', category: 'frontend' },
    node: { name: 'Node.js', logo: '🟢', category: 'backend' },
    python: { name: 'Python', logo: '🐍', category: 'backend' },
    mongodb: { name: 'MongoDB', logo: '🍃', category: 'database' },
    mysql: { name: 'MySQL', logo: '🐬', category: 'database' }
  }

  const combinations = {
    'css,html,js': { name: 'Frontend Developer', logo: '💻', description: 'Web Frontend Specialist' },
    'node,python': { name: 'Backend Developer', logo: '⚙️', description: 'Server-side Expert' },
    'css,html,js,node': { name: 'Full Stack Developer', logo: '🚀', description: 'Complete Web Solution' },
    'node,react': { name: 'MERN Stack', logo: '🌟', description: 'Modern Web Stack' },
    'mongodb,mysql': { name: 'Database Expert', logo: '🗄️', description: 'Data Management Specialist' },
    'js,react': { name: 'React Developer', logo: '⚛️', description: 'Modern Frontend Expert' },
    'node,mongodb': { name: 'Backend Stack', logo: '🔧', description: 'Server & Database Combo' },
    'css,js': { name: 'Frontend Core', logo: '🎨', description: 'Styling & Logic Expert' }
  }

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration + Admin',
      image: '🛒',
      tags: ['NextJS', 'ExpressJS', 'PostgreSQL', 'Nginx'],
      github: 'https://github.com/Debankur04/e-commerce-2-frontend'
    },
    {
      id: 2,
      title: 'Real Time Document Editor',
      description: 'Write docs with real-time updates with the power of AI',
      image: '📋',
      tags: ['NextJS', 'SocketIO', 'Tailwind', 'ExpressJS', 'FastAPI'],
      github: 'https://github.com/Debankur04/Lipi'
    },
    {
      id: 3,
      title: 'Python Chat Application',
      description: 'Real-time chat application with modern UI',
      image: '💬',
      tags: ['NextJS', 'Django', 'PostgreSQL'],
      github: 'https://github.com/Debankur04/Chatify_Backend'
    }
  ]

  const achievements = [
    { year: '2024', title: 'Won my first coding competition', description: 'Won Frontend Competition at GNIT' },
    { year: '2024', title: 'First Hackathon', description: 'Won best fintech product at IEM Hackathon' },
    { year: '2024', title: 'Won Second coding competition', description: 'Won Frontend Competition at GNIT' },
    { year: '2024', title: 'Came 4th at in college Hackathon', description: '4th Position at JISU Hackathon' },
    { year: '2024-25', title: 'Hackathon frenzy', description: 'Won 4 Hackathons' }
  ]

  const education = [
    { title: "Secondary Education", year: "2021", institution: "Aditya Academy Secondary", result: "82%" },
    { title: "Higher Secondary Education", year: "2023", institution: "Aditya Academy Sr. Secondary", result: "69.8%" },
    { title: "B.Tech", year: "2023-2027", institution: "JIS University", result: "6.8 CGPA" },
  ]

  // Scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'techstack', 'workshop', 'timeline', 'highlights', 'devlogs', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Education animation effect
  useEffect(() => {
    if (activeSection === 'highlights') {
      const timer = setInterval(() => {
        setAnimatedEducation(prev => {
          if (prev < education.length - 1) return prev + 1
          clearInterval(timer)
          return prev
        })
      }, 800)
      return () => clearInterval(timer)
    } else {
      setAnimatedEducation(0)
    }
  }, [activeSection])

  const handleTechClick = (techKey) => {
    setSelectedTechs(prev => {
      const newSelection = prev.includes(techKey) 
        ? prev.filter(t => t !== techKey)
        : [...prev, techKey]
      return newSelection
    })
  }

  const getCombinationResult = () => {
    const sortedKeys = selectedTechs.sort().join(',')
    return combinations[sortedKeys]
  }

  const scrollToSection = (section) => {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setFormStatus(''), 3000)
    }, 1000)
  }

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-800 to-black">
      {/* Navbar */}
      <nav className='fixed top-0 left-0 right-0 z-50 mx-auto max-w-7xl px-6 py-4'>
        <div className='h-16 w-full bg-white/10 rounded-2xl backdrop-filter backdrop-blur-lg border border-white/20 shadow-2xl text-white flex items-center justify-between px-8'>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
              <BookDown className="w-5 h-5" />
            </div>
            <p className="font-semibold text-lg tracking-wide">Resume</p>
          </div>
          
          <div className='flex items-center gap-1'>
            <NavItem icon={<Home className="w-4 h-4" />} text="Home" onClick={() => scrollToSection('home')} active={activeSection === 'home'} />
            <NavItem icon={<Wrench className="w-4 h-4" />} text="TechStack" onClick={() => scrollToSection('techstack')} active={activeSection === 'techstack'} />
            <NavItem icon={<FolderKanban className="w-4 h-4" />} text="Workshop" onClick={() => scrollToSection('workshop')} active={activeSection === 'workshop'} />
            <NavItem icon={<GraduationCap className="w-4 h-4" />} text="Timeline" onClick={() => scrollToSection('timeline')} active={activeSection === 'timeline'} />
            <NavItem icon={<Trophy className="w-4 h-4" />} text="Highlights" onClick={() => scrollToSection('highlights')} active={activeSection === 'highlights'} />
            <NavItem icon={<Pen className="w-4 h-4" />} text="Devlogs" onClick={() => scrollToSection('devlogs')} active={activeSection === 'devlogs'} />
            <NavItem icon={<Send className="w-4 h-4" />} text="Ping Me" onClick={() => scrollToSection('contact')} active={activeSection === 'contact'} isLast={true} />
          </div>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-full">
            {/* Hunter's License Card */}
            <div className="relative w-full max-w-4xl">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-1 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-300">
                  
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-slate-600 to-slate-800 text-white p-4">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold">Hunter's License</h1>
                      <div className="text-right">
                        <div className="text-sm opacity-80">Issued by</div>
                        <div className="font-semibold">Developer's Guild</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Card Content */}
                  <div className="p-6 bg-gradient-to-br from-white to-slate-50">
                    <div className="grid grid-cols-3 gap-8">
                      
                      {/* Left Section - Photo */}
                      <div className="space-y-4">
                        <div className="border-4 border-slate-300 rounded-lg overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 aspect-square flex items-center justify-center">
                          <div className="text-8xl">👨‍💻</div>
                        </div>
                        
                        {/* Rank Badge */}
                        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white text-center py-2 rounded-lg font-bold text-xl shadow-lg">
                          RANK: C+
                        </div>
                      </div>

                      {/* Middle Section - Details */}
                      <div className="space-y-4 col-span-2">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Personal Info */}
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">License No.</label>
                              <div className="bg-slate-100 p-2 rounded border font-mono text-lg text-slate-800">DEV001686</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Hunter Name</label>
                              <div className="bg-slate-100 p-2 rounded border font-bold text-xl text-slate-800">DEBANKUR DUTTA</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Class</label>
                              <div className="bg-slate-100 p-2 rounded border text-lg text-slate-800">FULL STACK + PYTHON DEV</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Guild</label>
                              <div className="bg-slate-100 p-2 rounded border text-slate-800">ASHWAMEDH Guild</div>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Power Level</label>
                              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-2 rounded border font-bold text-xl text-blue-800">952</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Experience</label>
                              <div className="bg-gradient-to-r from-green-100 to-green-200 p-2 rounded border font-bold text-lg text-green-800">1.5 Years</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Cleared Dungeons</label>
                              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-2 rounded border font-bold text-lg text-purple-800">6</div>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium text-slate-600 block">Current Rank</label>
                              <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-2 rounded border font-bold text-lg text-orange-800">#29</div>
                            </div>
                          </div>
                        </div>

                        {/* Abilities Section */}
                        <div className="mt-6">
                          <label className="text-sm font-medium text-slate-600 block mb-2">Special Abilities</label>
                          <div className="bg-slate-100 p-3 rounded border space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              <span className="font-medium text-slate-800">BRAIN BUZZ</span> - <span className="text-sm text-slate-600">Love to learn new things</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="font-medium text-slate-800">Bug Shield</span> - <span className="text-sm text-slate-600">Error Prevention</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span className="font-medium text-slate-800">Deploy Storm</span> - <span className="text-sm text-slate-600">Rapid Deployment</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-8 pt-4 border-t border-slate-300">
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="text-sm text-slate-600">Issued Date: <span className="font-medium">15.8.2022</span></div>
                          <div className="text-sm text-slate-600">Valid Until: <span className="font-medium">31.12.2039</span></div>
                        </div>
                        
                        {/* Contact Links */}
                        <div className="flex gap-2">
                          <SocialLink 
                            icon={<Github className="w-4 h-4" />}
                            href="https://github.com/Debankur04"
                            platform="GitHub"
                          />
                          <SocialLink 
                            icon={<Linkedin className="w-4 h-4" />}
                            href="https://www.linkedin.com/in/debankur-dutta-8871a22b0/"
                            platform="LinkedIn"
                          />
                        </div>
                        
                        {/* Security Chip */}
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-12 h-8 rounded border-2 border-yellow-700 flex items-center justify-center">
                          <div className="w-8 h-4 bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-sm flex items-center justify-center">
                            <div className="w-1 h-1 bg-yellow-800 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Holographic Strip */}
                  <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 via-red-500 to-yellow-400 opacity-80"></div>
                </div>
              </div>
              
              {/* Card Shadow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 to-slate-600/20 rounded-2xl blur-xl -z-10 transform translate-y-2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="techstack" className="min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Tech Stack</h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-semibold text-white mb-6">Select Technologies to Combine</h3>
            
            {/* Tech Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Object.entries(techStack).map(([key, tech]) => (
                <div
                  key={key}
                  onClick={() => handleTechClick(key)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                    selectedTechs.includes(key)
                      ? 'bg-red-500/30 border-red-400 scale-105'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <div className="text-4xl mb-2 text-center">{tech.logo}</div>
                  <div className="text-white text-center font-medium">{tech.name}</div>
                </div>
              ))}
            </div>

            {/* Combination Result */}
            {selectedTechs.length > 0 && (
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl p-6 border border-red-400/30">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {selectedTechs.map(tech => techStack[tech].logo).join(' + ')}
                  </div>
                  <Plus className="text-white w-6 h-6" />
                  <div className="text-4xl">{getCombinationResult()?.logo || '❓'}</div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xl font-semibold text-white">
                    {getCombinationResult()?.name || 'Custom Stack'}
                  </h4>
                  <p className="text-red-100">
                    {getCombinationResult()?.description || 'Unique combination of technologies'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTechs([])}
                  className="mt-4 bg-red-500/20 hover:bg-red-500/30 px-4 py-2 rounded-lg text-white transition-colors duration-300 flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Workshop/Projects Section */}
      <section id="workshop" className="min-h-screen pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Workshop</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <div key={project.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-200 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white hover:text-red-200 transition-colors duration-300"
                >
                  <Github className="w-4 h-4" />
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Timeline</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 to-red-600"></div>
            
            {achievements.map((achievement, index) => (
              <div key={index} className="relative flex items-start mb-12">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-red-500 rounded-full border-4 border-white shadow-lg"></div>
                
                {/* Content */}
                <div className="ml-16 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                      {achievement.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                  <p className="text-gray-200">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Highlights</h2>
          
          <div className="relative">
            {/* Animated Line */}
            <div className="absolute left-8 top-0 w-0.5 bg-gray-600 h-full"></div>
            <div 
              className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-red-400 to-red-600 transition-all duration-1000 ease-out"
              style={{ height: `${((animatedEducation + 1) / education.length) * 100}%` }}
            ></div>
            
            {education.map((item, index) => (
              <div 
                key={index} 
                className={`relative flex items-start mb-12 transition-all duration-500 ${
                  index <= animatedEducation ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Dot */}
                <div className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white shadow-lg transition-all duration-300 ${
                  index <= animatedEducation ? 'bg-red-500 scale-100' : 'bg-gray-400 scale-75'
                }`}></div>
                
                {/* Content */}
                <div className="ml-16 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="bg-red-500/20 text-red-200 px-3 py-1 rounded-full text-sm font-medium">
                      {item.year}
                    </span>
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200">{item.institution}</p>
                  <p className="text-gray-200 font-medium">{item.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devlogs Section */}
      <section id="devlogs" className="min-h-screen pt-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Devlogs</h2>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20">
            <div className="text-8xl mb-6">🚧</div>
            <h3 className="text-3xl font-semibold text-white mb-4">Coming Soon</h3>
            <p className="text-xl text-gray-200 mb-8">
              I'm working on some exciting development logs to share my journey, 
              tips, and insights with the community.
            </p>
            <div className="bg-red-500/20 text-red-200 px-6 py-3 rounded-full inline-block">
              Stay Tuned! 🎯
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Ping Me</h2>
          
          <form onSubmit={sendEmail} className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
        className="border p-2 rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        className="border p-2 rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Send
      </button>
    </form>  
    <div>    
            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <Mail className="w-8 h-8 text-red-400 mb-2" />
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-300">debankurdutta04@gmail.com</p>
                </div>
                <div className="flex flex-col items-center">
                  <Phone className="w-8 h-8 text-red-400 mb-2" />
                  <p className="text-white font-medium">Phone</p>
                  <p className="text-gray-300">+91 6291221388</p>
                </div>
                <div className="flex flex-col items-center">
                  <MapPin className="w-8 h-8 text-red-400 mb-2" />
                  <p className="text-white font-medium">Location</p>
                  <p className="text-gray-300">Kolkata, IN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Reusable Components
const NavItem = ({ icon, text, onClick, active, isLast = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer group transition-all duration-300 ${
        active ? 'bg-red-500/30' : 'hover:bg-white/15'
      } ${isLast ? 'bg-red-500/20 hover:bg-red-500/30' : ''}`}
    >
      <div className="group-hover:scale-110 transition-transform duration-300 text-red-200 group-hover:text-white">
        {icon}
      </div>
      <p className="font-medium text-sm group-hover:text-red-100 transition-colors duration-300 whitespace-nowrap">
        {text}
      </p>
    </div>
  )
}

const SocialLink = ({ icon, href, platform }) => {
  return (
    <a 
      href={href}
      className="group p-3 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg hover:from-red-400/30 hover:to-red-500/30 transition-all duration-300 text-white hover:text-red-200 hover:scale-110 border border-red-400/30 relative overflow-hidden"
      title={platform}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">{icon}</div>
    </a>
  )
}

export default Portfolio