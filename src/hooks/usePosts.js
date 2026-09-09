import { useState, useEffect, useCallback, useRef } from "react";
import getPosts from "../services/postsApi";
export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeRequest = useRef(null); // Ref to hold the active fetch request

  //Anytime I fetch posts, cancel any previous unfinished request first, then start a fresh request.
  //if the componenent leaves the screen before the request finishes, cancel it too, so react will not try to update state on a dead compononent. This is a common pattern to avoid memory leaks and unnecessary state updates in React.

  const fetchPosts = useCallback(async () => {
    activeRequest.current?.abort();

    const controller = new AbortController();
    activeRequest.current = controller; // Store the current controller in the ref

    //set loading and clear old error before starting the fetch.
    setLoading(true);
    setError("");

    try {
      const data = await getPosts(controller.signal);
      setPosts(data);
    } catch (requestError) {
      if (requestError.name !== "AbortError") {
        setError(
          requestError.message || "Something went wrong. Please try again",
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, fetchPosts };
}
