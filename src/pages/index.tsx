import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  event_date: string;
  event_name: string;
  event_days: number;
}

const CalendarDemo: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventDays, setEventDays] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>('http://localhost:3000/api/getEvents');
        console.log('Fetched events:', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error fetching the events!', error);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) {
      console.error('Selected date is undefined');
      return;
    }
    const formattedDate = formatDate(date); // Format the date as 'YYYY-MM-DD'
    console.log('Selected date:', formattedDate);
    setSelectedDate(formattedDate);

    const eventsOnDate = events.filter(event => {
      const eventDateFormatted = formatDate(new Date(event.event_date));
      return eventDateFormatted === formattedDate;
    });

    console.log('Events on selected date:', eventsOnDate);
    setEventsForSelectedDate(eventsOnDate);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate) {
      try {
        await axios.post('http://localhost:3000/api/addEvent', {
          date: selectedDate,
          name: eventName,
          days: eventDays,
        });
        alert('Event added successfully!');
        setEventName('');
        setEventDays(1);
        // Fetch the events again to update the calendar
        const response = await axios.get<Event[]>('/api/getEvents');
        console.log('Fetched events after adding new event:', response.data);
        setEvents(response.data);
        // Update the events for the selected date
        const eventsOnDate = response.data.filter(event => {
          const eventDateFormatted = formatDate(new Date(event.event_date));
          return eventDateFormatted === selectedDate;
        });
        setEventsForSelectedDate(eventsOnDate);
      } catch (error) {
        console.error('There was an error adding the event!', error);
      }
    }
  };

  return (
    
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-4 bg-white shadow-lg rounded-lg flex">
        <div className="w-2/3 pr-4">
          <div className="mb-8">
          <h2 className="text-2xl mb-4 text font-bold">Events</h2>

            
            <Calendar
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={handleDateSelect}
              fromYear={2020}
              toYear={2030}
              eventDates={events.map(event => formatDate(new Date(event.event_date)))}
            />
          </div>
        </div>
        {selectedDate && (
          <div className="w-1/3 pl-4">
            <div className="bg-white p-6 rounded-md shadow-md mb-4">
              <h2 className="text-xl mb-4">Add Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Event Name:</label>
                  <Input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700">Number of Days:</label>
                  <Input
                    type="number"
                    value={eventDays}
                    onChange={(e) => setEventDays(parseInt(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Event
                </Button>
              </form>
            </div>
            {selectedDate && (
              <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl mb-4">Events on {selectedDate}</h2>
                {eventsForSelectedDate.length > 0 ? (
                  <ul>
                    {eventsForSelectedDate.map(event => (
                      <li key={event.id} className="mb-2">
                        {event.event_name} ({event.event_days} day{event.event_days > 1 ? 's' : ''})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No events on this date</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDemo;
