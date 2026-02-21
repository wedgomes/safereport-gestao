import { useState }       from 'react'
import { useIncidents }   from '../../hooks/useIncidents'
import type { Incident, IncidentFilters, Status } from '../../types'
import Stats          from './Stats'
import Filters        from './Filters'
import IncidentList   from './IncidentList'
import IncidentDetail from './IncidentDetail'

const INITIAL_FILTERS: IncidentFilters = { type: '', sector: '', status: '' }

export default function Dashboard() {
  const [filters, setFilters]   = useState<IncidentFilters>(INITIAL_FILTERS)
  const [selected, setSelected] = useState<Incident | null>(null)

  const { incidents, loading, error, updateStatus } = useIncidents(filters)

  const handleUpdateStatus = async (id: string, status: Status): Promise<void> => {
    await updateStatus(id, status)
    // Atualiza o item selecionado localmente também
    setSelected(prev => prev ? { ...prev, status } : null)
  }

  if (selected) {
    return (
      <IncidentDetail
        incident={selected}
        onBack={() => setSelected(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    )
  }

  return (
    <div>
      <h2>Painel de Ocorrências</h2>

      <Stats incidents={incidents} />
      <Filters filters={filters} setFilters={setFilters} />

      {loading && <p>Carregando...</p>}
      {error   && <p className="error-msg">Erro: {error}</p>}
      {!loading && !error && (
        <IncidentList incidents={incidents} onSelect={setSelected} />
      )}
    </div>
  )
}