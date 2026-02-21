import { INCIDENT_TYPES, SEVERITY, STATUS_LABELS } from '../../lib/constants'
import type { Incident } from '../../types'

interface IncidentListProps {
  incidents: Incident[]
  onSelect:  (incident: Incident) => void
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function IncidentList({ incidents, onSelect }: IncidentListProps) {
  if (incidents.length === 0) {
    return (
      <div className="empty-state">
        <span>📋</span>
        <p>Nenhum registro encontrado</p>
      </div>
    )
  }

  return (
    <div className="incident-list">
      {incidents.map(inc => {
        // .find() pode retornar undefined — o operador ? evita erro
        const type   = INCIDENT_TYPES.find(t => t.value === inc.type)
        const sev    = SEVERITY.find(s => s.value === inc.severity)
        const status = STATUS_LABELS[inc.status]

        return (
          <div key={inc.id} className="incident-item" onClick={() => onSelect(inc)}>
            <div className="incident-header">
              <div className="badges">
                <span
                  className="badge"
                  style={{ color: type?.color, background: `${type?.color}22` }}
                >
                  {type?.label}
                </span>
                <span
                  className="badge"
                  style={{ color: sev?.color, background: `${sev?.color}22` }}
                >
                  {sev?.label}
                </span>
              </div>
              <span
                className="badge"
                style={{ color: status.color, background: `${status.color}22` }}
              >
                {status.label}
              </span>
            </div>

            <p className="incident-desc">
              {inc.description.slice(0, 100)}
              {inc.description.length > 100 ? '...' : ''}
            </p>

            <div className="incident-meta">
              <span>📍 {inc.sector}{inc.location ? ` · ${inc.location}` : ''}</span>
              <span>{formatDate(inc.created_at)}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}