'use client';

import { useState } from 'react';
import { useStore } from '@/store';
import { Filter, X } from 'lucide-react';
import { TMDBGenre } from '@/types/api';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, setPreferences } = useStore();

  // Placeholder genres - in real app, fetch from API
  const genres: TMDBGenre[] = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    // Add more genres...
  ];

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
        } md:translate-x-0 md:static md:w-auto md:shadow-none`}
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
              <div className="space-y-2">
                {genres.map((genre) => (
                  <label key={genre.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.genres.includes(genre.id)}
                      onChange={(e) => {
                        const newGenres = e.target.checked
                          ? [...preferences.genres, genre.id]
                          : preferences.genres.filter((id) => id !== genre.id);
                        setPreferences({ genres: newGenres });
                      }}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-sm">{genre.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Other Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferences.adultContent}
                    onChange={(e) => 
                      setPreferences({ adultContent: e.target.checked })
                    }
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