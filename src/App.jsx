import './index.css'
import { Desktop } from './components/Desktop'
import { Taskbar } from './components/Taskbar'
import { MailApp } from './components/MailApp'
import { IDEWindow } from './components/IDEWindow'
import { BankApp } from './components/BankApp'
import { MusicApp } from './components/MusicApp'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Desktop Background */}
      <Desktop />
      
      {/* Windows */}
      <AnimatePresence>
        <MailApp />
        <IDEWindow />
        <BankApp />
        <MusicApp />
      </AnimatePresence>
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  )
}

export default App
