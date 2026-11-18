import ChatWindow from './assets/components/ChatWindow'
import WeatherPage from './assets/components/WeatherPage'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="dashboard-mark" aria-hidden="true">U</span>
          <div>
            <p className="dashboard-eyebrow">PERSONAL AI</p>
            <h1>AI Assistant</h1>
          </div>
        </div>
        <div className="dashboard-summary">
          <span className="status-dot" aria-hidden="true" />
          <span>Chat and live weather</span>
        </div>
      </header>
      <div className="dashboard-grid">
        <ChatWindow />
        <WeatherPage />
      </div>
    </main>
  )
}

export default App
