import type { Incident, Status } from './index'

export type Database = {
  public: {
    Tables: {
      incidents: {
        Row: Incident
        Insert: {
          id:              string
          type:            string
          sector:          string
          location?:       string | null
          severity:        string
          description:     string
          what_caused?:    string | null
          what_to_improve?: string | null
          image_url?:      string | null
          status?:         Status
          created_at?:     string
        }
        Update: {
          type?:           string
          sector?:         string
          location?:       string | null
          severity?:       string
          description?:    string
          what_caused?:    string | null
          what_to_improve?: string | null
          image_url?:      string | null
          status?:         Status
        }
      }
    }
    Views:   Record<string, never>
    Functions: Record<string, never>
    Enums:   Record<string, never>
  }
}