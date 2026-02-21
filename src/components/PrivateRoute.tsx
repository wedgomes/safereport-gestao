import { ReactNode }    from 'react'
import { Navigate }     from 'react-router-dom'
import { useAuth }      from '../hooks/useAuth'

// ReactNode é o tipo correto para a prop "children" em React
interface PrivateRouteProps {
  children: ReactNode
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span>Verificando acesso...</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  // TypeScript sabe que "children" é ReactNode, então renderiza diretamente
  return <>{children}</>
}