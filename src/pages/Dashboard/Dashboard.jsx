import { useState } from 'react';
import { Card } from '../../components/ui/Card/Card';
import { DashboardNav } from '../../components/dashboard/DashboardNav/DashboardNav';
import { Summary } from './Summary';
import { Rabbits } from './Rabbits';
import { Areas } from './Areas';
import { Items } from './Items';
import '../../components/dashboard/DashboardNav/DashboardNav.css';
import './Dashboard.css';

/**
 * Dashboard page: Main container for dashboard pages with navigation
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 * @param {function} props.onReset - Callback to return to Home page
 * @param {function} props.onViewWizard - Callback to view wizard showcase
 */
export function Dashboard({ data, onReset, onViewWizard }) {
  const [activePage, setActivePage] = useState('Summary');

  if (!data) {
    return (
      <div className="dashboard-page">
        <Card>No data loaded. Please upload a save file.</Card>
      </div>
    );
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'Summary':
        return <Summary data={data} />;
      case 'Rabbits':
        return <Rabbits data={data} />;
      case 'Areas':
        return <Areas data={data} />;
      case 'Items':
        return <Items data={data} />;
      default:
        return <Summary data={data} />;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Save Data Dashboard</h1>
        <div className="header-buttons">
          <button className="wizard-button" onClick={onViewWizard}>
            👁️ View Wizard
          </button>
          <button className="reset-button" onClick={onReset}>
            Upload New File
          </button>
        </div>
      </div>

      <DashboardNav activePage={activePage} onPageChange={setActivePage} />

      <div className="dashboard-content">{renderActivePage()}</div>
    </div>
  );
}