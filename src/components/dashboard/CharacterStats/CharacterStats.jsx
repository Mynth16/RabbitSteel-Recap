import { Card } from '../../ui/Card/Card';
import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import './CharacterStats.css';

/**
 * Displays character-specific stats and progression
 * @param {object} props
 * @param {object} props.data - Shaped save data from useSaveData
 */
export function CharacterStats({ data }) {
  if (!data || !data.rabbits) return null;

  const charList = Object.values(data.rabbits);

  if (charList.length === 0) {
    return <Card title="Characters">No character data found.</Card>;
  }

  const DIFFICULTIES = ['Cute', 'Normal', 'Hard', 'Lunar'];
  const DIFFICULTY_ICONS = {
    Cute: '○',
    Normal: '□',
    Hard: '◇',
    Lunar: '🌙'
  };

  return (
    <Card title={`Characters (${charList.length})`} className="character-stats">
      <div className="characters-list">
        {charList.map((char) => {
          const winrate =
            char.TotalWins > 0
              ? ((char.TotalWins / (char.OfflineWins + char.OnlineWins || 1)) * 100).toFixed(1)
              : 0;

          return (
            <div key={char.id} className="character-card">
              <div className="character-header">
                <div className="character-left-section">
                  <h3 className="character-name" style={{ color: char.color }}>
                    {char.name}
                  </h3>
                  <div className="character-stats">
                    <div className="stat-row">
                      <span>Total Wins:</span>
                      <strong>{char.TotalWins}</strong>
                    </div>
                    <div className="stat-row">
                      <span>Offline:</span>
                      <strong>{char.OfflineWins}</strong>
                    </div>
                    <div className="stat-row">
                      <span>Online:</span>
                      <strong>{char.OnlineWins}</strong>
                    </div>
                  </div>
                </div>

                <div className="character-sprite-section">
                  {/* Character icon/sprite */}
                  <img
                    src={`/src/assets/icons/icon-r${char.id}.png`}
                    alt={char.name}
                    className="character-icon"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Difficulty icons row */}
              <div className="character-difficulties">
                {DIFFICULTIES.map((diff) => {
                  const key = `Offline${diff}Count`;
                  const count = char[key] || 0;
                  return (
                    <div key={diff} className="difficulty-icon">
                      <span>{DIFFICULTY_ICONS[diff]}</span>
                      <span className="difficulty-icon-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}