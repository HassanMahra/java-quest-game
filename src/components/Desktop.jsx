import { Code, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export function Desktop() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 122, 204, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 204, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>
      
      {/* Floating Code Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-vscode-blue/20 font-mono text-sm"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight,
            opacity: 0.1 + Math.random() * 0.2
          }}
          animate={{ 
            y: [null, Math.random() * window.innerHeight],
            opacity: [null, 0.05, 0.2, 0.05]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          {['{ }', '< />', '( )', '[ ]', '&&', '||', '=>', '++', '!=', '==='][i % 10]}
        </motion.div>
      ))}
      
      {/* Center Logo/Welcome */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Code size={48} className="text-vscode-blue" />
            <h1 className="text-4xl font-bold text-white">Junior Dev Simulator</h1>
          </div>
          <p className="text-gray-400 text-lg">Lerne Java, indem du echte Bugs fixst!</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-yellow-400">
            <Star size={16} />
            <span className="text-sm">Öffne die Mail-App um zu starten</span>
            <Star size={16} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
