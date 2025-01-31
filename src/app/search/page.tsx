import { auth } from '@clerk/nextjs/server';  // Changed this line
import { redirect } from 'next/navigation';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';

export default async function SearchPage() {
  const { userId } = await auth();  // Added await here

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Movies</h1>
      <SearchBar />
      <SearchResults />
    </main>
  );
}