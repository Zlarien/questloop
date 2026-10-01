import { useGameStore } from '../store'

export default function PlayerStats() {
  const { level, xp, maxXp, gold } = useGameStore()
  const xpPercent = (xp / maxXp) * 100

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-darker border-4 border-gold p-4 rounded">
        <h3 className="text-gold text-sm font-bold mb-2">LEVEL</h3>
        <p className="text-4xl font-bold text-gold glow">{level}</p>
      </div>

      <div className="bg-darker border-4 border-purple p-4 rounded">
        <h3 className="text-purple text-sm font-bold mb-2">EXPERIENCE</h3>
        <div className="flex justify-between text-xs text-purple mb-1">
          <span>{xp}</span>
          <span>{maxXp}</span>
        </div>
        <div className="w-full bg-dark border border-purple h-4">
          <div
            className="h-full bg-gradient-to-r from-purple to-neon transition-all"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      <div className="bg-darker border-4 border-neon p-4 rounded">
        <h3 className="text-neon text-sm font-bold mb-2">GOLD</h3>
        <p className="text-4xl font-bold text-neon glow">{gold}</p>
      </div>
    </div>
  )
}
