import LoadingState from "./LoadingState";
import { AlertTriangle, RefreshCw } from "lucide-react";

function StatusMessage({ loading, error, onRetry }) {
  if (loading) return <LoadingState />;
  if (error) {
    return (
      <div className="status-card status-error" role="alert">
        <span className="status-icon">
          <AlertTriangle size={24} aria-hidden="true" />
        </span>
        <h3>We couldn&apos;t load the posts</h3>
        <p>{error}</p>
        <button className="status-button" type="button" onClick={onRetry}>
          <RefreshCw size={16} aria-hidden="true" />
          Try again
        </button>
      </div>
    );
  }
}

export default StatusMessage;
