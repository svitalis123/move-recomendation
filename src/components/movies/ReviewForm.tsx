'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Star } from 'lucide-react';
import { useStore } from '@/store';

interface ReviewFormProps {
  movieId: number;
  onClose: () => void;
}

export function ReviewForm({ movieId, onClose }: ReviewFormProps) {
  const { user } = useUser();
  const { addReview } = useStore();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addReview({
        movieId,
        rating,
        comment,
        userId: user.id,
        userName: user.fullName || 'Anonymous',
      });
      onClose();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
      <div className="mb-4">
        <label className="block mb-2">Rating</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="focus:outline-none"
            >
              <Star
                className={`w-6 h-6 ${
                  value <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={value <= rating ? 'currentColor' : 'none'}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg"
          disabled={!rating || !comment.trim()}
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}