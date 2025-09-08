import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FluidBackground from './components/FluidBackground'
import P5FlowBackground from './components/P5FlowBackground'
// import DraggableCard from './components/DraggableCard'
import ProjectCard from './components/ProjectCard'
import { AccordionItem } from './components/Accordion'
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

      <section id="hero" ref={heroRef} style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, rgba(9,10,15,0) 70%, rgba(9,10,15,1) 100%)' }}>
        <FluidBackground />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ fontSize: '3rem', margin: 0 }}
          >
            Bhuvan Hospet
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.95, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut', delay: 0.2 }}
            style={{ maxWidth: 700, margin: '1rem auto 0', lineHeight: 1.6 }}
          >
            Hi, I’m Bhuvan — a frontend-focused developer crafting fluid, interactive experiences.
            I blend React + TypeScript with creative tech like WebGL and motion to build playful,
            performant interfaces.
          </motion.p>
        </div>
      </section>

      <section id="education" style={{ minHeight: '100vh', padding: '6rem 1.5rem', background: 'radial-gradient(1200px 600px at 20% 10%, rgba(56,189,248,0.18), transparent), radial-gradient(900px 500px at 80% 30%, rgba(168,85,247,0.18), transparent), linear-gradient(135deg, #0B1020 0%, #0C0C14 60%)' }}>
        <h2>Education</h2>
        {/* Education animated container */}
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {/* Profile Picture */}
              <div style={{ flexShrink: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
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
              
              {/* Education Content */}
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
                      'National Merit Finalist',
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
        {/* Experience animated container */}
        <motion.div
          className="section-content"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
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
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
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
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
            <AccordionItem
              title="TAMID Group — Software Developer"
              subtitle="Boston, MA — Jan 2025 – Present"
              bullets={[
                'Built ML-based collaborative music recommendation model and platform',
                'Training on tech consulting for Israeli startups; selected from 240+ applicants'
              ]}
            />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              {['React','TypeScript','Machine Learning'].map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </motion.div>
          <motion.div className="card section-item" variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}>
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
          </motion.div>
        </motion.div>
      </section>

      <section id="projects" style={{ position: 'relative', minHeight: '100vh', padding: '6rem 1.5rem', overflow: 'hidden', background: 'radial-gradient(1000px 500px at 15% 20%, rgba(222, 232, 234, 0.16), transparent), radial-gradient(900px 520px at 85% 50%, rgba(99,102,241,0.18), transparent), linear-gradient(135deg, #0F0F1C 0%, #0C0C14 60%)' }}>
        <P5FlowBackground />
        <h2 style={{ position: 'relative', zIndex: 1 }}>Projects</h2>
        {/* Projects animated container */}
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
              githubUrl="https://github.com/bhuvanh66"
              skills={["Python","Flask","Streamlit","scikit-learn","pandas","SQL","REST"]}
              imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop"
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
              githubUrl="https://github.com/bhuvanh66"
              skills={["Python","Streamlit","Pandas","Seaborn","Plotly","NumPy"]}
              imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=300&fit=crop"
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
              githubUrl="https://github.com/bhuvanh66"
              skills={["Next.js","React","TypeScript","AWS","Node.js"]}
              imageUrl="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=300&fit=crop"
            />
          </motion.div>
        </motion.div>
      </section>

      <section id="contact" style={{ minHeight: '80vh', padding: '6rem 1.5rem', background: 'radial-gradient(1100px 540px at 20% 30%, rgba(78, 34, 197, 0.16), transparent), radial-gradient(900px 520px at 90% 50%, rgba(250,204,21,0.14), transparent), linear-gradient(135deg, #10121F 0%, #0C0C14 60%)' }}>
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
