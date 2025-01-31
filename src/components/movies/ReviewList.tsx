import { Review } from '@/types/movie.types';
import { Star } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatters';

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews.length) {
    return (
      <p className="text-gray-600 text-center py-8">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{review.userName}</span>
              <div className="flex items-center">
                <Star
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                />
                <span className="ml-1">{review.rating}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {formatDate(review.createdAt)}
            </span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}