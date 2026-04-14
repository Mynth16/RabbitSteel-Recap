import './Card.css';

/**
 * Reusable Card component with dark game-themed styling
 * @param {object} props
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Optional additional CSS classes
 */
export function Card({ title, children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">{children}</div>
    </div>
  );
}