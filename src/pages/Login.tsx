import { useState, FormEvent } from 'react'
import { useNavigate }         from 'react-router-dom'
import { useAuth }             from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail]       = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError]       = useState<string>('')
  const [loading, setLoading]   = useState<boolean>(false)

  const { signIn } = useAuth()
  const navigate   = useNavigate()

  // FormEvent<HTMLFormElement> é o tipo correto para o evento de submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch {
      setError('Email ou senha incorretos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🦺</div>
        <h1>Painel do Gestor</h1>
        <p>Acesso restrito à liderança</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="error-msg" role="alert">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <a href="/" className="back-link">← Voltar para o registro</a>
      </div>
    </div>
  )
}