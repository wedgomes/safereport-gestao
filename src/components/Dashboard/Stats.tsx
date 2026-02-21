import type { Incident } from '../../types'

interface StatsProps {
  incidents: Incident[]
}

export default function Stats({ incidents }: StatsProps) {
  const total    = incidents.length
  const pendente = incidents.filter(i => i.status === 'pendente').length
  const alta     = incidents.filter(i => i.severity === 'alta').length

  return (
    <div className="stats-row">
      <div className="stat-card">
        <span className="stat-num">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-card warning">
        <span className="stat-num">{pendente}</span>
        <span className="stat-label">Pendentes</span>
      </div>
      <div className="stat-card danger">
        <span className="stat-num">{alta}</span>
        <span className="stat-label">Gravidade Alta</span>
      </div>
    </div>
  )
}