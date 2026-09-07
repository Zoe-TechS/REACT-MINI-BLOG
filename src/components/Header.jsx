import { BookOpen, Clock3, Layers3 } from "lucide-react";
export default function Header({ displayedCount, totalCount, lastUpdated }) {
  return (
    <header className="hero">
      <div className="hero-glow hero-glow-one" aria-hidden="true" />
      <div className="hero-glow hero-glow-two" aria-hidden="true" />

      <nav className="hero-nav" aria-label="Main navigation">
        <a className="brand" href="/">
          <span className="brand-mark">
            <BookOpen size={19} strokeWidth={2.2} aria-hidden="true" />
          </span>
          <span>Papertrail</span>
        </a>
        <span className="api-status">
          <span className="status-dot" aria-hidden="true" />
          Public API
        </span>
      </nav>

      <div className="hero-content">
        <div className="hero-copy">
          <p className="hero-kicker">Mini Blog Explorer</p>
          <h1>Stories, ideas, and a little digital serendipity</h1>
          <p className="hero-description">
            Browse the collection, search by what sparks your curiosity, and
            filter stories by the author.
          </p>
        </div>
        <div className="hero-stats" aria-label="Post summary">
          <div className="hero-stat">
            <span className="stat-icon">
              <Layers3 size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>{displayedCount}</strong>
              <span> of {totalCount} posts shown</span>
            </div>
          </div>
          <div className="hero-stat">
            <span className="stat-icon">
              <Clock3 size={18} aria-hidden="true" />
            </span>
            <div>
              <strong>Live collection</strong>
              <span>{lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
