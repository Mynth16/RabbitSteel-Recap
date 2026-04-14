import { useState } from 'react'
import { Home } from './pages/Home/Home'
import { Dashboard } from './pages/Dashboard/Dashboard'
import './App.css'

function App() {
  const [saveData, setSaveData] = useState(null)

  const handleDataLoaded = (data) => {
    setSaveData(data)
  }

  const handleReset = () => {
    setSaveData(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">RabbitSteel Recap</h1>
      </header>

      <main className="app-main">
        {saveData ? (
          <Dashboard data={saveData} onReset={handleReset} />
        ) : (
          <Home onDataLoaded={handleDataLoaded} />
        )}
      </main>

      <footer className="app-footer">
        <p>A save data viewer for RabbitSteel</p>
      </footer>
    </div>
  )
}

export default App
