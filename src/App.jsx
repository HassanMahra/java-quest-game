import './index.css'
import { PixelArtScene } from './components/PixelArtScene'
import { Taskbar } from './components/Taskbar'
import { MailApp } from './components/MailApp'
import { IDEWindow } from './components/IDEWindow'
import { BankApp } from './components/BankApp'
import { MusicApp } from './components/MusicApp'
import { AnimatePresence } from 'framer-motion'

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#0f0e17]">
      {/* Pixel Art Office Scene with Monitor */}
      <PixelArtScene>
        {/* These windows appear INSIDE the pixel PC monitor */}
        <div className="relative w-full h-full">
          {/* Mini Desktop inside monitor */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Subtle grid */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(rgba(0, 122, 204, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 122, 204, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
            }} />
          </div>
          
          {/* App Windows */}
          <AnimatePresence>
            <MailApp />
            <IDEWindow />
            <BankApp />
            <MusicApp />
          </AnimatePresence>
        </div>
      </PixelArtScene>
      
      {/* Taskbar at BOTTOM of real screen (outside the pixel world) */}
      <Taskbar />
    </div>
  )
}

export default App
