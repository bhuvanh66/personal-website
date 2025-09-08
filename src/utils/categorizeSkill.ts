export type SkillCategory = 'frontend' | 'backend' | 'framework' | 'ai' | 'database' | 'other'

const frontendSet = new Set(['HTML','CSS','TypeScript','JavaScript','React','Next.js','Swift','XCode','p5.js','Three.js'])
const backendSet = new Set(['Node.js','Express','Flask','AWS Lambda','SQS','Twilio','Docker'])
const frameworkSet = new Set(['Framer Motion','GSAP','ScrollTrigger','Streamlit','MongoDB Atlas','Vercel','Elastic Beanstalk'])
const aiSet = new Set(['OpenAI','OpenAI API','scikit-learn','SKLearn','pandas','NumPy','Matplotlib','Seaborn'])
const dbSet = new Set(['MongoDB','MySQL','SQL','PostgreSQL'])

export function categorizeSkill(label: string): SkillCategory {
  const key = label.trim()
  if (frontendSet.has(key)) return 'frontend'
  if (backendSet.has(key)) return 'backend'
  if (frameworkSet.has(key)) return 'framework'
  if (aiSet.has(key)) return 'ai'
  if (dbSet.has(key)) return 'database'
  return 'other'
}


