import { Card } from '../../components/ui/Card/Card';

/**
 * Items page: Placeholder for collection/inventory data
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 */
export function Items({ data }) {
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
        <Card title="Items & Collection">
          <p>This section will display your collection and items data in the future.</p>
        </Card>
      </section>
    </div>
  );
}
