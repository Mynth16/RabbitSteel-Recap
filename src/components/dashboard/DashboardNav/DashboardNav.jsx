/**
 * Navigation tabs for switching between dashboard pages
 * @param {object} props
 * @param {string} props.activePage - Currently active page ('Summary', 'Rabbits', 'Areas', 'Items')
 * @param {function} props.onPageChange - Callback when a tab is clicked
 */
export function DashboardNav({ activePage, onPageChange }) {
  const pages = ['Summary', 'Rabbits', 'Areas', 'Items'];

  return (
    <nav className="dashboard-nav">
      <div className="dashboard-nav-tabs">
        {pages.map((page) => (
          <button
            key={page}
            className={`dashboard-nav-tab ${activePage === page ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
}
