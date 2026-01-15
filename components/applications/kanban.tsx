'use client';

import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

export default function KanbanApp() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, title: 'Design new landing page', description: 'Create mockups for the new website', priority: 'high', assignee: 'John' },
      { id: 2, title: 'Update documentation', description: 'Add API examples', priority: 'medium', assignee: 'Sarah' },
      { id: 3, title: 'Fix mobile responsiveness', description: 'Test on various devices', priority: 'high', assignee: 'Mike' },
    ],
    inProgress: [
      { id: 4, title: 'Implement authentication', description: 'OAuth 2.0 integration', priority: 'high', assignee: 'Alice' },
      { id: 5, title: 'Database optimization', description: 'Improve query performance', priority: 'medium', assignee: 'Bob' },
    ],
    done: [
      { id: 6, title: 'Setup CI/CD pipeline', description: 'GitHub Actions configuration', priority: 'high', assignee: 'John' },
      { id: 7, title: 'Write unit tests', description: 'Cover core functionality', priority: 'medium', assignee: 'Sarah' },
      { id: 8, title: 'Code review', description: 'Review PR #123', priority: 'low', assignee: 'Mike' },
    ],
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'from-red-100 to-orange-100', badge: 'bg-red-100 text-red-700' },
    { id: 'inProgress', title: 'In Progress', color: 'from-blue-100 to-cyan-100', badge: 'bg-blue-100 text-blue-700' },
    { id: 'done', title: 'Done', color: 'from-green-100 to-emerald-100', badge: 'bg-green-100 text-green-700' },
  ];

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (task, columnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId) => {
    if (!draggedTask || !draggedFrom) return;

    if (draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    setTasks((prevTasks) => {
      const newTasks = { ...prevTasks };
      
      // Remove from source column
      newTasks[draggedFrom] = newTasks[draggedFrom].filter(
        (task) => task.id !== draggedTask.id
      );
      
      // Add to target column
      newTasks[targetColumnId] = [...newTasks[targetColumnId], draggedTask];
      
      return newTasks;
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  return (
    <div>
      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl w-full max-w-7xl max-h-[85vh] overflow-y-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Kanban Board</h2>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-6 overflow-x-auto overflow-y-hidden flex-1">
          <div className="flex gap-6 h-full min-w-max">
            {columns.map((column) => (
              <div 
                key={column.id} 
                className="flex-1 min-w-[320px] flex flex-col"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                {/* Column Header */}
                <div className={`bg-gradient-to-br ${column.color} rounded-xl p-4 mb-4 shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">{column.title}</h3>
                    <span className={`${column.badge} px-2 py-1 rounded-full text-xs font-medium`}>
                      {tasks[column.id].length}
                    </span>
                  </div>
                </div>

                {/* Tasks */}
                <div className="flex-1 space-y-3 overflow-y-auto pr-2">
                  {tasks[column.id].map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task, column.id)}
                      className="group bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 cursor-move"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 flex-1 pr-2">
                          {task.title}
                        </h4>
                        <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]} flex-shrink-0 mt-1.5`} />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-medium">
                            {task.assignee[0]}
                          </div>
                          <span className="text-xs text-gray-600">{task.assignee}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}