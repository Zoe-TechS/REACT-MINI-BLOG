export default function LoadingState() {
  return (
    <div className="post-grid" aria-label="Loading posts" aria-busy="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div className="post-card skeleton-card" key={index} aria-hidden="true">
          <div className="skeleton skeleton-short" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-medium" />
        </div>
      ))}
      <span className="sr-only">Loading posts, please wait.</span>
    </div>
  );
}
