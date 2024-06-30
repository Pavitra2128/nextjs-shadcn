import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import { Calendar } from '@/components/ui/Calendar';

interface Event {
  id: number;
  temple_id: number;
  event_date: string;
  to_date: string;
  event_name: string;
  event_days: number;
}

interface Temple {
  id: number;
  name: string;
}

const CalendarDemo: React.FC = () => {
  const [selectedTemple, setSelectedTemple] = useState<number | null>(null);
  const [temples, setTemples] = useState<Temple[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get<Temple[]>('http://localhost:3000/api/getTemples');
        setTemples(response.data);
      } catch (error) {
        console.error('There was an error fetching the temples!', error);
      }
    };
    fetchTemples();
  }, []);

  useEffect(() => {
    if (selectedTemple !== null) {
      const fetchEvents = async () => {
        try {
          const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
          setEvents(response.data);
        } catch (error) {
          console.error('There was an error fetching the events!', error);
        }
      };
      fetchEvents();
    }
  }, [selectedTemple]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setSelectedDateRange(range);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const eventsForDate = events.filter(event => {
        const eventStartDate = new Date(event.event_date);
        const eventEndDate = new Date(event.to_date);
        return date >= eventStartDate && date <= eventEndDate;
      });
      setSelectedDate(date);
      setEventsForSelectedDate(eventsForDate);
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDateRange.from && selectedDateRange.to && selectedTemple !== null) {
      try {
        await axios.post('http://localhost:3000/api/addEvent', {
          templeId: selectedTemple,
          startDate: formatDate(selectedDateRange.from),
          endDate: formatDate(selectedDateRange.to),
          name: eventName,
        });
        alert('Event added successfully!');
        setEventName('');
        setSelectedDateRange({ from: undefined, to: undefined });
        const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
        setEvents(response.data);
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
            <h2 className="text-2xl mb-4 font-bold">Events</h2>
            <select
              value={selectedTemple ?? ''}
              onChange={(e) => setSelectedTemple(Number(e.target.value))}
              className="mb-4 p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>Select a Temple</option>
              {temples.map(temple => (
                <option key={temple.id} value={temple.id}>{temple.name}</option>
              ))}
            </select>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              fromYear={2020}
              toYear={2030}
              eventDates={events.map(event => formatDate(new Date(event.event_date)))}
            />
          </div>
        </div>
        <div className="w-1/3 pl-4">
          {showForm && (
            <>
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
                    <label className="block text-gray-700">Select Date Range:</label>
                    <DatePickerWithRange
                      selectedDateRange={selectedDateRange}
                      onDateRangeChange={handleDateRangeChange}
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
                  <h2 className="text-xl mb-4">Events on {formatDate(selectedDate)}</h2>
                  {eventsForSelectedDate.length > 0 ? (
                    <ul>
                      {eventsForSelectedDate.map(event => (
                        <li key={event.id} className="mb-2">
                          {event.event_name} ({event.event_days} days)
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No events on this date</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarDemo;

