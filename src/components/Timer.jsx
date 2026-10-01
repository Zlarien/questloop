import { useState, useEffect } from 'react'
import { useGameStore } from '../store'

export default function Timer() {
  const { timeLeft, isRunning, isPaused, monsterHp, maxMonsterHp, setTimeLeft, setIsRunning, setIsPaused, setMonsterHp, completeSession, reset } = useGameStore()

  useEffect(() => {
    if (!isRunning || isPaused) return

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1)
      
      if (timeLeft > 0) {
        const damagePerSecond = maxMonsterHp / 1500
        setMonsterHp(Math.max(0, monsterHp - damagePerSecond))
      }

      if (timeLeft === 1) {
        setIsRunning(false)
        completeSession()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, isPaused, timeLeft, monsterHp, maxMonsterHp, setTimeLeft, setIsRunning, setMonsterHp, completeSession])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const hpPercent = (monsterHp / maxMonsterHp) * 100

  const handleStart = () => {
    setIsRunning(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsRunning(false)
    reset()
  }

  return (
    <div className="bg-darker border-4 border-purple p-8 rounded-lg shadow-lg shadow-purple">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gold mb-4">MONSTER</h2>
        <div className="bg-dark border-2 border-neon p-4 rounded mb-2">
          <div className="flex justify-between mb-2">
            <span className="text-neon">HP</span>
            <span className="text-neon">{Math.ceil(monsterHp)}/{maxMonsterHp}</span>
          </div>
          <div className="w-full bg-dark border border-gold h-6">
            <div
              className="h-full bg-gradient-to-r from-neon to-purple transition-all"
              style={{ width: `${hpPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-dark border-4 border-gold p-8 rounded text-center mb-8">
        <h3 className="text-gold text-sm font-bold mb-4">TIME REMAINING</h3>
        <div className="text-7xl font-bold text-gold glow font-mono mb-2">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <p className="text-gold text-xs">DEFEAT THE MONSTER TO LEVEL UP</p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="px-6 py-3 bg-gold text-dark font-bold border-2 border-gold hover:opacity-80 disabled:opacity-50 transition"
        >
          START
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className="px-6 py-3 border-2 border-purple text-purple font-bold hover:bg-purple hover:text-dark disabled:opacity-50 transition"
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 border-2 border-neon text-neon font-bold hover:bg-neon hover:text-dark transition"
        >
          RESET
        </button>
      </div>
    </div>
  )
}
