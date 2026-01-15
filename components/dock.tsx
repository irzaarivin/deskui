'use client';

import { Home, Mail, Calendar, Music, LayoutGrid, Settings, Folder, Terminal, Bookmark } from 'lucide-react';

export default function Dock({ handleDockItemClick }: { handleDockItemClick: (item: any) => void }) {
  const dockItems = [
    { icon: Home, label: 'Home', color: 'text-blue-500' },
    { icon: Mail, label: 'Mail', color: 'text-red-500' },
    { icon: Music, label: 'Music', color: 'text-pink-500' },
    { icon: Folder, label: 'Files', color: 'text-yellow-500' },
    { icon: Terminal, label: 'Terminal', color: 'text-green-500' },
    { icon: Calendar, label: 'Calendar', color: 'text-orange-500' },
    { icon: LayoutGrid, label: 'Kanban', color: 'text-purple-500' },
    { icon: Bookmark, label: 'Bookmarks', color: 'text-indigo-500' },
    { icon: Settings, label: 'Settings', color: 'text-gray-500' },
  ];

  return (
    <div>
      <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl p-2 flex gap-2">
        {dockItems.map((item, index) => (
          <button key={index} onClick={() => handleDockItemClick(item.label)} className="group hover:cursor-pointer relative flex items-center justify-center w-14 h-14 rounded-xl bg-white/50 hover:bg-white/100 backdrop-blur-sm transition-all duration-200 hover:scale-150 hover:-translate-y-7 shadow-lg" aria-label={item.label}>
            <item.icon className={`w-7 h-7 ${item.color}`} />
            <div className="absolute bottom-full mb-2 px-2 py-1 bg-gray-800/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}