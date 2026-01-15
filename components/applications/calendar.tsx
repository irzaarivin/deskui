import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({
    '2026-01-15': [
      { id: 1, title: 'Team Meeting', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
      { id: 2, title: 'Project Deadline', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-100' },
    ],
    '2026-01-20': [
      { id: 3, title: 'Client Call', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-100' },
    ],
    '2026-01-25': [
      { id: 4, title: 'Workshop', color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-100' },
    ],
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventColor, setNewEventColor] = useState('blue');

  const colors = [
    { name: 'blue', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-100' },
    { name: 'red', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-100' },
    { name: 'green', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-100' },
    { name: 'purple', color: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-100' },
    { name: 'yellow', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    { name: 'pink', color: 'bg-pink-500', textColor: 'text-pink-700', bgColor: 'bg-pink-100' },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const formatDate = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(dateStr);
    setShowAddEvent(false);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim() || !selectedDate) return;

    const colorConfig = colors.find(c => c.name === newEventColor);
    const newEvent = {
      id: Date.now(),
      title: newEventTitle,
      color: colorConfig.color,
      textColor: colorConfig.textColor,
      bgColor: colorConfig.bgColor,
    };

    setEvents(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), newEvent]
    }));

    setNewEventTitle('');
    setShowAddEvent(false);
  };

  const handleDeleteEvent = (dateStr, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateStr]: prev[dateStr].filter(e => e.id !== eventId)
    }));
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div>
      <div className="bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-2xl w-full max-w-7xl max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-purple-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-lg font-semibold text-gray-800 min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Calendar Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Day Names */}
            <div className="grid grid-cols-7 gap-2 mb-3">
              {dayNames.map(day => (
                <div key={day} className="text-center font-semibold text-gray-700 text-sm py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => {
                const dateStr = day ? formatDate(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
                const dayEvents = dateStr ? (events[dateStr] || []) : [];
                const isSelected = dateStr === selectedDate;
                const isTodayDate = isToday(day);

                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`
                      min-h-[100px] p-2 rounded-xl border transition-all duration-200
                      ${day ? 'cursor-pointer hover:bg-white/60 hover:shadow-xl hover:scale-[1.02]' : ''}
                      ${isSelected ? 'bg-white/80 border-purple-400 shadow-xl ring-2 ring-purple-300' : 'bg-white/40 border-white/50 shadow-lg'}
                      ${isTodayDate ? 'ring-2 ring-purple-500' : ''}
                    `}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-1 ${isTodayDate ? 'text-purple-600' : 'text-gray-700'}`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded ${event.bgColor} ${event.textColor} truncate`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 px-2">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Event Sidebar */}
          <div className="w-80 border-l border-white/30 p-6 overflow-y-auto bg-white/20">
            {selectedDate ? (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Events for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <button
                    onClick={() => setShowAddEvent(!showAddEvent)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add Event
                  </button>
                </div>

                {showAddEvent && (
                  <div className="mb-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg">
                    <input
                      type="text"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      placeholder="Event title..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white/80 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {colors.map(colorOption => (
                        <button
                          key={colorOption.name}
                          onClick={() => setNewEventColor(colorOption.name)}
                          className={`w-8 h-8 rounded-full ${colorOption.color} ${
                            newEventColor === colorOption.name ? 'ring-2 ring-gray-800 scale-110' : ''
                          } transition-all`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleAddEvent}
                      className="w-full px-4 py-2 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                    >
                      Save Event
                    </button>
                  </div>
                )}

                <div className="space-y-2">
                  {(events[selectedDate] || []).map(event => (
                    <div
                      key={event.id}
                      className={`p-3 rounded-xl ${event.bgColor} border border-white/50 shadow-lg flex items-start justify-between group hover:shadow-xl transition-all duration-200`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-3 h-3 rounded-full ${event.color} mt-1 flex-shrink-0`} />
                        <span className={`${event.textColor} font-medium`}>{event.title}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(selectedDate, event.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-gray-600 hover:text-red-600" />
                      </button>
                    </div>
                  ))}
                  {(!events[selectedDate] || events[selectedDate].length === 0) && (
                    <p className="text-gray-500 text-sm text-center py-8">No events for this day</p>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a date to view or add events</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}