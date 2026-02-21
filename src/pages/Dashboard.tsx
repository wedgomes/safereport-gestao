import { useAuth }           from '../hooks/useAuth'
import DashboardComponent    from '../components/Dashboard'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  return (
    <div className="page-dashboard">
      <header className="app-header">
        <div className="logo">
          <span>🦺</span>
          <div>
            <strong>SafeReport</strong>
            <small>Painel do Gestor</small>
          </div>
        </div>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button className="btn-secondary" onClick={signOut}>Sair</button>
        </div>
      </header>

      <main className="container">
        <DashboardComponent />
      </main>
    </div>
  )
}