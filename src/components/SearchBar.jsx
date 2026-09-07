import { Search, X } from "lucide-react";
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-field">
      <Search className="field-icon" size={19} aria-hidden="true" />

      <label className="sr-only" htmlFor="post-search">
        Search posts by title or body
      </label>
      <input
        id="post-search"
        className="search-input"
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search titles and stories..."
        autoComplete="off"
      />
      {searchTerm && (
        <button
          className="input-clear"
          type="button"
          onClick={() => onSearchChange("")}
          aria-label="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
