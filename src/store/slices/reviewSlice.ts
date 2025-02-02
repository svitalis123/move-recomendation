// src/store/slices/reviewSlice.ts
import { StateCreator } from 'zustand';
import { Review } from '@/types/movie.types';

export interface ReviewState {
  reviews: Review[];
}

export interface ReviewActions {
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>;
  getReviewsForMovie: (movieId: number) => Review[];
}

export type ReviewSlice = ReviewState & ReviewActions;

export const createReviewSlice: StateCreator<ReviewSlice> = (set, get) => ({
  reviews: [],

  addReview: async (reviewData) => {
    const newReview: Review = {
      id: crypto.randomUUID(), // Generate a unique ID
      createdAt: new Date().toISOString(),
      ...reviewData,
    };

    set((state) => ({
      reviews: [...state.reviews, newReview],
    }));
  },

  getReviewsForMovie: (movieId) => {
    return get().reviews.filter(review => review.movieId === movieId);
  },
});