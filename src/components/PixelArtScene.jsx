// Pixel Art Scene with Immersive POV Zoom
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useGameStore } from '../stores/gameStore'
import { soundManager } from '../utils/sounds'

export function PixelArtScene({ children }) {
  const { isZoomedIn, zoomIn, zoomOut } = useGameStore()
  
  // ESC to zoom out
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isZoomedIn) {
        soundManager.play('windowClose')
        zoomOut()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomedIn, zoomOut])
  
  const handleMonitorClick = () => {
    if (!isZoomedIn) {
      soundManager.play('windowOpen')
      zoomIn()
    }
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0a0f]">
      {/* Zoomable Scene Container */}
      <motion.div
        className="absolute origin-center"
        style={{ 
          width: '100%', 
          height: '100%',
          imageRendering: 'pixelated',
        }}
        animate={{
          scale: isZoomedIn ? 3.5 : 1,
          x: isZoomedIn ? '0%' : '0%',
          y: isZoomedIn ? '-25%' : '0%',
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
      >
        {/* === OFFICE BACKGROUND === */}
        <div className="absolute inset-0">
          
          {/* Back Wall - Dark with texture */}
          <div className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
            {/* Wall panels */}
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-full h-px bg-[#0f0f1a]/50"
                style={{ top: `${15 + i * 15}%` }}
              />
            ))}
            {/* Vertical lines */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-full w-px bg-[#0f0f1a]/30"
                style={{ left: `${12.5 * (i + 1)}%` }}
              />
            ))}
          </div>
          
          {/* Window on wall (left side) */}
          <div className="absolute left-[8%] top-[10%] w-28 h-36">
            <div className="absolute inset-0 bg-[#0f3460] border-4 border-[#1a1a2e] rounded-sm">
              <div className="absolute inset-2 bg-gradient-to-b from-[#1e5f74] to-[#0c2d48] overflow-hidden">
                {/* Stars */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ 
                      left: `${10 + Math.random() * 80}%`, 
                      top: `${5 + Math.random() * 70}%`,
                      opacity: 0.3 + Math.random() * 0.7
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity }}
                  />
                ))}
                {/* Moon */}
                <motion.div 
                  className="absolute right-2 top-2 w-5 h-5 bg-[#ffeaa7] rounded-full"
                  animate={{ boxShadow: ['0 0 10px #ffeaa7', '0 0 20px #ffeaa7', '0 0 10px #ffeaa7'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              {/* Window frame cross */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#1a1a2e] -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#1a1a2e] -translate-x-1/2" />
            </div>
            {/* Window sill */}
            <div className="absolute -bottom-2 -left-1 -right-1 h-3 bg-[#2d3436]" />
          </div>
          
          {/* Poster on wall (right side) */}
          <div className="absolute right-[12%] top-[12%] w-16 h-24 bg-[#e94560] border-2 border-[#1a1a2e] shadow-lg transform rotate-1">
            <div className="absolute inset-1 flex flex-col items-center justify-center text-white">
              <div className="text-[6px] font-bold">KEEP</div>
              <div className="text-[6px] font-bold">CALM</div>
              <div className="text-[5px] opacity-80">AND</div>
              <div className="text-[6px] font-bold">CODE</div>
            </div>
          </div>
          
          {/* Clock on wall */}
          <div className="absolute right-[30%] top-[15%] w-10 h-10 bg-[#2d3436] rounded-full border-2 border-[#1a1a2e]">
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <div className="w-px h-3 bg-black origin-bottom rotate-45" />
              <div className="w-px h-2 bg-black origin-bottom -rotate-12" />
            </div>
          </div>
          
          {/* Floor */}
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-[#1a1a2e] to-[#0f0e17]">
            {/* Floor boards */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-full h-px bg-[#252530]"
                style={{ top: `${i * 12}%` }}
              />
            ))}
          </div>
          
          {/* === DESK === */}
          <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[75%]">
            {/* Desk surface */}
            <div className="relative h-8 bg-gradient-to-b from-[#5c4033] to-[#3d2914] rounded-t border-t-2 border-[#6d4c3d]">
              {/* Wood grain lines */}
              <div className="absolute inset-x-4 top-2 h-px bg-[#6d4c3d]/50" />
              <div className="absolute inset-x-8 top-4 h-px bg-[#6d4c3d]/30" />
            </div>
            {/* Desk front panel */}
            <div className="h-6 bg-[#2d1f10]" />
            {/* Desk legs */}
            <div className="absolute top-14 left-[5%] w-4 h-20 bg-[#2d1f10]" />
            <div className="absolute top-14 right-[5%] w-4 h-20 bg-[#2d1f10]" />
            
            {/* Items on desk */}
            {/* Coffee mug (left) */}
            <div className="absolute -top-5 left-[8%]">
              <div className="w-4 h-4 bg-[#e94560] rounded-b-sm" />
              <div className="absolute top-1 -right-1.5 w-1.5 h-2 border border-[#e94560] rounded-r-full" />
              <div className="absolute top-0.5 left-0.5 w-3 h-1 bg-[#3d2914] rounded" />
            </div>
            
            {/* Stack of papers */}
            <div className="absolute -top-3 left-[20%]">
              <div className="w-8 h-1.5 bg-white/90 transform rotate-2" />
              <div className="w-8 h-1.5 bg-white/80 transform -rotate-1 -mt-0.5" />
            </div>
            
            {/* Small plant */}
            <div className="absolute -top-8 right-[15%]">
              <div className="w-3 h-4 bg-[#4a3728] rounded-t-sm" />
              <div className="absolute -top-3 left-0 w-1 h-4 bg-[#2d6a4f]" />
              <div className="absolute -top-4 -left-1 w-2 h-2 bg-[#40916c] rounded-full" />
              <div className="absolute -top-5 left-0.5 w-2 h-2 bg-[#52b788] rounded-full" />
              <div className="absolute -top-4 left-1 w-2 h-2 bg-[#40916c] rounded-full" />
            </div>
          </div>
          
          {/* === MONITOR (Clickable for Zoom) === */}
          <motion.div 
            className="absolute bottom-[30%] left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={handleMonitorClick}
            whileHover={!isZoomedIn ? { scale: 1.02 } : {}}
          >
            {/* Monitor body */}
            <div className="relative w-64 bg-[#2d3436] p-2 rounded-t-lg border-2 border-[#1a1a2e]">
              {/* Bezel */}
              <div className="relative w-full bg-[#1e1e1e] rounded overflow-hidden" style={{ aspectRatio: '16/10' }}>
                {/* Screen glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#252530] to-[#1a1a2e] opacity-50" />
                
                {/* Power LED */}
                <motion.div 
                  className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#00ff00] rounded-full z-50"
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Desktop hint text when zoomed out */}
                {!isZoomedIn && (
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <div className="text-[8px] text-vscode-blue font-mono">💻 Klick zum Hinsetzen</div>
                    </div>
                  </motion.div>
                )}
                
                {/* Actual screen content (visible when zoomed) */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isZoomedIn ? 'opacity-100' : 'opacity-30'}`}>
                  {children}
                </div>
              </div>
            </div>
            
            {/* Monitor stand */}
            <div className="mx-auto w-12 h-4 bg-[#2d3436] border-x-2 border-[#1a1a2e]" />
            <div className="mx-auto w-20 h-2 bg-[#2d3436] rounded-b border-2 border-t-0 border-[#1a1a2e]" />
          </motion.div>
          
          {/* Keyboard */}
          <div className="absolute bottom-[24%] left-1/2 -translate-x-1/2 w-28 h-4 bg-[#2d3436] rounded border border-[#1a1a2e]">
            <div className="absolute inset-0.5 grid grid-cols-14 gap-px">
              {[...Array(42)].map((_, i) => (
                <div key={i} className="bg-[#636e72] rounded-sm" />
              ))}
            </div>
          </div>
          
          {/* Mouse */}
          <div className="absolute bottom-[24%] left-[58%] w-3 h-5 bg-[#2d3436] rounded-full border border-[#1a1a2e]">
            <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-[#636e72] rounded" />
          </div>
          
          {/* === CHARACTER (Developer sitting) === */}
          <PixelCharacter isZoomedIn={isZoomedIn} />
          
          {/* === CHAIR === */}
          <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2">
            {/* Chair back */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-16 h-12 bg-[#2d3436] rounded-t-lg border-2 border-[#1a1a2e]" />
            {/* Seat */}
            <div className="w-18 h-3 bg-[#2d3436] rounded border border-[#1a1a2e]" />
            {/* Pole */}
            <div className="mx-auto w-2 h-6 bg-[#636e72]" />
            {/* Base */}
            <div className="mx-auto w-16 h-1.5 bg-[#636e72] rounded" />
            {/* Wheels */}
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#2d3436] rounded-full" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#2d3436] rounded-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#2d3436] rounded-full" />
          </div>
        </div>
      </motion.div>
      
      {/* Zoom out hint (when zoomed in) */}
      <AnimatePresence>
        {isZoomedIn && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[200]"
          >
            <button
              onClick={() => { soundManager.play('windowClose'); zoomOut(); }}
              className="px-4 py-2 bg-dark-surface/90 hover:bg-dark-border text-gray-300 text-sm rounded-lg border border-dark-border backdrop-blur-sm transition-colors"
            >
              ⎋ ESC zum Aufstehen
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PixelCharacter({ isZoomedIn }) {
  return (
    <motion.div 
      className="absolute bottom-[26%] left-[42%] z-10 pointer-events-none"
      animate={{ 
        y: [0, -1, 0],
        opacity: isZoomedIn ? 0 : 1, // Hide character when zoomed in (you ARE the character)
        scale: isZoomedIn ? 0.8 : 1,
      }}
      transition={{ 
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      }}
    >
      <div className="relative" style={{ transform: 'scale(1.2)' }}>
        {/* Hair */}
        <div className="absolute -top-1 left-0.5 w-9 h-3 bg-[#2d1810] rounded-t" />
        
        {/* Head */}
        <div className="absolute top-1 left-1 w-7 h-7 bg-[#ffd6a5] rounded-sm">
          {/* Eyes */}
          <motion.div 
            className="absolute top-2 left-1 w-1.5 h-1.5 bg-[#2d3436] rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.div 
            className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-[#2d3436] rounded-full"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          />
          {/* Glasses */}
          <div className="absolute top-1.5 left-0.5 w-2.5 h-2 border border-[#2d3436] rounded-sm bg-[#74b9ff]/20" />
          <div className="absolute top-1.5 right-1 w-2.5 h-2 border border-[#2d3436] rounded-sm bg-[#74b9ff]/20" />
          <div className="absolute top-2 left-[11px] w-1 h-0.5 bg-[#2d3436]" />
          {/* Mouth */}
          <div className="absolute bottom-1.5 left-2.5 w-2 h-0.5 bg-[#e17055] rounded" />
        </div>
        
        {/* Body (hoodie) */}
        <div className="absolute top-8 left-0 w-9 h-8 bg-[#0984e3] rounded-t">
          {/* Hoodie strings */}
          <div className="absolute top-1 left-2 w-0.5 h-2 bg-white rounded" />
          <div className="absolute top-1 right-2 w-0.5 h-2 bg-white rounded" />
          {/* Pocket */}
          <div className="absolute bottom-1 left-2 right-2 h-2 border-t border-[#0870c4]" />
        </div>
        
        {/* Arms on desk */}
        <div className="absolute top-10 -left-1 w-2 h-6 bg-[#0984e3] rounded" />
        <div className="absolute top-10 right-0 w-2 h-6 bg-[#0984e3] rounded" />
        
        {/* Hands */}
        <div className="absolute top-14 -left-0.5 w-2 h-1.5 bg-[#ffd6a5] rounded" />
        <div className="absolute top-14 right-0.5 w-2 h-1.5 bg-[#ffd6a5] rounded" />
      </div>
    </motion.div>
  )
}
