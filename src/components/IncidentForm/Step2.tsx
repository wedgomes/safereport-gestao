import { ChangeEvent } from 'react'
import type { IncidentFormData } from '../../types'

interface Step2Props {
  form:     IncidentFormData
  setField: <K extends keyof IncidentFormData>(key: K, value: IncidentFormData[K]) => void
  onNext:   () => void
  onBack:   () => void
}

export default function Step2({ form, setField, onNext, onBack }: Step2Props) {
  const canProceed = form.description.length >= 10

  return (
    <div className="step-content">
      <h3>Descreva o ocorrido</h3>

      <label>Descrição *</label>
      <textarea
        rows={4}
        placeholder="Descreva com detalhes o que você viu ou vivenciou..."
        value={form.description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setField('description', e.target.value)
        }
      />
      <small>{form.description.length} caracteres (mínimo 10)</small>

      <label>O que causou? (opcional)</label>
      <textarea
        rows={2}
        placeholder="Identifique possíveis causas..."
        value={form.whatCaused}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setField('whatCaused', e.target.value)
        }
      />

      <label>Como poderia ser evitado? (opcional)</label>
      <textarea
        rows={2}
        placeholder="Sugestões para evitar recorrência..."
        value={form.whatToImprove}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setField('whatToImprove', e.target.value)
        }
      />

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>← Voltar</button>
        <button className="btn-primary" onClick={onNext} disabled={!canProceed}>
          Continuar →
        </button>
      </div>
    </div>
  )
}