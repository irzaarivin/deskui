'use client';

import Image from "next/image"; 
import Dock from "@/components/dock";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "motion/react"
import BookmarkApp from '@/components/applications/bookmark';
import KanbanApp from '@/components/applications/kanban';
import CalendarApp from "@/components/applications/calendar";

export default function Home() {
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showKanban, setShowKanban] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDockItemClick = (item: any) => {
    if(item === 'Bookmarks') setShowBookmarks(!showBookmarks)
    if(item === 'Kanban') setShowKanban(!showKanban)
    if(item === 'Calendar') setShowCalendar(!showCalendar)
  };

  return (
    <div className="min-h-screen flex items-end justify-center p-8">
      <Image src="/backgrounds/wallpaper2.jpg" alt="Desktop wallpaper" fill priority className="object-cover"/>

      <div className="mb-20">
        <AnimatePresence>
          {showCalendar && (
            <motion.div
              className="fixed w-full h-full inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 1, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 1000 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarApp />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showKanban && (
            <motion.div
              className="fixed w-full h-full inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 1, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 1000 }}
              transition={{ duration: 0.3 }}
            >
              <KanbanApp />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showBookmarks && (
            <motion.div
              className="absolute w-full h-full inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 1, y: 1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: 1000 }}
              transition={{ duration: 0.3 }}
            >
              <BookmarkApp />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10">
        <Dock handleDockItemClick={handleDockItemClick} />
      </div>
    </div>
  );
}
