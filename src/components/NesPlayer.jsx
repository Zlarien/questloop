import { useEffect, useRef, useState } from 'react'
import { NES } from 'jsnes'

const KEYMAP = {
  ArrowUp: 4,
  ArrowDown: 5,
  ArrowLeft: 6,
  ArrowRight: 7,
  KeyZ: 0, // A
  KeyX: 1, // B
  Enter: 3, // Start
  ShiftLeft: 2, // Select
  ShiftRight: 2,
}

export default function NesPlayer({ romUrl, onClose }) {
  const canvasRef = useRef(null)
  const nesRef = useRef(null)
  const rafRef = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const imageData = ctx.createImageData(256, 240)

    const nes = new NES({
      onFrame: (frameBuffer) => {
        const data = imageData.data
        for (let i = 0; i < frameBuffer.length; i++) {
          const px = frameBuffer[i]
          data[i * 4] = px & 0xff
          data[i * 4 + 1] = (px >> 8) & 0xff
          data[i * 4 + 2] = (px >> 16) & 0xff
          data[i * 4 + 3] = 0xff
        }
        ctx.putImageData(imageData, 0, 0)
      },
      onAudioSample: () => {},
    })
    nesRef.current = nes

    fetch(romUrl)
      .then((res) => res.arrayBuffer())
      .then((buf) => {
        if (cancelled) return
        const bytes = new Uint8Array(buf)
        let binary = ''
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
        nes.loadROM(binary)
        setStatus('playing')
        const loop = () => {
          nes.frame()
          rafRef.current = requestAnimationFrame(loop)
        }
        rafRef.current = requestAnimationFrame(loop)
      })
      .catch(() => !cancelled && setStatus('error'))

    const handleKey = (down) => (e) => {
      const button = KEYMAP[e.code]
      if (button === undefined) return
      e.preventDefault()
      if (down) nes.buttonDown(1, button)
      else nes.buttonUp(1, button)
    }
    const onKeyDown = handleKey(true)
    const onKeyUp = handleKey(false)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    return () => {
      cancelled = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [romUrl])

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={256}
        height={240}
        className="border-2 border-gold"
        style={{ width: 512, height: 480, imageRendering: 'pixelated' }}
      />
      {status === 'loading' && <p className="text-gold">Chargement de la ROM...</p>}
      {status === 'error' && <p className="text-red-500">ROM introuvable ({romUrl}).</p>}
      <p className="text-xs text-white/60 text-center max-w-md">
        Fleches = deplacer, Z = A, X = B, Entree = Start, Maj = Select
      </p>
      <button
        onClick={onClose}
        className="px-6 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-dark font-bold transition"
      >
        FERMER
      </button>
    </div>
  )
}
