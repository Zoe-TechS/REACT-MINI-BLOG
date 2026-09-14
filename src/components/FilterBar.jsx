import { Users } from "lucide-react";
export default function FilterBar({ userIds, selectedUserId, onUserChange }) {
  return (
    <div className="filter-actions">
      <div className="select-field">
        <Users className="field-Icon" size={19} />
        <label htmlFor="user-filter" className="sr-only">
          Filter posts by users
        </label>
        <select
          name="user-filter"
          className="user-filter"
          id="user-filter"
          value={selectedUserId}
          onChange={(event) => onUserChange(event.target.value)}
        >
          <option value="all">All Authors</option>
          {userIds.map((userId) => (
            <option key={userId} value={userId}>
              Author {userId}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
