import type {
  IncidentTypeOption,
  SeverityOption,
  StatusOption,
  Status,
} from '../types'

// "as const" congela o array, tornando os valores literais em vez de string genérica
export const SECTORS = [
  'Produção', 'Almoxarifado', 'Meio Ambiente', 'Processos',
  'Garantia de Qualidade', 'RH', 'Segurança do Trabalho',
  'Manutenção', 'Expedição', 'Administração', 'Outro',
] as const

// Tipo derivado automaticamente do array acima
export type Sector = typeof SECTORS[number]

export const INCIDENT_TYPES: IncidentTypeOption[] = [
  { value: 'quase_acidente', label: '⚡ Quase-Acidente',       color: '#F59E0B' },
  { value: 'acidente',       label: '🔴 Acidente',             color: '#EF4444' },
  { value: 'risco',          label: '⚠️ Situação de Risco',    color: '#F97316' },
  { value: 'melhoria',       label: '💡 Sugestão de Melhoria', color: '#3B82F6' },
]

export const SEVERITY: SeverityOption[] = [
  { value: 'baixa', label: 'Baixa', color: '#22C55E' },
  { value: 'media', label: 'Média', color: '#F59E0B' },
  { value: 'alta',  label: 'Alta',  color: '#EF4444' },
]

// Record<Status, StatusOption> garante que todas as chaves do tipo Status existam
export const STATUS_LABELS: Record<Status, StatusOption> = {
  pendente:   { label: 'Pendente',   color: '#F59E0B' },
  em_analise: { label: 'Em Análise', color: '#3B82F6' },
  resolvido:  { label: 'Resolvido',  color: '#22C55E' },
}