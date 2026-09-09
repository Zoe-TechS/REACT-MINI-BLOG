import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import "./App.css";
// import { Search } from "lucide-react";
import PostGrid from "./components/PostGrid";
import StatusMessage from "./components/StatusMessage";
import usePosts from "./hooks/usePosts";
// import { Filter, RotateCcw } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { posts, loading, error, fetchPosts } = usePosts();

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
          </div>

          <div className="controls">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>

          <section id="posts" aria-label="posts-heading">
            <StatusMessage
              loading={loading}
              error={error}
              reloadPosts={fetchPosts}
            />

            {!error && <PostGrid posts={posts} />}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
