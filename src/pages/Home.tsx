import IncidentForm from '../components/IncidentForm'

export default function Home() {
  return (
    <div className="page-home">
      <header className="app-header">
        <div className="logo">
          <span>🦺</span>
          <div>
            <strong>SafeReport</strong>
            <small>Registro Anônimo de Ocorrências</small>
          </div>
        </div>
        <a href="/login" className="btn-secondary">Painel Gestor</a>
      </header>

      <main className="container">
        <div className="hero">
          <h1>Seu relato <span>importa</span></h1>
          <p>
            Registre situações de risco de forma rápida e completamente anônima.
            Você protege a si mesmo e a seus colegas.
          </p>
        </div>
        <IncidentForm />
      </main>
    </div>
  )
}