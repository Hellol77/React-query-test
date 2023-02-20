import { useQuery, useMutation } from "@tanstack/react-query";
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, error, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );
  const deleteMutation = useMutation(() => {
    deletePost(post.id);
  });
  const updateMutation = useMutation(() => {
    updatePost(post.id);
  });
  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error{error.toString()}</h3>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button
        onClick={() => {
          deleteMutation.mutate(post.id);
        }}
      >
        Delete
      </button>

      <button
        onClick={() => {
          updateMutation.mutate(post.id);
        }}
      >
        Update title
      </button>
      {deleteMutation.isError && <p>error delete</p>}
      {deleteMutation.isLoading && <p>deleting post..</p>}
      {deleteMutation.isSuccess && <p>success</p>}
      {updateMutation.isError && <p>error update</p>}
      {updateMutation.isLoading && <p>updating post..</p>}
      {updateMutation.isSuccess && <p>success update</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
