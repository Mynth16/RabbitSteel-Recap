import { Card } from '../../ui/Card/Card';
import { StatBadge } from '../../ui/StatBadge/StatBadge';
import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import './ProfileHeader.css';

/**
 * Displays player profile summary and overall stats
 * @param {object} props
 * @param {object} props.data - Shaped save data from useSaveData
 */
export function ProfileHeader({ data }) {
  if (!data) return null;

  const { player } = data;

  return (
    <Card title="Player Profile" className="profile-header">
      <div className="profile-content">
        <div className="profile-main">
          <h2 className="player-name">{player.name}</h2>
          <p className="playtime-info">Playtime: {player.playtimeFormatted}</p>
        </div>

        <div className="profile-stats">
          <StatBadge label="Total Runs" value={player.totalRuns} />
          <StatBadge label="Total Wins" value={player.totalWins} />
          <StatBadge label="Shop Visits" value={player.shopVisits} />
        </div>

        <div className="profile-winrate">
          <ProgressBar
            label="Overall Winrate"
            value={parseFloat(player.winrate)}
            color="success"
            showPercent={true}
          />
        </div>
      </div>
    </Card>
  );
}