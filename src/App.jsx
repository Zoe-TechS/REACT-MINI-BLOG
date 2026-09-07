import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./App.css";
// import { Search } from "lucide-react";
import PostGrid from "./components/PostGrid";
import LoadingState from "./components/LoadingState";
// import { Filter, RotateCcw } from "lucide-react";

const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL; // Use the environment variable for the API URL
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedUserId, setSelectedUserId] = useState("all");

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(POSTS_API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
      console.log("Fetched posts:", data); // Log the fetched posts for debugging
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <a className="skip-link" href="#posts">
        Skip to posts
      </a>
      <main className="app-container ">
        <Header displayedCount={20} totalCount={100} lastUpdated="2023-10-01" />

        {/* SEARCH CARD */}

        <section className="controls-panel" aria-label="Post controls">
          <div className="controls-heading">
            <div>
              <p className="eyebrow">Explore the collection</p>
              <h2>Find something worth reading</h2>
            </div>
            {/* {hasActiveFilters && (
              <button
              className="clear-button"
              type="button"
              onClick={clearFilters}
              >
                <RotateCcw size={15} aria-hidden="true"/>
                Reset filters
              </button>
            )} */}
          </div>

          <div className="controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          {error ? (
            <div className="error-message" role="alert">
              {error}
            </div>
          ) : (
            <section id="posts" aria-label="posts-heading">
              {loading ? <LoadingState /> : <PostGrid posts={posts} />}
            </section>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
