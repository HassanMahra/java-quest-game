import { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react'
import { Window } from './Window'

const playlist = [
  { id: 1, title: "Lo-Fi Coding Beats", artist: "ChillHop", duration: "∞" },
  { id: 2, title: "Deep Focus", artist: "Ambient Works", duration: "∞" },
  { id: 3, title: "Synthwave Dreams", artist: "RetroWave", duration: "∞" },
  { id: 4, title: "Café Jazz", artist: "Smooth Vibes", duration: "∞" },
]

export function MusicApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(playlist[0])
  
  return (
    <Window id="music" title="Spotify - Coding Vibes" icon={Music} width={400} height={500}>
      <div className="h-full bg-gradient-to-b from-green-900/20 to-dark-bg p-4">
        {/* Album Art */}
        <motion.div 
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="w-48 h-48 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-dark-bg rounded-full flex items-center justify-center">
            <Music size={32} className="text-green-500" />
          </div>
        </motion.div>
        
        {/* Track Info */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-white">{currentTrack.title}</h2>
          <p className="text-gray-400">{currentTrack.artist}</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1 bg-dark-border rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-green-500"
              animate={{ width: isPlaying ? "100%" : "0%" }}
              transition={{ duration: 30, repeat: Infinity }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0:00</span>
            <span>{currentTrack.duration}</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 bg-green-500 hover:bg-green-400 rounded-full text-black transition-colors"
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
          </motion.button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
        </div>
        
        {/* Volume */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <Volume2 size={18} className="text-gray-400" />
          <div className="w-24 h-1 bg-dark-border rounded-full">
            <div className="w-3/4 h-full bg-gray-400 rounded-full" />
          </div>
        </div>
        
        {/* Playlist */}
        <div className="mt-6">
          <h3 className="text-gray-400 text-sm mb-2">Playlist</h3>
          <div className="space-y-1">
            {playlist.map((track) => (
              <div 
                key={track.id}
                onClick={() => setCurrentTrack(track)}
                className={`
                  flex items-center justify-between p-2 rounded cursor-pointer transition-colors
                  ${currentTrack.id === track.id ? 'bg-green-500/20 text-green-400' : 'hover:bg-dark-border text-gray-300'}
                `}
              >
                <div className="flex items-center gap-2">
                  {currentTrack.id === track.id && isPlaying && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Volume2 size={14} />
                    </motion.div>
                  )}
                  <span className="text-sm">{track.title}</span>
                </div>
                <span className="text-xs text-gray-500">{track.artist}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  )
}
