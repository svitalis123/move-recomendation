import { Suspense } from 'react';
import { MovieGrid } from '@/components/movies/MovieGrid';
import { Sidebar } from '@/components/layout/Sidebar';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function MoviesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <Sidebar />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
          <Suspense fallback={<LoadingSpinner />}>
            <MovieGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}