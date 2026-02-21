import { INCIDENT_TYPES, SEVERITY, STATUS_LABELS } from '../../lib/constants'
import type { Incident, Status } from '../../types'

interface IncidentDetailProps {
  incident:       Incident
  onBack:         () => void
  onUpdateStatus: (id: string, status: Status) => Promise<void>
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function IncidentDetail({
  incident,
  onBack,
  onUpdateStatus,
}: IncidentDetailProps) {
  const type = INCIDENT_TYPES.find(t => t.value === incident.type)
  const sev  = SEVERITY.find(s => s.value === incident.severity)

  return (
    <div className="detail-card">
      <button className="btn-secondary" onClick={onBack}>← Voltar</button>

      <div className="detail-header">
        <div>
          <span className="protocol-tag">{incident.id}</span>
          <h2>{type?.label}</h2>
          <p>{formatDate(incident.created_at)}</p>
        </div>

        <div className="status-buttons">
          {/* Object.entries retorna [string, StatusOption][], fazemos o cast para [Status, ...] */}
          {(Object.entries(STATUS_LABELS) as [Status, typeof STATUS_LABELS[Status]][]).map(
            ([key, val]) => (
              <button
                key={key}
                className={`status-btn ${incident.status === key ? 'active' : ''}`}
                style={{ '--accent': val.color } as React.CSSProperties}
                onClick={() => onUpdateStatus(incident.id, key)}
              >
                {val.label}
              </button>
            )
          )}
        </div>
      </div>

      <div className="detail-meta">
        <div><small>Setor</small><span>{incident.sector}</span></div>
        {incident.location && (
          <div><small>Local</small><span>{incident.location}</span></div>
        )}
        <div>
          <small>Gravidade</small>
          <span
            className="badge"
            style={{ color: sev?.color, background: `${sev?.color}22` }}
          >
            {sev?.label}
          </span>
        </div>
      </div>

      <div className="detail-section">
        <h4>Descrição</h4>
        <p>{incident.description}</p>
      </div>

      {incident.what_caused && (
        <div className="detail-section">
          <h4>Causa identificada</h4>
          <p>{incident.what_caused}</p>
        </div>
      )}

      {incident.what_to_improve && (
        <div className="detail-section">
          <h4>Sugestão de melhoria</h4>
          <p>{incident.what_to_improve}</p>
        </div>
      )}

      {incident.image_url && (
        <div className="detail-section">
          <h4>Foto</h4>
          <img
            src={incident.image_url}
            alt="Foto do incidente registrado"
            className="detail-image"
          />
        </div>
      )}
    </div>
  )
}