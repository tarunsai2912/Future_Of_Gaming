import React from 'react';
import { Music } from 'lucide-react';

export function Logo({ className }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Music className="w-8 h-8 text-red-500" />
      <span className="ml-2 text-xl font-bold">
        <span className="text-red-500">Dream</span>
        <span className="text-white">Music</span>
      </span>
    </div>
  );
}