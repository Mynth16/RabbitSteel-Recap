import './ProgressBar.css';

/**
 * Animated progress bar component
 * @param {object} props
 * @param {string} props.label - Display label for the bar
 * @param {number} props.value - Percentage value (0-100)
 * @param {string} props.color - Optional color ("primary", "success", "warning", "danger")
 * @param {boolean} props.showPercent - Show percentage text overlay (default: true)
 */
export function ProgressBar({ label, value = 0, color = 'primary', showPercent = true }) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className="progress-container">
      {label && <div className="progress-label">{label}</div>}
      <div className={`progress-bar progress-${color}`}>
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
        {showPercent && <span className="progress-text">{percentage.toFixed(1)}%</span>}
      </div>
    </div>
  );
}