// src/components/layout/Sidebar.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import { Filter, X } from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const { 
    preferences, 
    setPreferences, 
    genres, 
    fetchGenres, 
    loading: genresLoading, 
    error: genresError 
  } = useStore();


  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleGenreChange = (genreId: number, checked: boolean) => {
    const newGenres = checked
      ? [...preferences.genres, genreId]
      : preferences.genres.filter(id => id !== genreId);
    setPreferences({ genres: newGenres });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg"
      >
        <Filter className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 md:static md:w-64 md:shadow-none`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6 md:hidden">
            <h2 className="font-bold text-lg">Filters</h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Genres</h3>
              {genresLoading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                </div>
              ) : genresError ? (
                <div className="text-red-500 text-sm">{genresError}</div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {genres.map((genre) => (
                    <label key={genre.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.genres.includes(genre.id)}
                        onChange={(e) => handleGenreChange(genre.id, e.target.checked)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm">{genre.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="font-medium mb-2">Other Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.adultContent}
                    onChange={(e) => setPreferences({ adultContent: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm">Include Adult Content</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}