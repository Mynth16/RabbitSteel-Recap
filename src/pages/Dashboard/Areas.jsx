import { Card } from '../../components/ui/Card/Card';
import { AreaWinrates } from '../../components/dashboard/AreaWinrates/AreaWinrates';

/**
 * Areas page: Displays area-specific statistics and winrates
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 */
export function Areas({ data }) {
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
        <AreaWinrates data={data} />
      </section>
    </div>
  );
}
