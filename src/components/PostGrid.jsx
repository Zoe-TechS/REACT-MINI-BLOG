import PostCard from "./PostCard";

function PostGrid({ posts, viewSinglePost }) {
  return (
    <div className="post-grid">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} viewSinglePost={viewSinglePost} />
      ))}
    </div>
  );
}

export default PostGrid;
