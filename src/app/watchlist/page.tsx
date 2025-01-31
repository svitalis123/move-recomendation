import { AuthGuard } from '@/components/common/AuthGuard';
import { WatchlistGrid } from '@/components/movies/WatchlistGrid';

export default function WatchlistPage() {
  return (
    <AuthGuard>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Watchlist</h1>
        <WatchlistGrid />
      </main>
    </AuthGuard>
  );
}