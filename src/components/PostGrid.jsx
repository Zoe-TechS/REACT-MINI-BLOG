import PostCard from "./PostCard";

function PostGrid({ posts, onViewPost }) {
  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onViewPost={onViewPost} />
      ))}
    </div>
  );
}

export default PostGrid;
