import { Card } from '../../components/ui/Card/Card';
import { CharacterStats } from '../../components/dashboard/CharacterStats/CharacterStats';

/**
 * Rabbits page: Displays character-specific statistics
 * @param {object} props
 * @param {object} props.data - Parsed save data from useSaveData
 */
export function Rabbits({ data }) {
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
        <CharacterStats data={data} />
      </section>
    </div>
  );
}
