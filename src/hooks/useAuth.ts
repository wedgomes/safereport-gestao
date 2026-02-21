import { useState, useEffect } from 'react'
import type { User }           from '@supabase/supabase-js'
import { supabase }            from '../lib/supabase'
import type { UseAuthReturn }  from '../types'

export function useAuth(): UseAuthReturn {
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Verifica se há sessão ativa ao carregar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Escuta mudanças de sessão em tempo real (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<void> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut()
  }

  return { user, loading, signIn, signOut }
}