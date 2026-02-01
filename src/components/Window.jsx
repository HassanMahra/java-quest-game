import { motion } from 'framer-motion'
import { X, Minus, Square } from 'lucide-react'
import { useGameStore } from '../stores/gameStore'

export function Window({ id, title, icon: Icon, children, width = 800, height = 600 }) {
  const { openWindows, activeWindow, closeWindow, focusWindow } = useGameStore()
  
  if (!openWindows.includes(id)) return null
  
  const isActive = activeWindow === id
  const zIndex = isActive ? 50 : 40
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ 
        width, 
        height: height === 'auto' ? 'auto' : height,
        maxHeight: 'calc(100vh - 100px)',
        zIndex 
      }}
      onClick={() => focusWindow(id)}
    >
      <div className={`
        h-full flex flex-col rounded-lg overflow-hidden
        ${isActive ? 'shadow-2xl ring-1 ring-vscode-blue' : 'shadow-lg opacity-95'}
        bg-dark-surface border border-dark-border
      `}>
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-bg border-b border-dark-border">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={16} className="text-vscode-blue" />}
            <span className="text-sm font-medium text-gray-300">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-dark-border rounded transition-colors">
              <Minus size={14} className="text-gray-400" />
            </button>
            <button className="p-1 hover:bg-dark-border rounded transition-colors">
              <Square size={12} className="text-gray-400" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
              className="p-1 hover:bg-red-500 rounded transition-colors group"
            >
              <X size={14} className="text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
