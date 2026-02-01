import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Play, FolderTree, FileCode, Terminal, CheckCircle, XCircle, Lightbulb } from 'lucide-react'
import Editor from '@monaco-editor/react'
import confetti from 'canvas-confetti'
import { Window } from './Window'
import { useGameStore } from '../stores/gameStore'
import { soundManager } from '../utils/sounds'

export function IDEWindow() {
  const { currentTask, completeTask, addMoney, addReputation, closeWindow } = useGameStore()
  const [code, setCode] = useState(currentTask?.initialCode || '')
  const [consoleOutput, setConsoleOutput] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const editorRef = useRef(null)
  
  // Update code when task changes
  useEffect(() => {
    if (currentTask) {
      setCode(currentTask.initialCode)
      setConsoleOutput([])
      setShowHint(false)
    }
  }, [currentTask])
  
  const handleEditorMount = (editor) => {
    editorRef.current = editor
  }
  
  const addConsoleMessage = (type, message) => {
    const timestamp = new Date().toLocaleTimeString('de-DE')
    setConsoleOutput(prev => [...prev, { type, message, timestamp }])
  }
  
  const handleDeploy = async () => {
    if (!currentTask) return
    
    soundManager.play('deploy')
    setIsRunning(true)
    setConsoleOutput([])
    
    // Simulate compilation delay
    addConsoleMessage('info', '🔨 Kompiliere Code...')
    await new Promise(r => setTimeout(r, 800))
    
    addConsoleMessage('info', '📦 Führe Tests aus...')
    await new Promise(r => setTimeout(r, 600))
    
    // Check solution
    const isCorrect = currentTask.solutionCheck(code)
    
    if (isCorrect) {
      soundManager.play('success')
      addConsoleMessage('success', currentTask.successMessage)
      addConsoleMessage('success', `💰 +${currentTask.reward} € verdient!`)
      addConsoleMessage('success', `⭐ +${currentTask.xp} XP erhalten!`)
      
      // Celebration!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      // Money sound
      setTimeout(() => soundManager.play('money'), 300)
      setTimeout(() => soundManager.play('levelUp'), 600)
      
      // Add rewards
      addMoney(currentTask.reward)
      addReputation(currentTask.xp)
      
      // Complete task after a moment
      setTimeout(() => {
        completeTask(currentTask.id)
      }, 2000)
      
    } else {
      soundManager.play('error')
      addConsoleMessage('error', currentTask.errorMessage)
      addConsoleMessage('warning', '💡 Versuche es nochmal! Klicke auf die Glühbirne für einen Tipp.')
    }
    
    setIsRunning(false)
  }
  
  if (!currentTask) {
    return (
      <Window id="ide" title="VS Code - Kein Projekt geöffnet" icon={Code} width={1000} height={700}>
        <div className="h-full flex items-center justify-center bg-dark-bg text-gray-500">
          <div className="text-center">
            <Code size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">Kein Ticket ausgewählt</p>
            <p className="text-sm mt-2">Öffne die Mail-App und nimm ein Ticket an!</p>
          </div>
        </div>
      </Window>
    )
  }
  
  return (
    <Window id="ide" title={`VS Code - ${currentTask.fileName}`} icon={Code} width={1100} height={700}>
      <div className="h-full flex flex-col bg-dark-bg">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-2 bg-dark-surface border-b border-dark-border">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Aufgabe: <strong className="text-white">{currentTask.subject}</strong>
            </span>
            <span className={`
              text-xs px-2 py-1 rounded
              ${currentTask.difficulty === 'Einfach' ? 'bg-green-500/20 text-green-400' : ''}
              ${currentTask.difficulty === 'Mittel' ? 'bg-yellow-500/20 text-yellow-400' : ''}
              ${currentTask.difficulty === 'Schwer' ? 'bg-red-500/20 text-red-400' : ''}
            `}>
              {currentTask.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded transition-colors"
            >
              <Lightbulb size={16} />
              Tipp
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDeploy}
              disabled={isRunning}
              className={`
                flex items-center gap-2 px-4 py-1.5 rounded font-medium transition-colors
                ${isRunning 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-success-green hover:bg-green-500 text-black'
                }
              `}
            >
              <Play size={16} />
              {isRunning ? 'Läuft...' : 'Deploy'}
            </motion.button>
          </div>
        </div>
        
        {/* Hint Banner */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-yellow-500/10 border-b border-yellow-500/30 px-4 py-2"
            >
              <p className="text-yellow-400 text-sm">💡 {currentTask.hint}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree */}
          <div className="w-48 bg-dark-surface border-r border-dark-border p-2">
            <div className="flex items-center gap-2 px-2 py-1 text-gray-400 text-sm">
              <FolderTree size={14} />
              <span>EXPLORER</span>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-2 px-2 py-1.5 bg-vscode-blue/20 rounded text-vscode-blue">
                <FileCode size={14} />
                <span className="text-sm">{currentTask.fileName}</span>
              </div>
            </div>
          </div>
          
          {/* Editor + Console */}
          <div className="flex-1 flex flex-col">
            {/* Monaco Editor */}
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="java"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorMount}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  cursorStyle: 'line',
                  automaticLayout: true,
                }}
              />
            </div>
            
            {/* Console */}
            <div className="h-40 bg-black border-t border-dark-border">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-surface border-b border-dark-border">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400">TERMINAL</span>
              </div>
              <div className="p-2 h-[calc(100%-32px)] overflow-y-auto font-mono text-sm">
                {consoleOutput.length === 0 ? (
                  <p className="text-gray-600">$ Klicke auf "Deploy" um den Code zu testen...</p>
                ) : (
                  consoleOutput.map((line, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1">
                      <span className="text-gray-600 text-xs">[{line.timestamp}]</span>
                      <span className={`
                        ${line.type === 'success' ? 'text-success-green' : ''}
                        ${line.type === 'error' ? 'text-red-400' : ''}
                        ${line.type === 'warning' ? 'text-yellow-400' : ''}
                        ${line.type === 'info' ? 'text-gray-400' : ''}
                      `}>
                        {line.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}
