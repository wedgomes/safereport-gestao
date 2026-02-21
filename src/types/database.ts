// Versão simplificada para uso sem o CLI
export type Database = {
  public: {
    Tables: {
      incidents: {
        Row:    import('./index').Incident
        Insert: Omit<import('./index').Incident, 'created_at'>
        Update: Partial<Omit<import('./index').Incident, 'id' | 'created_at'>>
      }
    }
  }
}