'use client';

import { useState, useCallback, startTransition } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { useStore } from '@/store';
import { useDebounce } from '@/hooks/useDebounce';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const { performSearch } = useStore();

  const debouncedSearch = useDebounce<string>((value: string) => {
    startTransition(() => {
      performSearch(value);
    });
  }, 300);
  

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search movies..."
        className="w-full px-4 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}