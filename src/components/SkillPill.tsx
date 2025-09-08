import { categorizeSkill } from '../utils/categorizeSkill'

type SkillPillProps = { label: string }

export default function SkillPill({ label }: SkillPillProps) {
  const category = categorizeSkill(label)
  const colorMap: Record<string, string> = {
    frontend: 'linear-gradient(135deg, rgba(59,130,246,0.22), rgba(99,102,241,0.22))',
    backend: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(34,197,94,0.22))',
    framework: 'linear-gradient(135deg, rgba(234,179,8,0.22), rgba(249,115,22,0.22))',
    ai: 'linear-gradient(135deg, rgba(236,72,153,0.22), rgba(168,85,247,0.22))',
    database: 'linear-gradient(135deg, rgba(14,165,233,0.22), rgba(45,212,191,0.22))',
    other: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12))',
  }
  const bg = colorMap[category]
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 10px',
        background: bg,
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 9999,
        fontSize: 12,
        letterSpacing: 0.2,
        color: '#ffffff',
      }}
    >
      {label}
    </span>
  )
}


