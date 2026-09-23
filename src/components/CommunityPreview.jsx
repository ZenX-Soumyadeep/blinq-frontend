import { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, Plus, X } from 'lucide-react';

function CommunityPreview() {
  const [discussions, setDiscussions] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPost, setNewPost] = useState({ username: '', title: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/posts');
      if (!response.ok) throw new Error('Network response was terrible.');
      const data = await response.json();
      
      // Sort so newest posts appear at the top
      const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDiscussions(sortedData);
    } catch (err) {
      console.error('Failed to fetch backend data:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // If you delete this, the page will reload and break everything.
    
    if (!newPost.username.trim() || !newPost.title.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        setNewPost({ username: '', title: '' }); // Clear the form
        setIsFormOpen(false); // Close the form
        fetchPosts(); // Instantly refresh the UI with the new data
      } else {
        console.error("Backend rejected the post.");
      }
    } catch (err) {
      console.error("Failed to submit post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-8 py-12 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white tracking-wide">From the Community</h2>
        
        {/* Toggle Form Button */}
        <button 
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 bg-white/10 hover:bg-[#ff3b3b] text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold"
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          {isFormOpen ? 'Cancel' : 'New Post'}
        </button>
      </div>

      {/* The Create Post Form */}
      {isFormOpen && (
        <div className="bg-[#1a1a1a] border border-[#ff3b3b]/30 p-6 rounded-xl mb-8 animate-fade-in">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input 
                type="text" 
                value={newPost.username}
                onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff3b3b] transition-colors"
                placeholder="e.g. CineVibes"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Discussion Title</label>
              <textarea 
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ff3b3b] transition-colors resize-none h-24"
                placeholder="What's on your mind?"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#ff3b3b] hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Posting...' : 'Submit Post'}
            </button>
          </form>
        </div>
      )}

      {/* The Post Grid */}
      {discussions.length === 0 ? (
        <p className="text-gray-500">No community posts found. Be the first to start a discussion.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {discussions.map((post) => (
            <div key={post.id} className="bg-[#121212] border border-white/5 p-6 rounded-xl hover:border-white/20 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-sm font-bold text-gray-300 uppercase">
                  {post.username.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-200">{post.username}</p>
                  <p className="text-xs text-gray-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just now'}
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-6 group-hover:text-[#ff3b3b] transition-colors break-words">
                {post.title}
              </h3>
              
              <div className="flex gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2 hover:text-white transition-colors">
                  <ThumbsUp size={16} />
                  <span>{post.upvotes}</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white transition-colors">
                  <MessageSquare size={16} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CommunityPreview;