import * as React from "react";
import { format } from "date-fns";

interface Event {
  event_date: string; // Assuming the event_date is a string in YYYY-MM-DD format
  event_name: string;
}

interface CustomDayProps {
  day: Date;
  events: Event[];
}

const CustomDay: React.FC<CustomDayProps> = ({ day, events }) => {
  // Guard clause to handle undefined or null day prop
  if (!day) {
    return null; // Or handle the absence of day prop appropriately
  }

  const formattedDate = format(day, "yyyy-MM-dd"); // Format date as YYYY-MM-DD

  const renderEventsForDate = () => {
    const filteredEvents = events.filter(
      (event) => event.event_date === formattedDate
    );
    if (filteredEvents.length === 0) return null;

    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-xs space-y-1 text-gray-600 z-10">
        {filteredEvents.map((event, index) => (
          <span key={index} className="px-1 py-0.5 bg-blue-100 rounded">
            {event.event_name}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="relative h-full w-full">
      <div className="h-full w-full">{day.getDate()}</div>
      {renderEventsForDate()}
    </div>
  );
};

export default CustomDay;
