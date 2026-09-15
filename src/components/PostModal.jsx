import {
  AlertCircle,
  MessageCircleMore,
  RefreshCw,
  UserRound,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL;

function PostModal({ onClose, post }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentsError, setCommentsError] = useState([]);
  const commentRequestRef = useRef(null);

  const fetchComments = useCallback(async () => {
    commentRequestRef.current?.abort();

    const controller = new AbortController();
    commentRequestRef.current = controller;

    setLoadingComments(true);
    setCommentsError("");

    try {
      const response = await fetch(`${POSTS_API_URL}/${post.id}/comments`, {
        signal: controller.signal, // pass signal to the fetch call.
        headers: {
          Accept: "application/json", //use acccept because we are fetching.
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setComments(data);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setCommentsError(
          requestError.message || "Something went wrong. Please try again",
        );
      }
    } finally {
      if (commentRequestRef.current === controller) {
        commentRequestRef.current = null;
      }
      setLoadingComments(false);
    }
  }, [post.id]);

  useEffect(() => {
    fetchComments();
    return () => {
      const controller = commentRequestRef.current;
      controller?.abort();
      if (commentRequestRef.current === controller) {
        commentRequestRef.current = null;
      }
    };
  }, [fetchComments]);

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="post-modal">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="modal-article">
          <div className="modal-meta">
            <span>Post {String(post.id).padStart(2, "0")}</span>
            <span>
              <UserRound size={14} aria-hidden="true" />
              Author {post.userId}
            </span>
          </div>
          <h2 id="modal-title">{post.title}</h2>
          <p>{post.body}</p>
        </div>
        <div className="comments-section">
          <div className="comments-heading">
            <div>
              <p className="eyebrow">Community notes</p>
              <h3>
                <MessageCircleMore size={20} aria-hidden="true" />
                Comments
              </h3>
            </div>
            {!loadingComments && !commentsError && (
              <span className="comment-count">{comments.length}</span>
            )}
          </div>
          {loadingComments && (
            <div className="comments-loading" aria-live="polite">
              <RefreshCw className="spin" size={18} aria-hidden="true" />
              Loading the conversation...
            </div>
          )}
          {commentsError && (
            <div className="comment-error" role="alert">
              <AlertCircle size={18} aria-hidden="true" />
              <span>{commentsError}</span>
              <button type="button" onClick={fetchComments}>
                Retry
              </button>
            </div>
          )}

          {!loadingComments && !commentsError && comments.length === 0 && (
            <p className="comments-empty">No comments yet. A quiet room!</p>
          )}

          <div className="comment-list">
            {comments.map((comment) => (
              <article className="comment" key={comment.id}>
                <div className="comment-avatar" aria-hidden="true">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="comment-byline">
                    <h4>{comment.name}</h4>
                    <a href={`mailto:${comments.email}`}>{comment.email}</a>
                  </div>
                  <p>{comment.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostModal;
