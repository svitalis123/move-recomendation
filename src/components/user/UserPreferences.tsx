'use client';

import { useState } from 'react';
import { useStore } from '@/store';
import { Settings } from 'lucide-react';

export function UserPreferences() {
  const [isOpen, setIsOpen] = useState(false);
  const { preferences, setPreferences } = useStore();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100"
        title="Preferences"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50">
          <h3 className="font-bold mb-4">Preferences</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ language: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.adultContent}
                  onChange={(e) => 
                    setPreferences({ adultContent: e.target.checked })
                  }
                  className="rounded"
                />
                <span className="text-sm">Show adult content</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}