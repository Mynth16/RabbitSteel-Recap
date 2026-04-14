import { Card } from '../components/ui/Card';
import { ProfileHeader } from '../components/dashboard/ProfileHeader';
import { CharacterStats } from '../components/dashboard/CharacterStats';
import { AreaWinrates } from '../components/dashboard/AreaWinrates';

/**
 * Dashboard page: Displays parsed save data with statistics
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 * @param {function} props.onReset - Callback to return to Home page
 */
export function Dashboard({ data, onReset }) {
  if (!data) {
    return (
      <div className="dashboard-page">
        <Card>No data loaded. Please upload a save file.</Card>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Save Data Dashboard</h1>
        <button className="reset-button" onClick={onReset}>
          Upload New File
        </button>
      </div>

      <div className="dashboard-content">
        <section className="dashboard-section">
          <ProfileHeader data={data} />
        </section>

        <section className="dashboard-section">
          <CharacterStats data={data} />
        </section>

        <section className="dashboard-section">
          <AreaWinrates data={data} />
        </section>
      </div>
    </div>
  );
}