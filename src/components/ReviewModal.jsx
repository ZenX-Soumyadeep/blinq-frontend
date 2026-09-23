import { useState, useEffect } from 'react';
import { X, Star, Trash2 } from 'lucide-react';

function ReviewModal({ movie, onClose, currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/reviews/movie/${movie.id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [movie.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tmdbMovieId: movie.id,
          username: currentUser.username,
          rating: rating,
          reviewText: reviewText
        })
      });

      if (response.ok) {
        setReviewText('');
        setRating(5);
        fetchReviews(); // Refresh the list instantly
      }
    } catch (err) {
      console.error("Failed to submit review", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (reviewId) => {
    // Basic confirmation so you don't accidentally click it
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchReviews(); // Refresh the list to show it's gone
      } else {
        console.error("Failed to delete review.");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 sm:p-8 backdrop-blur-sm">
      <div className="bg-[#121212] border border-white/10 w-full max-w-5xl max-h-[90vh] rounded-2xl flex flex-col md:flex-row overflow-hidden relative animate-fade-in">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:text-[#ff3b3b] transition-colors">
          <X size={24} />
        </button>

        {/* Left Side: TMDB Movie Details */}
        <div className="md:w-2/5 relative">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="w-full h-64 md:h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent p-8 flex flex-col justify-end md:justify-center">
            <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
            <p className="text-sm text-[#ff3b3b] font-semibold mb-4">Release: {movie.release_date}</p>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-6">{movie.overview}</p>
          </div>
        </div>

        {/* Right Side: Spring Boot Reviews */}
        <div className="md:w-3/5 p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Community Reviews</h3>

          {/* Review Form */}
          {currentUser ? (
            <form onSubmit={handleSubmit} className="mb-8 bg-[#1a1a1a] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-400">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={20} 
                      onClick={() => setRating(star)}
                      className={`cursor-pointer transition-colors ${rating >= star ? 'fill-[#ff3b3b] text-[#ff3b3b]' : 'text-gray-600 hover:text-gray-400'}`}
                    />
                  ))}
                </div>
              </div>
              <textarea 
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                required
                className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff3b3b] resize-none h-24 mb-3"
              />
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[#ff3b3b] hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Logging...' : 'Log Review'}
              </button>
            </form>
          ) : (
            <div className="mb-8 bg-white/5 p-4 rounded-xl text-center border border-white/10">
              <p className="text-gray-400 text-sm">You must be logged in to log a review.</p>
            </div>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to log this film!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-200">{review.username}</span>
                      {currentUser?.role === 'ROLE_ADMIN' && (
                        <button 
                          onClick={() => handleDelete(review.id)}
                          className="text-gray-600 hover:text-red-500 transition-colors"
                          title="Delete as Admin"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'fill-[#ff3b3b] text-[#ff3b3b]' : 'text-gray-700'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{review.reviewText}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ReviewModal;