import { Card } from '../../components/ui/Card/Card';
import { ProfileHeader } from '../../components/dashboard/ProfileHeader/ProfileHeader';

/**
 * Summary page: Displays player profile and overall statistics
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 */
export function Summary({ data }) {
  if (!data) {
    return (
      <div className="dashboard-page-content">
        <Card>No data loaded. Please upload a save file.</Card>
      </div>
    );
  }

  return (
    <div className="dashboard-page-content">
      <section className="dashboard-section">
        <ProfileHeader data={data} />
      </section>
    </div>
  );
}
