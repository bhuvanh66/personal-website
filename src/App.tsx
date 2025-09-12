import { AccordionItem } from './components/Accordion'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import P5FlowBackground from './components/P5FlowBackground'
import ProjectCard from './components/ProjectCard'
import SkillPill from './components/SkillPill'
import AnimatedList from './components/AnimatedList'
import './App.css'

function App() {
  const heroRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    const links = navRef.current?.querySelectorAll('a') || []
    links.forEach((link) => {
      const onMove = (e: MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = (e.clientX - centerX) / rect.width
        const dy = (e.clientY - centerY) / rect.height
        gsap.to(e.currentTarget, { x: dx * 6, y: dy * 6, duration: 0.2 })
      }
      const onLeave = (e: MouseEvent) => {
        gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' })
      }
      link.addEventListener('mousemove', onMove)
      link.addEventListener('mouseleave', onLeave)
    })

    return () => {
      links.forEach((link) => {
        link.replaceWith(link.cloneNode(true))
      })
    }
  }, [])

  return (
    <div>
      <header ref={navRef} style={{ position: 'sticky', top: 0, zIndex: 10, background: 'rgba(12,12,14,0.6)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem' }}>
          <a href="#hero">Home</a>
          <a href="#education">Education</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section id="hero" ref={heroRef} style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0A0A0A'
      }}>
        <div style={{ 
          textAlign: 'center',
          padding: '2rem'
        }}>
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontSize: '3.5rem', 
              margin: '0 0 1rem 0',
              fontWeight: 400,
              color: '#ffffff'
            }}
          >
            Hi, I'm Bhuvan Hospet
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ 
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '2rem',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}
          >
            I'm a Computer Science student passionate about building interactive web experiences. 
            Currently focused on React, TypeScript, and modern web technologies.
          </motion.p>

          {/* About Me Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ marginBottom: '2rem' }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '12px 28px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              About Me
            </motion.button>
          </motion.div>

          {/* Contact Icons and Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* GitHub */}
            <motion.a
              href="https://github.com/bhuvanh66"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{
                color: 'rgba(255,255,255,0.7)',
                transition: 'all 0.3s'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/bhuvan-hospet/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              style={{
                color: 'rgba(255,255,255,0.7)',
                transition: 'all 0.3s'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:hospet.b@northeastern.edu"
              whileHover={{ scale: 1.1 }}
              style={{
                color: 'rgba(255,255,255,0.7)',
                transition: 'all 0.3s'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-10 5L2 7"/>
              </svg>
            </motion.a>

            {/* Separator */}
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', margin: '0 8px' }} />

            {/* Resume Button */}
            <motion.a
              href="/resume.pdf"
              download="Bhuvan_Hospet_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.9)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'all 0.3s'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <section id="education" style={{ minHeight: '100vh', padding: '6rem 1.5rem', background: 'radial-gradient(1200px 600px at 20% 10%, rgba(56,189,248,0.18), transparent), radial-gradient(900px 500px at 80% 30%, rgba(168,85,247,0.18), transparent), linear-gradient(135deg, #0B1020 0%, #0C0C14 60%)' }}>
        <h2>Education</h2>
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="/images/headshot.jpg" 
                  alt="Bhuvan Hospet"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                />
              </div>
              
              <div style={{ flex: 1, color: '#ffffff' }}>
                <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.4rem' }}>Northeastern University</h3>
                <p style={{ margin: '4px 0 0 0', opacity: 0.9, color: '#ffffff', fontSize: '1.1rem' }}>B.S. Computer Science & Business Administration</p>
                <p style={{ margin: '4px 0 16px 0', opacity: 0.8, color: '#ffffff' }}>Boston, MA — GPA: 3.8/4.0 (Expected May 2028)</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1rem' }}>Relevant Coursework</h4>
                    <AnimatedList items={[
                      'Object-Oriented Design',
                      'Algorithms and Data Structures', 
                      'Database Design',
                      'Data Science',
                      'Discrete Math'
                    ]} delay={0.1} />
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1rem' }}>Honors & Awards</h4>
                    <AnimatedList items={[
                      'VITAL Hackathon 1st Place',
                      'John Martinson Honors',
                      'Presidential Volunteer Service (Gold)',
                      'Outstanding Engineer (SWE)'
                    ]} delay={0.2} />
                  </div>
                  
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '1rem' }}>Activities</h4>
                    <AnimatedList items={[
                      'SGA Campus Planning Board',
                      'Alliance for Civically Engaged Students',
                      'NU Electric Racing Team',
                      'Dining Advisory Board'
                    ]} delay={0.3} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="experience" style={{ minHeight: '100vh', padding: '6rem 1.5rem', background: 'radial-gradient(1100px 540px at 10% 20%, rgba(251,113,133,0.16), transparent), radial-gradient(900px 520px at 90% 40%, rgba(59,130,246,0.16), transparent), linear-gradient(135deg, #10101F 0%, #0C0C14 60%)' }}>
        <h2>Experience</h2>
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <img 
                src="/images/stylerelogo.jpeg" 
                alt="Style.re"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <AccordionItem
                  title="Style.re — Software Engineering Intern"
                  subtitle="Dallas, TX — Jun 2025 – Aug 2025"
                  bullets={[
                    'Led 5 interns building scalable backend for fashion delivery (40 orders/day)',
                    'Deployed via AWS EB, MongoDB, S3, Vercel; improved reliability and DX',
                    'Integrated Twilio via Lambda + SQS for robust messaging & delivery tracking',
                    'Optimized order flows (Mongo, React, Express, Node), reduced errors; enabled 3 providers'
                  ]}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {['AWS','MongoDB','React','Node.js','Twilio','SQS','AWS Lambda'].map((s) => (
                    <SkillPill key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <img 
                src="/images/c4clogo.png" 
                alt="Code4Community"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <AccordionItem
                  title="Code4Community — Software Developer"
                  subtitle="Boston, MA — Jan 2025 – Present"
                  bullets={[
                    'Built ShelterLink connecting 20+ Boston LGBTQ+ youth charities with volunteers',
                    'Leveraged Next.js, React, Swift, AI scripting, AWS architecture',
                    'Improved program efficiency and accessibility for members and clients'
                  ]}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {['Next.js','React','Swift','AWS','AI'].map((s) => (
                    <SkillPill key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <img 
                src="/images/tamidlogo.jpeg" 
                alt="TAMID Group"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <AccordionItem
                  title="TAMID Group — Software Developer"
                  subtitle="Boston, MA — Jan 2025 – Present"
                  bullets={[
                    'Developing Foresight, an AI-driven data analysis tool to forecast demand and enable dynamic hotel pricing',
                    'Utilizing Next.JS, React, and machine learning to build collaborative music recommendation model and platform',
                    'Selected as a member of education class from 240+ applicants, learning financial and technical concepts'
                  ]}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {['React','TypeScript','Machine Learning'].map((s) => (
                    <SkillPill key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <img 
                src="/images/nebularcrosslogo.png" 
                alt="Nebular Cross"
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <AccordionItem
                  title="Nebular Cross — Software Engineering Intern"
                  subtitle="Stamford, CT — Jun 2023 – Aug 2024"
                  bullets={[
                    'Built trading visualization tools with JS/HTML for commodities platform',
                    'Automated generation of payment documents and integration across Teams/Outlook'
                  ]}
                />
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                  {['JavaScript','HTML','Automation'].map((s) => (
                    <SkillPill key={s} label={s} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" style={{ position: 'relative', minHeight: '100vh', padding: '6rem 1.5rem', overflow: 'hidden', background: 'radial-gradient(1000px 500px at 15% 20%, rgba(222, 232, 234, 0.16), transparent), radial-gradient(900px 520px at 85% 50%, rgba(99,102,241,0.18), transparent), linear-gradient(135deg, #0F0F1C 0%, #0C0C14 60%)' }}>
        <P5FlowBackground />
        <h2 style={{ position: 'relative', zIndex: 1 }}>Projects</h2>
        <motion.div
          className="section-content"
          style={{ position: 'relative', zIndex: 1 }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <ProjectCard
              title="Policy Playground"
              summary="Predict GDP using policy + economic data with interactive exploration"
              details={[
                'Built full-stack app with Flask API + Streamlit front-end',
                'Implemented multi-feature Linear Regression and Cosine Similarity for policy scoring',
                'Created social platform for publishing and discussing proposals'
              ]}
              githubUrl="https://github.com/guha-mahesh/PolicyPlayground"
              skills={["Python","Flask","Streamlit","scikit-learn","pandas","SQL","REST"]}
              imageUrl="/images/policyplayground.png"
            />
          </motion.div>
          <motion.div className="section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <ProjectCard
              title="Monte Carlo Simulator"
              summary="Interactive simulation suite and dashboard for portfolio risk"
              details={[
                'Fetched and cleaned 10k+ stock records from Yahoo Finance',
                'Built Streamlit dashboard with multiple visualization modules',
                'Configurable simulation parameters for horizon, volatility, run count'
              ]}
              githubUrl="https://github.com/TamidNu/monte-carlo-simulation"
              skills={["Python","Streamlit","Pandas","Seaborn","Plotly","NumPy"]}
              imageUrl="/images/montecarlo.png"
            />
          </motion.div>
          <motion.div className="section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <ProjectCard
              title="ShelterLink"
              summary="Connecting Boston LGBTQ+ youth charities with volunteers/resources"
              details={[
                'Next.js + AWS architecture for scalability and DX',
                'Improved onboarding and discoverability for organizations and volunteers'
              ]}
              githubUrl="https://github.com/Code-4-Community/shelter-link"
              skills={["Next.js","React","TypeScript","AWS","Node.js"]}
              imageUrl="/images/shelterlink.png"
            />
          </motion.div>
          <motion.div className="section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <ProjectCard
              title="SpotiRecs"
              summary="Full-stack app that analyzes songs and recommends tracks with similar vibes"
              details={[
                'Analyzes user-input songs using K-Means clustering on audio features (danceability, energy, tempo, acousticness, valence, genre)',
                'Integrates with Spotify API for real-time music data and recommendations',
                'Features custom Album Builder UI for playlist-like experience'
              ]}
              githubUrl="https://github.com/TamidNu/SpotiRecs"
              skills={["React","Flask","Spotify API","Scikit-learn","K-Means","Python"]}
              imageUrl="/images/spotirecs.jpg"
            />
          </motion.div>
          <motion.div className="section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <ProjectCard
              title="Vital Hacks: Medical Diagnostic Tool"
              summary="🏆 1st Place Winner - Adaptive survey tool for healthcare symptom assessment"
              details={[
                'Interactive skeletomuscular questionnaire with real-time progress tracking',
                'Integrated NIH Open API for comprehensive disease information',
                'Responsive design optimized for all devices, built during VITAL Hackathon 2025'
              ]}
              githubUrl="https://github.com/mehanana/vital_hacks_2025"
              skills={["React","Node.js","NIH Open API","JavaScript","REST API"]}
              imageUrl="/images/vitalhacks.png"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="contact" style={{ minHeight: '80vh', padding: '6rem 1.5rem', background: 'radial-gradient(1100px 540px at 20% 30%, rgba(34,197,94,0.16), transparent), radial-gradient(900px 520px at 90% 50%, rgba(250,204,21,0.14), transparent), linear-gradient(135deg, #10121F 0%, #0C0C14 60%)' }}>
        <h2>Contact</h2>
        <div className="section-content">
          <div className="card section-item" style={{ maxWidth: 700 }}>
            <p>Email: <a href="mailto:hospet.b@northeastern.edu">hospet.b@northeastern.edu</a></p>
            <p>Phone: <a href="tel:14752399484">475-239-9484</a></p>
            <p>LinkedIn: <a href="https://linkedin.com/in/bhuvan-hospet/" target="_blank" rel="noreferrer">linkedin.com/in/bhuvan-hospet/</a></p>
            <p>GitHub: <a href="https://github.com/bhuvanh66" target="_blank" rel="noreferrer">github.com/bhuvanh66</a></p>
            
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <a 
                href="/resume.pdf" 
                download="Bhuvan_Hospet_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(168,85,247,0.2))',
                  border: '1px solid rgba(59,130,246,0.4)',
                  borderRadius: 12,
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(59,130,246,0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App