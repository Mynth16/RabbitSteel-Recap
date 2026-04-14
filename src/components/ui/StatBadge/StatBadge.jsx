import './StatBadge.css';

/**
 * Small stat indicator badge component
 * @param {object} props
 * @param {string} props.label - Stat label (e.g., "Runs")
 * @param {string|number} props.value - Stat value (e.g., "2933")
 * @param {string} props.color - Optional color theme
 */
export function StatBadge({ label, value, color = 'default' }) {
  return (
    <div className={`stat-badge stat-${color}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}