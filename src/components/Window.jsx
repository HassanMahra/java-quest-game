import { motion } from 'framer-motion'
import { X, Minus, Square } from 'lucide-react'
import { useGameStore } from '../stores/gameStore'
import { soundManager } from '../utils/sounds'

export function Window({ id, title, icon: Icon, children, width = 'auto', height = 'auto' }) {
  const { openWindows, activeWindow, closeWindow, focusWindow } = useGameStore()
  
  if (!openWindows.includes(id)) return null
  
  const isActive = activeWindow === id
  const zIndex = isActive ? 50 : 40
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute inset-2"
      style={{ zIndex }}
      onClick={() => focusWindow(id)}
    >
      <div className={`
        h-full w-full flex flex-col rounded overflow-hidden
        ${isActive ? 'shadow-lg ring-1 ring-vscode-blue' : 'shadow-md opacity-95'}
        bg-dark-surface border border-dark-border
      `}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-dark-bg border-b border-dark-border shrink-0">
          <div className="flex items-center gap-1.5">
            {Icon && <Icon size={12} className="text-vscode-blue" />}
            <span className="text-xs font-medium text-gray-300 truncate">{title}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <button className="p-0.5 hover:bg-dark-border rounded transition-colors">
              <Minus size={10} className="text-gray-400" />
            </button>
            <button className="p-0.5 hover:bg-dark-border rounded transition-colors">
              <Square size={8} className="text-gray-400" />
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                soundManager.play('windowClose');
                closeWindow(id); 
              }}
              className="p-0.5 hover:bg-red-500 rounded transition-colors group"
            >
              <X size={10} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto text-xs">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
