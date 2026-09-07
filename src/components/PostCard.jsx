import { ArrowUpRight, UserRound } from "lucide-react";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-card-topline">
        <span className="post-number">
          Post {String(post.id).padStart(2, "0")}
        </span>
        <span className="author-pill">
          <UserRound size={13} aria-hidden="true" />
          Author {post.userId}
        </span>
      </div>

      <div className="post-card-content">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>

      <button
        className="details-button"
        type="button"
        // onClick={() => onViewPost(post)}
        aria-label={`View details for ${post.title}`}
      >
        Read post
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
}

export default PostCard;
