import { useGameStore } from '../store'

const ITEMS = [
  { id: 1, name: 'Iron Sword', cost: 50, emoji: '⚔️' },
  { id: 2, name: 'Shield', cost: 75, emoji: '🛡️' },
  { id: 3, name: 'Dragon Armor', cost: 150, emoji: '🐉' },
  { id: 4, name: 'Golden Crown', cost: 200, emoji: '👑' },
  { id: 5, name: 'Magic Wand', cost: 100, emoji: '✨' },
  { id: 6, name: 'Health Potion', cost: 25, emoji: '🧪' },
]

export default function Shop() {
  const { gold, buyItem } = useGameStore()

  const handleBuy = (cost) => {
    if (gold >= cost) {
      buyItem(cost)
      alert('Item purchased!')
    } else {
      alert('Not enough gold!')
    }
  }

  return (
    <div className="bg-darker border-4 border-gold p-8 rounded-lg">
      <h2 className="pixel-font text-3xl text-gold text-center mb-2 glow">SHOP</h2>
      <p className="text-center text-neon mb-8">Your Gold: {gold}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ITEMS.map((item) => (
          <div
            key={item.id}
            className="bg-dark border-2 border-purple p-4 rounded hover:border-gold transition"
          >
            <div className="text-4xl text-center mb-2">{item.emoji}</div>
            <h3 className="font-bold text-gold text-center mb-2">{item.name}</h3>
            <p className="text-neon text-center text-sm mb-4">{item.cost} gold</p>
            <button
              onClick={() => handleBuy(item.cost)}
              disabled={gold < item.cost}
              className={`w-full py-2 font-bold border-2 border-gold text-gold transition ${
                gold >= item.cost
                  ? 'hover:bg-gold hover:text-dark'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              BUY
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
