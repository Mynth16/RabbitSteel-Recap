import { useState } from 'react'
import { Home } from './pages/Home/Home'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { WizardShowcase } from './pages/WizardShowcase/WizardShowcase'
import './App.css'

function App() {
  const [saveData, setSaveData] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')

  const handleDataLoaded = (data) => {
    setSaveData(data)
    setCurrentPage('dashboard')
  }

  const handleReset = () => {
    setSaveData(null)
    setCurrentPage('home')
  }

  const handleViewWizard = () => {
    setCurrentPage('wizard')
  }

  const handleBackFromWizard = () => {
    setCurrentPage('dashboard')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">RabbitSteel Recap</h1>
      </header>

      <main className="app-main">
        {currentPage === 'wizard' && saveData ? (
          <WizardShowcase data={saveData} onReset={handleBackFromWizard} />
        ) : currentPage === 'dashboard' && saveData ? (
          <Dashboard data={saveData} onReset={handleReset} onViewWizard={handleViewWizard} />
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
