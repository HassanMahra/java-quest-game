import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Inbox, Star, Trash2, Clock } from 'lucide-react'
import { Window } from './Window'
import { useGameStore } from '../stores/gameStore'
import { tasks, getTaskById } from '../data/tasks'

export function MailApp() {
  const { completedTasks, unreadMails, setCurrentTask, openWindow, markMailAsRead } = useGameStore()
  const [selectedMail, setSelectedMail] = useState(null)
  
  const availableTasks = tasks.filter(t => !completedTasks.includes(t.id))
  
  const handleAcceptTask = (task) => {
    setCurrentTask(task)
    markMailAsRead(task.id)
    openWindow('ide')
  }
  
  return (
    <Window id="mail" title="Mail - Posteingang" icon={Mail} width={900} height={600}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-dark-bg border-r border-dark-border p-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-vscode-blue/20 rounded-lg text-vscode-blue">
            <Inbox size={18} />
            <span className="font-medium">Posteingang</span>
            {unreadMails.length > 0 && (
              <span className="ml-auto bg-vscode-blue text-white text-xs px-2 py-0.5 rounded-full">
                {unreadMails.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-dark-border rounded-lg cursor-pointer mt-1">
            <Star size={18} />
            <span>Wichtig</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-dark-border rounded-lg cursor-pointer">
            <Trash2 size={18} />
            <span>Papierkorb</span>
          </div>
        </div>
        
        {/* Mail List */}
        <div className="w-72 border-r border-dark-border overflow-y-auto">
          {availableTasks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Mail size={48} className="mx-auto mb-2 opacity-50" />
              <p>Keine neuen Mails!</p>
              <p className="text-sm mt-1">Du hast alle Aufgaben erledigt. 🎉</p>
            </div>
          ) : (
            availableTasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                onClick={() => setSelectedMail(task)}
                className={`
                  p-3 border-b border-dark-border cursor-pointer
                  ${selectedMail?.id === task.id ? 'bg-vscode-blue/10 border-l-2 border-l-vscode-blue' : ''}
                  ${unreadMails.includes(task.id) ? 'bg-dark-bg' : ''}
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  {unreadMails.includes(task.id) && (
                    <span className="w-2 h-2 bg-vscode-blue rounded-full" />
                  )}
                  <span className="font-medium text-gray-200">{task.from}</span>
                  <span className={`
                    ml-auto text-xs px-2 py-0.5 rounded
                    ${task.difficulty === 'Einfach' ? 'bg-green-500/20 text-green-400' : ''}
                    ${task.difficulty === 'Mittel' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${task.difficulty === 'Schwer' ? 'bg-red-500/20 text-red-400' : ''}
                  `}>
                    {task.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-300 font-medium truncate">{task.subject}</p>
                <p className="text-xs text-gray-500 truncate mt-1">{task.body.substring(0, 50)}...</p>
              </motion.div>
            ))
          )}
        </div>
        
        {/* Mail Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedMail ? (
              <motion.div
                key={selectedMail.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white mb-2">{selectedMail.subject}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>Von: <strong className="text-gray-300">{selectedMail.from}</strong></span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      Heute
                    </span>
                  </div>
                </div>
                
                <div className="bg-dark-bg rounded-lg p-4 mb-4 whitespace-pre-line text-gray-300 leading-relaxed">
                  {selectedMail.body}
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-dark-bg rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Belohnung:</p>
                    <p className="text-lg font-bold text-success-green">{selectedMail.reward} € + {selectedMail.xp} XP</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAcceptTask(selectedMail)}
                    className="px-6 py-3 bg-vscode-blue hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
                  >
                    📋 Ticket annehmen
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-gray-500"
              >
                <div className="text-center">
                  <Mail size={64} className="mx-auto mb-4 opacity-30" />
                  <p>Wähle eine Mail aus, um sie zu lesen</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Window>
  )
}
