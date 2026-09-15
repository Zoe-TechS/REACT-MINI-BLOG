const POSTS_API_URL = import.meta.env.VITE_POSTS_API_URL; // Use the environment variable for the API URL

export default async function getPostsComment(signal, postId) {
  const response = await fetch(`${POSTS_API_URL}/${postId}/comments`, {
    signal: signal, //pass signal to the fetch call.
    headers: {
      Accept: "application/json", //use acccept because we are fetching.
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await response.json();
  return data;
}
