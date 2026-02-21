import { useState, useEffect, useCallback } from 'react'
import { supabase }                         from '../lib/supabase'
import type {
  Incident,
  IncidentFilters,
  Status,
  UseIncidentsReturn,
} from '../types'

export function useIncidents(filters: IncidentFilters): UseIncidentsReturn {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading]     = useState<boolean>(true)
  const [error, setError]         = useState<string | null>(null)

  // useCallback evita que a função seja recriada a cada render
  const fetchIncidents = useCallback(async (): Promise<void> => {
    setLoading(true)
    setError(null)

    try {
      let query = supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false })

      // TypeScript garante que os valores dos filtros são válidos
      if (filters.type)   query = query.eq('type', filters.type)
      if (filters.sector) query = query.eq('sector', filters.sector)
      if (filters.status) query = query.eq('status', filters.status)

      const { data, error: queryError } = await query

      if (queryError) throw queryError
      setIncidents(data as Incident[])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [filters.type, filters.sector, filters.status])

  useEffect(() => {
    fetchIncidents()
  }, [fetchIncidents])

  const updateStatus = async (id: string, status: Status): Promise<void> => {
    const { error: updateError } = await supabase
      .from('incidents')
      .update({ status })
      .eq('id', id)

    if (updateError) throw updateError

    // Atualiza o estado local sem refazer a requisição
    setIncidents(prev =>
      prev.map(i => i.id === id ? { ...i, status } : i)
    )
  }

  return { incidents, loading, error, updateStatus, refetch: fetchIncidents }
}