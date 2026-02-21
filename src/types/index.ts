// ── Tipos base (espelham exatamente as colunas do banco) ──────────────────────

export type IncidentType = 'quase_acidente' | 'acidente' | 'risco' | 'melhoria'
export type Severity     = 'baixa' | 'media' | 'alta'
export type Status       = 'pendente' | 'em_analise' | 'resolvido'

// Representa um incidente como vem do banco de dados
export interface Incident {
  id:              string
  type:            IncidentType
  sector:          string
  location:        string | null
  severity:        Severity
  description:     string
  what_caused:     string | null
  what_to_improve: string | null
  image_url:       string | null
  status:          Status
  created_at:      string   // ISO 8601 (ex: "2025-02-19T14:30:00Z")
}

// ── Tipos do formulário (o que o usuário preenche) ────────────────────────────

export interface IncidentFormData {
  type:          IncidentType | ''
  sector:        string
  location:      string
  severity:      Severity | ''
  description:   string
  whatCaused:    string
  whatToImprove: string
  imageFile:     File | null
}

// ── Tipos dos filtros do painel ───────────────────────────────────────────────

export interface IncidentFilters {
  type:   IncidentType | ''
  sector: string
  status: Status | ''
}

// ── Tipos das constantes de UI ────────────────────────────────────────────────

export interface IncidentTypeOption {
  value: IncidentType
  label: string
  color: string
}

export interface SeverityOption {
  value: Severity
  label: string
  color: string
}

export interface StatusOption {
  label: string
  color: string
}

// ── Tipos dos hooks ───────────────────────────────────────────────────────────

export interface UseAuthReturn {
  user:    import('@supabase/supabase-js').User | null
  loading: boolean
  signIn:  (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export interface UseIncidentsReturn {
  incidents:    Incident[]
  loading:      boolean
  error:        string | null
  updateStatus: (id: string, status: Status) => Promise<void>
  refetch:      () => Promise<void>
}