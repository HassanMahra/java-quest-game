# 🎮 Junior Developer Simulator

**Lerne Java, indem du echte Bugs fixst!**

Ein Spiel, das eine Entwickler-Desktop-Umgebung simuliert. Du bist ein neuer Junior-Entwickler bei TechCorp und musst Tickets abarbeiten, um Geld und XP zu verdienen.

## 🚀 Features

- 📧 **Mail-System**: Erhalte Aufgaben per E-Mail
- 💻 **Echter Code-Editor**: Monaco Editor (wie VS Code)
- 🎯 **Java-Aufgaben**: Finde und fixe echte Bugs
- 💰 **Belohnungssystem**: Verdiene Geld und XP
- 🎵 **Musik-Player**: Lo-Fi Beats zum Coden
- 🏦 **Bank-App**: Verfolge deine Einnahmen
- 🎉 **Konfetti**: Feiere deine Erfolge!

## 🖥️ Installation

### Als Desktop-App (Windows/Mac/Linux)

1. Gehe zu [Releases](https://github.com/HassanMahra/java-quest-game/releases)
2. Lade die passende Version herunter:
   - **Windows**: `.exe` Installer oder `.portable.exe`
   - **Mac**: `.dmg` Datei
   - **Linux**: `.AppImage` oder `.deb`
3. Installieren und spielen!

### Selbst bauen

```bash
# Repository klonen
git clone https://github.com/HassanMahra/java-quest-game.git
cd java-quest-game

# Dependencies installieren
npm install

# Entwicklungsmodus (Browser)
npm run dev

# Entwicklungsmodus (Electron Desktop)
npm run electron:dev

# Desktop-App bauen
npm run electron:build:win   # Windows
npm run electron:build:mac   # Mac
npm run electron:build:linux # Linux
```

## 🎮 Gameplay

1. **Öffne die Mail-App** (Klick auf das Mail-Icon in der Taskleiste)
2. **Wähle ein Ticket** aus deinem Posteingang
3. **Klicke "Ticket annehmen"** um die IDE zu öffnen
4. **Fixe den Bug** im Code-Editor
5. **Klicke "Deploy"** um deine Lösung zu testen
6. **Kassiere deine Belohnung!** 💰

## 🛠️ Tech Stack

- **React** + Vite
- **Tailwind CSS** für Styling
- **Framer Motion** für Animationen
- **Monaco Editor** für den Code-Editor
- **Zustand** für State Management
- **Electron** für Desktop-App
- **Web Audio API** für Sound Effects

## 📋 Geplante Features

- [ ] Mehr Level (20+ Java-Aufgaben)
- [ ] Speicherstand (LocalStorage)
- [ ] Achievement-System
- [ ] Schwierigkeitsgrade
- [ ] Multiplayer-Modus
- [ ] Steam-Integration

## 👨‍💻 Entwickelt von

**Hassan Mahra** mit Hilfe von **Kai** 🦞

---

*Viel Spaß beim Coden! 🎮*
