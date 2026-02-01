import { create } from 'zustand'

export const useGameStore = create((set, get) => ({
  // Player stats
  money: 0,
  reputation: 0,
  day: 1,
  
  // Camera state
  isZoomedIn: false,
  zoomTarget: 'monitor', // 'monitor', 'poster', etc.
  
  // Task management
  currentTask: null,
  completedTasks: [],
  unreadMails: [1, 2, 3], // Task IDs of unread mails
  
  // Window management
  openWindows: [],
  activeWindow: null,
  
  // Camera Actions
  zoomIn: () => set({ isZoomedIn: true }),
  zoomOut: () => set({ isZoomedIn: false }),
  toggleZoom: () => set((state) => ({ isZoomedIn: !state.isZoomedIn })),
  
  // Actions
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  addReputation: (amount) => set((state) => ({ reputation: state.reputation + amount })),
  
  setCurrentTask: (task) => set({ currentTask: task }),
  
  completeTask: (taskId) => set((state) => ({
    completedTasks: [...state.completedTasks, taskId],
    currentTask: null,
    unreadMails: state.unreadMails.filter(id => id !== taskId),
  })),
  
  markMailAsRead: (taskId) => set((state) => ({
    unreadMails: state.unreadMails.filter(id => id !== taskId),
  })),
  
  openWindow: (windowId) => set((state) => ({
    openWindows: state.openWindows.includes(windowId) 
      ? state.openWindows 
      : [...state.openWindows, windowId],
    activeWindow: windowId,
  })),
  
  closeWindow: (windowId) => set((state) => ({
    openWindows: state.openWindows.filter(id => id !== windowId),
    activeWindow: state.openWindows.filter(id => id !== windowId)[0] || null,
  })),
  
  focusWindow: (windowId) => set({ activeWindow: windowId }),
  
  nextDay: () => set((state) => ({ day: state.day + 1 })),
}))
