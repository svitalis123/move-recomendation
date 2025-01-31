'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Star, StarHalf } from 'lucide-react';
import { useStore } from '@/store';
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';

interface ReviewSectionProps {
  movieId: number;
}

export function ReviewSection({ movieId }: ReviewSectionProps) {
  const { user } = useUser();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { currentMovie } = useStore();

  if (!currentMovie) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Reviews</h2>
        {user && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Write a Review
          </button>
        )}
      </div>

      {showReviewForm && (
        <ReviewForm
          movieId={movieId}
          onClose={() => setShowReviewForm(false)}
        />
      )}

      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Star className="w-6 h-6 text-yellow-400" fill="currentColor" />
            <span className="text-2xl font-bold ml-2">
              {currentMovie.averageRating?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <span className="text-gray-600">
            {currentMovie.reviews?.length || 0} reviews
          </span>
        </div>
      </div>

      <ReviewList reviews={currentMovie.reviews || []} />
    </div>
  );
}