import Link from 'next/link';
import { revalidatePath } from 'next/cache';

// 1. We create a Server Action
async function createPost(formData) {
  'use server';

  const title = formData.get('title');
  const body = formData.get('body');

  console.log("Creating post:", title);

  // ... (Database logic would go here)

  // TELL NEXT.JS TO REFRESH THE HOMEPAGE
  revalidatePath('/'); 
}


export default async function Home() {
  // 2. We fetch data directly on the server
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  const posts = await res.json();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>

      {/* NEW: The Form */}
      <form action={createPost} className="mb-10 bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input 
            name="title" 
            type="text" 
            className="w-full border p-2 rounded" 
            placeholder="Enter title..." 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Body</label>
          <textarea 
            name="body" 
            className="w-full border p-2 rounded" 
            placeholder="Enter content..." 
            required 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Post
        </button>
      </form>

      {/* ... your existing <ul> grid ... */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            {/* 3. We use the Link component for instant navigation */}
            <Link 
              href={`/blog/${post.id}`} 
              className="text-blue-500 hover:underline text-xl"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}