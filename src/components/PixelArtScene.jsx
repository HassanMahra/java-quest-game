// Pixel Art Scene - CSS-only pixel art office environment
import { motion } from 'framer-motion'

export function PixelArtScene({ children }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      {/* Office Background */}
      <div className="absolute inset-0 bg-[#1a1a2e]">
        {/* Wall */}
        <div className="absolute inset-x-0 top-0 h-[60%] bg-[#16213e]">
          {/* Wall texture lines */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-full h-1 bg-[#1a1a2e]/30"
              style={{ top: `${12 + i * 12}%` }}
            />
          ))}
        </div>
        
        {/* Window */}
        <div className="absolute left-[10%] top-[15%] w-32 h-40">
          {/* Window frame */}
          <div className="absolute inset-0 bg-[#0f3460] border-4 border-[#1a1a2e]">
            {/* Glass */}
            <div className="absolute inset-2 bg-gradient-to-b from-[#1e5f74] to-[#133b5c]">
              {/* Stars */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{ 
                    left: `${20 + Math.random() * 60}%`, 
                    top: `${10 + Math.random() * 60}%` 
                  }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                />
              ))}
              {/* Moon */}
              <div className="absolute right-3 top-3 w-6 h-6 bg-[#f1f1f1] rounded-full shadow-lg" />
            </div>
            {/* Window cross */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-1 bg-[#1a1a2e]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-full bg-[#1a1a2e]" />
            </div>
          </div>
        </div>
        
        {/* Poster on wall */}
        <div className="absolute right-[15%] top-[20%] w-20 h-28 bg-[#e94560] border-2 border-[#1a1a2e]">
          <div className="absolute inset-2 flex flex-col items-center justify-center">
            <div className="text-[8px] font-bold text-white text-center">KEEP</div>
            <div className="text-[8px] font-bold text-white text-center">CALM</div>
            <div className="text-[6px] text-white/80 text-center mt-1">& CODE</div>
          </div>
        </div>
        
        {/* Floor */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[#0f0e17]">
          {/* Floor boards */}
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-full h-2 bg-[#1a1a2e]/50"
              style={{ top: `${i * 16}%` }}
            />
          ))}
        </div>
      </div>
      
      {/* Desk */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[70%] h-32">
        {/* Desk top */}
        <div className="absolute top-0 inset-x-0 h-6 bg-[#3d2914]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#5c4033]" />
        </div>
        {/* Desk front */}
        <div className="absolute top-6 inset-x-0 h-8 bg-[#2d1f10]" />
        {/* Desk legs */}
        <div className="absolute top-14 left-4 w-6 h-16 bg-[#2d1f10]" />
        <div className="absolute top-14 right-4 w-6 h-16 bg-[#2d1f10]" />
        
        {/* Items on desk */}
        {/* Coffee mug */}
        <div className="absolute -top-6 right-[15%] w-6 h-6">
          <div className="absolute bottom-0 w-full h-5 bg-[#e94560] rounded-b" />
          <div className="absolute right-0 top-1 w-2 h-3 border-2 border-[#e94560] rounded-r" />
          <div className="absolute top-0 left-1 w-4 h-1 bg-[#8b5a2b]" /> {/* Coffee */}
        </div>
        
        {/* Stack of papers */}
        <div className="absolute -top-4 left-[10%] w-10 h-2 bg-white/90 transform rotate-2" />
        <div className="absolute -top-5 left-[10%] w-10 h-2 bg-white/80 transform -rotate-1" />
        
        {/* Plant */}
        <div className="absolute -top-10 left-[25%]">
          <div className="w-4 h-6 bg-[#2d6a4f]" /> {/* Pot */}
          <div className="absolute -top-4 left-0 w-1 h-4 bg-[#40916c]" />
          <div className="absolute -top-5 -left-1 w-3 h-3 bg-[#52b788] rounded-full" />
          <div className="absolute -top-6 left-1 w-3 h-3 bg-[#40916c] rounded-full" />
        </div>
      </div>
      
      {/* Monitor/PC on desk */}
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[50%] max-w-[700px]">
        {/* Monitor bezel */}
        <div className="relative bg-[#2d3436] p-3 rounded-t-lg border-4 border-[#1a1a2e]">
          {/* Screen - THIS IS WHERE THE APP GOES */}
          <div className="relative bg-[#1e1e1e] rounded overflow-hidden" style={{ aspectRatio: '16/10' }}>
            {/* Power LED */}
            <motion.div 
              className="absolute bottom-2 right-2 w-2 h-2 bg-[#00ff00] rounded-full z-50"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* App content goes here */}
            <div className="absolute inset-0 overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        {/* Monitor stand */}
        <div className="mx-auto w-20 h-6 bg-[#2d3436] border-x-4 border-[#1a1a2e]" />
        <div className="mx-auto w-32 h-3 bg-[#2d3436] rounded-b border-4 border-t-0 border-[#1a1a2e]" />
      </div>
      
      {/* Keyboard */}
      <div className="absolute bottom-[22%] left-1/2 -translate-x-1/2 w-40 h-6 bg-[#2d3436] rounded border-2 border-[#1a1a2e]">
        {/* Keys */}
        <div className="absolute inset-1 grid grid-cols-12 gap-0.5">
          {[...Array(36)].map((_, i) => (
            <motion.div 
              key={i} 
              className="bg-[#636e72] rounded-sm"
              whileHover={{ backgroundColor: '#74b9ff' }}
            />
          ))}
        </div>
      </div>
      
      {/* Mouse */}
      <div className="absolute bottom-[22%] left-[62%] w-5 h-8 bg-[#2d3436] rounded-full border-2 border-[#1a1a2e]">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-[#636e72] rounded" />
      </div>
      
      {/* Character */}
      <PixelCharacter />
      
      {/* Chair */}
      <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2">
        {/* Seat */}
        <div className="w-24 h-4 bg-[#2d3436] rounded-t" />
        {/* Back */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-20 h-16 bg-[#2d3436] rounded-t" />
        {/* Pole */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#636e72]" />
        {/* Base */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-2 bg-[#636e72] rounded" />
        {/* Wheels */}
        <div className="absolute top-14 left-2 w-3 h-3 bg-[#2d3436] rounded-full" />
        <div className="absolute top-14 right-2 w-3 h-3 bg-[#2d3436] rounded-full" />
      </div>
    </div>
  )
}

function PixelCharacter() {
  return (
    <motion.div 
      className="absolute bottom-[28%] left-[38%] z-10"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Character sitting at desk - pixel art style */}
      <div className="relative" style={{ transform: 'scale(1.5)' }}>
        {/* Hair */}
        <div className="absolute -top-1 left-1 w-10 h-4 bg-[#3d2914] rounded-t" />
        
        {/* Head */}
        <div className="absolute top-2 left-2 w-8 h-8 bg-[#ffd6a5] rounded">
          {/* Eyes */}
          <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-[#2d3436] rounded-full" />
          <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-[#2d3436] rounded-full" />
          {/* Mouth */}
          <div className="absolute bottom-2 left-3 w-2 h-0.5 bg-[#e17055]" />
          {/* Glasses */}
          <div className="absolute top-2.5 left-0.5 w-3 h-2 border border-[#2d3436] rounded-sm" />
          <div className="absolute top-2.5 right-1.5 w-3 h-2 border border-[#2d3436] rounded-sm" />
          <div className="absolute top-3 left-3.5 w-1 h-0.5 bg-[#2d3436]" />
        </div>
        
        {/* Body (hoodie) */}
        <div className="absolute top-10 left-1 w-10 h-10 bg-[#0984e3] rounded-t">
          {/* Hood string */}
          <div className="absolute top-1 left-3 w-0.5 h-3 bg-white" />
          <div className="absolute top-1 right-3 w-0.5 h-3 bg-white" />
        </div>
        
        {/* Arms */}
        <div className="absolute top-12 -left-2 w-3 h-8 bg-[#0984e3] rounded" />
        <div className="absolute top-12 right-0 w-3 h-8 bg-[#0984e3] rounded" />
        
        {/* Hands on desk */}
        <div className="absolute top-18 -left-1 w-3 h-2 bg-[#ffd6a5] rounded" />
        <div className="absolute top-18 right-1 w-3 h-2 bg-[#ffd6a5] rounded" />
      </div>
    </motion.div>
  )
}
