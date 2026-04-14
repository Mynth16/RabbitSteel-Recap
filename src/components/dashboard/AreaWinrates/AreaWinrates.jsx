import { Card } from '../../ui/Card/Card';
import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import './AreaWinrates.css';

// Area names in order for better display
const AREA_ORDER = [
  'Outskirts',
  'Nest',
  'Arsenal',
  'Lighthouse',
  'Streets',
  'Lakeside',
  'Keep',
  'Pinnacle',
  'Geode',
  'Sanctuary',
  'Depths',
  'Aurum',
  'Darkhall',
  'Reflection',
];

/**
 * Displays area-specific statistics including visits, wins, and winrates
 * @param {object} props
 * @param {object} props.data - Shaped save data from useSaveData
 */
export function AreaWinrates({ data }) {
  if (!data) return null;

  const { areas } = data;

  if (Object.keys(areas).length === 0) {
    return <Card title="Areas">No area data found.</Card>;
  }

  // Sort areas by the predefined order
  const sortedAreas = Object.values(areas).sort(
    (a, b) => AREA_ORDER.indexOf(a.Chaos?.areaName || '') - AREA_ORDER.indexOf(b.Hard?.areaName || '')
  );

  return (
    <Card title="Area Statistics" className="area-winrates">
      <div className="areas-table">
        <div className="table-header">
          <div className="col-area">Area</div>
          <div className="col-difficulty">Difficulty</div>
          <div className="col-visits">Visits</div>
          <div className="col-wins">Wins</div>
          <div className="col-winrate">Winrate</div>
        </div>

        {Object.keys(areas)
          .sort((a, b) => AREA_ORDER.indexOf(a) - AREA_ORDER.indexOf(b))
          .map((areaName) => {
            const areaData = areas[areaName];
            const diffOrder = ['Cute', 'Normal', 'Hard', 'Lunar'];

            return (
              <div key={areaName} className="area-group">
                {diffOrder.map((difficulty) => {
                  const stats = areaData[difficulty];
                  if (!stats || stats.visits === 0) return null;

                  return (
                    <div key={`${areaName}-${difficulty}`} className="area-row">
                      <div className="col-area">{areaName}</div>
                      <div className="col-difficulty">{difficulty}</div>
                      <div className="col-visits">{stats.visits}</div>
                      <div className="col-wins">{stats.wins}</div>
                      <div className="col-winrate">
                        <div className="winrate-display">
                          <span>{stats.winrate}%</span>
                          <ProgressBar
                            value={parseFloat(stats.winrate)}
                            showPercent={false}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </Card>
  );
}