import Link from "next/link";

export default async function BlogPost({ params }) {
  // 1. We get the ID from the URL (e.g., "1")
  const { id } = params;

  // 2. Fetch the specific post data
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return (
    <div className="p-10 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        ← Back to Home
      </Link>
      
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <p className="text-xl leading-relaxed text-gray-700">{post.body}</p>
    </div>
  );
}