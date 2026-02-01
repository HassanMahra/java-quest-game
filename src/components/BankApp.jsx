import { Wallet, TrendingUp, PiggyBank, CreditCard } from 'lucide-react'
import { motion } from 'framer-motion'
import { Window } from './Window'
import { useGameStore } from '../stores/gameStore'

export function BankApp() {
  const { money, reputation, day, completedTasks } = useGameStore()
  
  const transactions = completedTasks.map((taskId, index) => ({
    id: taskId,
    description: `Ticket #${taskId} abgeschlossen`,
    amount: 50 + (index * 25), // Simplified
    date: `Tag ${Math.max(1, day - completedTasks.length + index + 1)}`
  }))
  
  return (
    <Window id="bank" title="TechBank - Dein Konto" icon={Wallet} width={600} height={500}>
      <div className="p-6 bg-gradient-to-br from-dark-bg to-dark-surface h-full">
        {/* Balance Card */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-vscode-blue to-blue-600 rounded-xl p-6 mb-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="text-white/80" />
              <span className="text-white/80 text-sm">TechBank Konto</span>
            </div>
            <span className="text-white/60 text-xs">•••• 4242</span>
          </div>
          <p className="text-white/60 text-sm mb-1">Aktueller Kontostand</p>
          <p className="text-4xl font-bold text-white">{money.toLocaleString('de-DE')} €</p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <TrendingUp size={18} />
              <span className="text-sm">Reputation</span>
            </div>
            <p className="text-2xl font-bold text-vscode-blue">⭐ {reputation} XP</p>
          </div>
          <div className="bg-dark-surface rounded-lg p-4 border border-dark-border">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <PiggyBank size={18} />
              <span className="text-sm">Erledigte Jobs</span>
            </div>
            <p className="text-2xl font-bold text-success-green">{completedTasks.length}</p>
          </div>
        </div>
        
        {/* Transactions */}
        <div>
          <h3 className="text-gray-400 text-sm mb-3">Letzte Transaktionen</h3>
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Wallet size={32} className="mx-auto mb-2 opacity-30" />
              <p>Noch keine Einnahmen</p>
              <p className="text-sm">Schließe Tickets ab, um Geld zu verdienen!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.slice(-5).reverse().map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-dark-bg rounded-lg">
                  <div>
                    <p className="text-gray-300 text-sm">{tx.description}</p>
                    <p className="text-gray-500 text-xs">{tx.date}</p>
                  </div>
                  <span className="text-success-green font-mono font-bold">+{tx.amount} €</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Window>
  )
}
