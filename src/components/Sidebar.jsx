import React from 'react';
import { Home, TrendingUp, Library, Compass, Settings, LogOut } from 'lucide-react';
import { Logo } from './Logo';

const menuItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: TrendingUp, label: 'Trends' },
  { icon: Library, label: 'Library' },
  { icon: Compass, label: 'Discover' }
];

const generalItems = [
  { icon: Settings, label: 'Settings' },
  { icon: LogOut, label: 'Log Out' }
];

function MenuItem({ Icon, label, active }) {
  return (
    <li>
      <a
        href="#"
        className={`flex items-center px-4 py-2 text-sm ${
          active ? 'text-red-500' : 'text-gray-400 hover:text-white'
        }`}
      >
        <Icon className="w-5 h-5 mr-3" />
        {label}
      </a>
    </li>
  );
}

export function Sidebar() {
  return (
    <div className="w-64 bg-black h-screen fixed left-0 top-0 text-white p-6">
      <Logo className="mb-8" />
      
      <div className="mb-8">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          MENU
        </h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <MenuItem key={item.label} Icon={item.icon} label={item.label} active={item.active} />
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          GENERAL
        </h2>
        <ul className="space-y-2">
          {generalItems.map((item) => (
            <MenuItem key={item.label} Icon={item.icon} label={item.label} />
          ))}
        </ul>
      </div>
    </div>
  );
}