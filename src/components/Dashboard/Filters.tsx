import { ChangeEvent } from 'react'
import { INCIDENT_TYPES, SECTORS, STATUS_LABELS } from '../../lib/constants'
import type { IncidentFilters } from '../../types'

interface FiltersProps {
  filters:    IncidentFilters
  setFilters: (fn: (prev: IncidentFilters) => IncidentFilters) => void
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  // Função helper para atualizar um campo do filtro
  const set = <K extends keyof IncidentFilters>(
    key: K,
    value: IncidentFilters[K]
  ): void => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="filters-row">
      <select
        value={filters.type}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          // O cast é necessário pois e.target.value é string genérica
          set('type', e.target.value as IncidentFilters['type'])
        }
      >
        <option value="">Todos os tipos</option>
        {INCIDENT_TYPES.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>

      <select
        value={filters.sector}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => set('sector', e.target.value)}
      >
        <option value="">Todos os setores</option>
        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      <select
        value={filters.status}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          set('status', e.target.value as IncidentFilters['status'])
        }
      >
        <option value="">Todos os status</option>
        {(Object.entries(STATUS_LABELS) as [IncidentFilters['status'], { label: string }][]).map(
          ([k, v]) => <option key={k} value={k}>{v.label}</option>
        )}
      </select>
    </div>
  )
}