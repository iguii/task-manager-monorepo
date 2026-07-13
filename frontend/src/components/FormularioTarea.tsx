
import { useState } from 'react'

export default function FormularioTarea({ onAgregar }: any) {
  const [titulo, setTitulo] = useState('')

  function manejarEnvio(e: any) {
    e.preventDefault()
    if (titulo.trim()) {
      onAgregar(titulo)
      setTitulo('')
    }
  }

  return (
    <form onSubmit={manejarEnvio}>
      <label htmlFor='titulo-tarea'>Nueva tarea</label>
      <input
        id='titulo-tarea'
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button type='submit'>Agregar</button>
    </form>
  )
}
