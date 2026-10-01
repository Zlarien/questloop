import { useState, useEffect } from 'react'
import { useGameStore } from './store'
import Timer from './components/Timer'
import PlayerStats from './components/PlayerStats'
import Shop from './components/Shop'
import NesPlayer from './components/NesPlayer'

const PLAY_COST = 50

export default function App() {
  const [activeTab, setActiveTab] = useState('battle')
  const [playUnlocked, setPlayUnlocked] = useState(false)
  const gold = useGameStore((state) => state.gold)
  const buyItem = useGameStore((state) => state.buyItem)

  return (
    <div className="min-h-screen bg-dark text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="pixel-font text-4xl text-center mb-8 glow">FOCUS QUEST</h1>
        
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          <button
            onClick={() => setActiveTab('battle')}
            className={`px-6 py-2 border-2 font-bold transition ${
              activeTab === 'battle'
                ? 'bg-gold text-dark border-gold'
                : 'bg-transparent border-gold text-gold hover:bg-gold hover:text-dark'
            }`}
          >
            BATTLE
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-6 py-2 border-2 font-bold transition ${
              activeTab === 'shop'
                ? 'bg-gold text-dark border-gold'
                : 'bg-transparent border-gold text-gold hover:bg-gold hover:text-dark'
            }`}
          >
            SHOP
          </button>
          <button
            onClick={() => setActiveTab('play')}
            className={`px-6 py-2 border-2 font-bold transition ${
              activeTab === 'play'
                ? 'bg-gold text-dark border-gold'
                : 'bg-transparent border-gold text-gold hover:bg-gold hover:text-dark'
            }`}
          >
            PLAY
          </button>
        </div>

        {activeTab === 'battle' && (
          <div className="space-y-8">
            <PlayerStats />
            <Timer />
          </div>
        )}
        {activeTab === 'shop' && <Shop />}
        {activeTab === 'play' &&
          (playUnlocked ? (
            <NesPlayer
              romUrl="/roms/smb3.nes"
              onClose={() => {
                setPlayUnlocked(false)
                setActiveTab('battle')
              }}
            />
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gold">
                Debloque une partie pour {PLAY_COST} or. Tu en as {gold}.
              </p>
              <button
                onClick={() => {
                  if (gold < PLAY_COST) return
                  buyItem(PLAY_COST)
                  setPlayUnlocked(true)
                }}
                disabled={gold < PLAY_COST}
                className="px-6 py-2 border-2 border-gold text-gold hover:bg-gold hover:text-dark font-bold transition disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
              >
                JOUER (-{PLAY_COST} or)
              </button>
              <p className="text-white/60 text-sm">Termine une session pour gagner de l'or.</p>
            </div>
          ))}
      </div>
    </div>
  )
}
