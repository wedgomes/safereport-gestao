import { ChangeEvent } from 'react'
import type { IncidentFormData } from '../../types'

interface Step3Props {
  form:       IncidentFormData
  setField:   <K extends keyof IncidentFormData>(key: K, value: IncidentFormData[K]) => void
  onSubmit:   () => Promise<void>
  onBack:     () => void
  submitting: boolean
}

export default function Step3({ form, setField, onSubmit, onBack, submitting }: Step3Props) {
  const handleImage = (e: ChangeEvent<HTMLInputElement>): void => {
    // e.target.files pode ser null — o operador ?. lida com isso com segurança
    const file = e.target.files?.[0] ?? null
    setField('imageFile', file)
  }

  return (
    <div className="step-content">
      <h3>Foto (opcional)</h3>
      <p>Adicione uma foto da situação de risco ou do ocorrido.</p>

      <label className="upload-area">
        {form.imageFile ? (
          <img
            src={URL.createObjectURL(form.imageFile)}
            alt="Prévia da foto do incidente"
            className="image-preview"
          />
        ) : (
          <div className="upload-placeholder">
            <span>📷</span>
            <span>Clique para anexar foto</span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleImage} hidden />
      </label>

      {form.imageFile && (
        <button
          type="button"
          className="btn-text"
          onClick={() => setField('imageFile', null)}
        >
          Remover foto
        </button>
      )}

      <div className="anonymous-badge">
        🔒 Registro 100% anônimo — nenhuma identificação é solicitada
      </div>

      <div className="btn-row">
        <button className="btn-secondary" onClick={onBack}>← Voltar</button>
        <button
          className="btn-primary"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? 'Enviando...' : '✅ Enviar Relato'}
        </button>
      </div>
    </div>
  )
}