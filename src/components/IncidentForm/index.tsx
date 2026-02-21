import { useState }          from 'react'
import { supabase }          from '../../lib/supabase'
import type { IncidentFormData } from '../../types'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

function generateId(): string {
  return `INC-${Date.now().toString(36).toUpperCase()}`
}

const INITIAL_FORM: IncidentFormData = {
  type:          '',
  sector:        '',
  location:      '',
  severity:      '',
  description:   '',
  whatCaused:    '',
  whatToImprove: '',
  imageFile:     null,
}

export default function IncidentForm() {
  const [step, setStep]             = useState<number>(1)
  const [form, setForm]             = useState<IncidentFormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [protocol, setProtocol]     = useState<string | null>(null)

  // Generic garante que key e value sejam sempre compatíveis entre si
  const setField = <K extends keyof IncidentFormData>(
    key: K,
    value: IncidentFormData[K]
  ): void => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (): Promise<void> => {
    setSubmitting(true)
    try {
      const id = generateId()
      let imageUrl: string | null = null

      if (form.imageFile) {
        const ext      = form.imageFile.name.split('.').pop() ?? 'jpg'
        const filePath = `${id}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('incident-images')
          .upload(filePath, form.imageFile)

        if (uploadError) throw uploadError

        const { data } = supabase.storage
          .from('incident-images')
          .getPublicUrl(filePath)

        imageUrl = data.publicUrl
      }

      // TypeScript garante que só enviamos campos válidos para o banco
      const { error } = await supabase.from('incidents').insert({
        id,
        type:            form.type   || null,
        sector:          form.sector,
        location:        form.location   || null,
        severity:        form.severity   || null,
        description:     form.description,
        what_caused:     form.whatCaused     || null,
        what_to_improve: form.whatToImprove  || null,
        image_url:       imageUrl,
        status:          'pendente' as const,
      })

      if (error) throw error
      setProtocol(id)

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido'
      alert(`Erro ao enviar: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = (): void => {
    setProtocol(null)
    setStep(1)
    setForm(INITIAL_FORM)
  }

  if (protocol) {
    return (
      <div className="success-card">
        <span className="success-icon">✅</span>
        <h2>Registro Enviado!</h2>
        <p>Seu relato foi registrado de forma anônima.</p>
        <div className="protocol-box">
          <small>Protocolo</small>
          <strong>{protocol}</strong>
        </div>
        <p>Guarde este número para consultar o status com a liderança.</p>
        <button className="btn-primary" onClick={resetForm}>
          Novo Registro
        </button>
      </div>
    )
  }

  return (
    <div className="form-card">
      <div className="progress-bar">
        {([1, 2, 3] as const).map(n => (
          <div key={n} className="progress-item">
            <div className={`step-dot ${step >= n ? 'active' : ''} ${step > n ? 'done' : ''}`}>
              {step > n ? '✓' : n}
            </div>
            {n < 3 && <div className={`step-line ${step > n ? 'active' : ''}`} />}
          </div>
        ))}
      </div>

      {step === 1 && <Step1 form={form} setField={setField} onNext={() => setStep(2)} />}
      {step === 2 && <Step2 form={form} setField={setField} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
      {step === 3 && <Step3 form={form} setField={setField} onSubmit={handleSubmit} onBack={() => setStep(2)} submitting={submitting} />}
    </div>
  )
}