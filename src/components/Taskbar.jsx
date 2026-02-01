import { motion } from 'framer-motion'
import { Mail, Code, Wallet, Music, Settings, Power } from 'lucide-react'
import { useGameStore } from '../stores/gameStore'

const taskbarItems = [
  { id: 'mail', icon: Mail, label: 'Mail', showBadge: true },
  { id: 'ide', icon: Code, label: 'IDE' },
  { id: 'bank', icon: Wallet, label: 'Bank' },
  { id: 'music', icon: Music, label: 'Musik' },
]

export function Taskbar() {
  const { openWindow, money, reputation, day, unreadMails } = useGameStore()
  
  const currentTime = new Date().toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
  
  return (
    <motion.div 
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="absolute bottom-0 left-0 right-0 h-14 bg-dark-bg/95 backdrop-blur-sm border-t border-dark-border flex items-center justify-between px-4 z-[100]"
    >
      {/* Left: Start & Apps */}
      <div className="flex items-center gap-2">
        {/* Start Button */}
        <button className="p-2 hover:bg-dark-border rounded-lg transition-colors group">
          <Power size={20} className="text-vscode-blue group-hover:text-white" />
        </button>
        
        <div className="w-px h-8 bg-dark-border mx-2" />
        
        {/* App Icons */}
        {taskbarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => openWindow(item.id)}
            className="relative p-3 hover:bg-dark-border rounded-lg transition-all group"
            title={item.label}
          >
            <item.icon size={22} className="text-gray-400 group-hover:text-white transition-colors" />
            
            {/* Unread badge for mail */}
            {item.showBadge && unreadMails.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadMails.length}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Center: Stats */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-dark-surface rounded-lg">
          <span className="text-success-green font-mono font-bold">{money} €</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-dark-surface rounded-lg">
          <span className="text-vscode-blue font-mono">⭐ {reputation} XP</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-dark-surface rounded-lg">
          <span className="text-gray-400 font-mono">Tag {day}</span>
        </div>
      </div>
      
      {/* Right: System Tray */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-dark-border rounded transition-colors">
          <Settings size={18} className="text-gray-400" />
        </button>
        <div className="text-gray-300 font-mono text-sm">
          {currentTime}
        </div>
      </div>
    </motion.div>
  )
}
