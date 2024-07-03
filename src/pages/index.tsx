import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import { Calendar } from '@/components/ui/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const getDatesInRange = (startDate: string | number | Date, endDate: string | number | Date) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const CalendarDemo: React.FC = () => {
  const [selectedTemple, setSelectedTemple] = useState<number>(1); // Default to Temple 1
  const [temples, setTemples] = useState<Temple[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updateEventId, setUpdateEventId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get<Temple[]>('http://localhost:3000/api/getTemples');
        setTemples(response.data);
        setSelectedTemple(response.data[0].id); // Set default temple to the first one in the list
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
      setSelectedDateRange({ from: date || undefined, to: date || undefined });
      setShowForm(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDateRange.from && selectedDateRange.to && selectedTemple !== null) {
      try {
        if (updateEventId) {
          // Update event
          await axios.put('http://localhost:3000/api/updateEvent', {
            eventId: updateEventId,
            templeId: selectedTemple,
            startDate: formatDate(selectedDateRange.from),
            endDate: formatDate(selectedDateRange.to),
            name: eventName,
          });
          toast.success('Event updated successfully!');
          setUpdateEventId(null);
        } else {
          // Add event
          await axios.post('http://localhost:3000/api/addEvent', {
            templeId: selectedTemple,
            startDate: formatDate(selectedDateRange.from),
            endDate: formatDate(selectedDateRange.to),
            name: eventName,
          });
          toast.success('Event added successfully!');
        }
        setEventName('');
        setSelectedDateRange({ from: undefined, to: undefined });
        const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error adding/updating the event!', error);
        toast.error('There was an error adding/updating the event!');
      }
    }
  };

  const handleUpdate = (event: Event) => {
    setUpdateEventId(event.id);
    setEventName(event.event_name);
    setSelectedDateRange({ from: new Date(event.event_date), to: new Date(event.to_date) });
    setShowForm(true);
  };

  const handleDelete = async (eventId: number) => {
    try {
      await axios.delete('http://localhost:3000/api/deleteEvent', {
        data: { eventId },
      });
      toast.success('Event deleted successfully!');
      const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
      setEvents(response.data);
    } catch (error) {
      console.error('There was an error deleting the event!', error);
      toast.error('There was an error deleting the event!');
    }
  };

  // Generate the array of all event dates
  const allEventDates = events.flatMap(event => {
    const startDate = new Date(event.event_date);
    const endDate = new Date(event.to_date);
    return getDatesInRange(startDate, endDate);
  });

  // Format the dates
  const formattedEventDates = allEventDates.map(date => formatDate(date));

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-4 bg-white shadow-lg rounded-lg flex">
        <div className="w-1/2 pr-4">
          <div className="mb-4">
            <h2 className="text-2xl mb-4 font-bold">Events</h2>
            <select
              value={selectedTemple ?? ''}
              onChange={(e) => setSelectedTemple(Number(e.target.value))}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
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
              eventDates={formattedEventDates}
            />
          </div>
        </div>
        <div className="w-1/2 pl-4">
          {showForm && (
            <>
              <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h2 className="text-xl mb-4">{updateEventId ? 'Update Event' : 'Add Event'}</h2>
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
                    {updateEventId ? 'Update Event' : 'Add Event'}
                  </Button>
                </form>
              </div>
              {selectedDate && (
                <div className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-xl mb-4">Events on {formatDate(selectedDate)}</h2>
                  <div className="max-h-48 overflow-y-auto">
                    {eventsForSelectedDate.length > 0 ? (
                      <ul>
                        {eventsForSelectedDate.map(event => (
                          <li key={event.id} className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <div className="font-semibold">{event.event_name}</div>
                              <div className="flex space-x-2">
                                <button onClick={() => handleUpdate(event)} className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full">
                                  <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button onClick={() => handleDelete(event.id)} className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full">
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                            <div className="text-gray-600">
                              {formatDate(new Date(event.event_date))} to {formatDate(new Date(event.to_date))}
                            </div>
                            <div className="text-gray-600">
                              Event Days: {event.event_days}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No events on this date</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CalendarDemo;
