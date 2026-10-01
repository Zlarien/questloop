import { create } from 'zustand'

export const useGameStore = create((set) => ({
  level: 1,
  xp: 0,
  maxXp: 100,
  gold: 0,
  timeLeft: 1500,
  isRunning: false,
  isPaused: false,
  monsterHp: 100,
  maxMonsterHp: 100,
  
  setTimeLeft: (time) => set({ timeLeft: time }),
  setIsRunning: (running) => set({ isRunning: running }),
  setIsPaused: (paused) => set({ isPaused: paused }),
  setMonsterHp: (hp) => set({ monsterHp: hp }),
  
  completeSession: () => set((state) => {
    const newXp = state.xp + 25
    const newGold = state.gold + 10
    const levelUp = newXp >= state.maxXp
    
    return {
      xp: levelUp ? 0 : newXp,
      gold: newGold,
      level: levelUp ? state.level + 1 : state.level,
      maxXp: levelUp ? state.maxXp + 50 : state.maxXp,
      monsterHp: state.maxMonsterHp,
    }
  }),
  
  buyItem: (cost) => set((state) => ({
    gold: state.gold >= cost ? state.gold - cost : state.gold,
  })),
  
  reset: () => set({
    timeLeft: 1500,
    isRunning: false,
    isPaused: false,
    monsterHp: 100,
  }),
}))
