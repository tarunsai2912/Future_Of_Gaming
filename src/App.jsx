import React from 'react';
import { Sidebar } from './components/Sidebar';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="pl-64 flex-1">
        <div className="p-8">
          <header className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Music Player</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-gray-800 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </header>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
}

export default App;