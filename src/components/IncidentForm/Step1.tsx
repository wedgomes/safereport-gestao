import { ChangeEvent } from 'react'
import { INCIDENT_TYPES, SECTORS, SEVERITY } from '../../lib/constants'
import type { IncidentFormData } from '../../types'

// Props tipadas explicitamente
interface Step1Props {
  form:     IncidentFormData
  setField: <K extends keyof IncidentFormData>(key: K, value: IncidentFormData[K]) => void
  onNext:   () => void
}

export default function Step1({ form, setField, onNext }: Step1Props) {
  const canProceed = form.type !== '' && form.sector !== '' && form.severity !== ''

  return (
    <div className="step-content">
      <h3>O que aconteceu?</h3>

      <label>Tipo de Ocorrência *</label>
      <div className="type-grid">
        {INCIDENT_TYPES.map(t => (
          <button
            key={t.value}
            type="button"
            className={`type-btn ${form.type === t.value ? 'selected' : ''}`}
            style={{ '--accent': t.color } as React.CSSProperties}
            onClick={() => setField('type', t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <label>Setor *</label>
      <select
        value={form.sector}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setField('sector', e.target.value)}
      >
        <option value="">Selecione o setor</option>
        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <label>Local específico</label>
      <input
        type="text"
        placeholder="Ex: Linha 3, Almox. B, Portão 2..."
        value={form.location}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setField('location', e.target.value)}
      />

      <label>Gravidade *</label>
      <div className="severity-row">
        {SEVERITY.map(s => (
          <button
            key={s.value}
            type="button"
            className={`sev-btn ${form.severity === s.value ? 'selected' : ''}`}
            style={{ '--accent': s.color } as React.CSSProperties}
            onClick={() => setField('severity', s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <button className="btn-primary" onClick={onNext} disabled={!canProceed}>
        Continuar →
      </button>
    </div>
  )
}