import { useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./App.css";
// import { RefreshCw, Search } from "lucide-react";
import PostGrid from "./components/PostGrid";
import StatusMessage from "./components/StatusMessage";
import usePosts from "./hooks/usePosts";
import FilterBar from "./components/FilterBar";
import PostModal from "./components/PostModal";
// import { Filter, RotateCcw } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, loading, error, fetchPosts } = usePosts();

  const handleRefresh = () => {
    fetchPosts();
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const search = searchTerm.trim().toLowerCase();

      const title = post.title.toLowerCase();
      const body = post.body.toLowerCase();

      const matchesSearch = title.includes(search) || body.includes(search);

      const matchesUser =
        selectedUserId === "all" || post.userId === Number(selectedUserId);

      return matchesSearch && matchesUser;
    });
  }, [posts, searchTerm, selectedUserId]);

  const userIds = useMemo(
    () =>
      [...new Set(posts.map((post) => post.userId))].sort(
        (first, second) => first - second,
      ),
    [posts],
  );

  return (
    <div className="App">
      <a className="skip-link" href="#posts">
        Skip to posts
      </a>
      <main className="app-container ">
        <Header
          displayedCount={filteredPosts.length}
          totalCount={posts.length}
          lastUpdated="2023-10-01"
        />

        {/* SEARCH CARD */}

        <section className="controls-panel" aria-label="Post controls">
          <div className="controls-heading">
            <div>
              <p className="eyebrow">Explore the collection</p>
              <h2>Find something worth reading</h2>
            </div>
          </div>

          <div className="controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <FilterBar
              userIds={userIds}
              selectedUserId={selectedUserId}
              onUserChange={setSelectedUserId}
            />
            <button
              className="status-button"
              type="button"
              onClick={handleRefresh}
            >
              {loading ? "Refreshing..." : "Refresh Posts"}
            </button>
          </div>

          <section id="posts" aria-label="posts-heading">
            <StatusMessage
              loading={loading}
              error={error}
              reloadPosts={fetchPosts}
            />

            {!error && (
              <PostGrid
                posts={filteredPosts}
                viewSinglePost={setSelectedPost}
              />
            )}
          </section>
        </section>
      </main>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default App;
