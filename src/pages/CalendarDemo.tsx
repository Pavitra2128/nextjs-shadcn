import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/DatePickerWithRange';
import { Calendar } from '@/components/ui/calendar';
import { Edit, Trash2, ChevronDown } from 'react-feather';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import "./styles.css";

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
  const [selectedTemple, setSelectedTemple] = useState<number | null>(null);
  const [temples, setTemples] = useState<Temple[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsForSelectedDate, setEventsForSelectedDate] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [updateEventId, setUpdateEventId] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<'delete' | 'edit' | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const response = await axios.get<Temple[]>('http://localhost:3000/api/getTemples');
        setTemples(response.data);
        setSelectedTemple(response.data[0]?.id ?? null);
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

  const formattingDate = (dateString: string): Date => {
    return new Date(dateString);
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
      setUpdateEventId(null); 
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
          toast({
            title: 'Updated!!',
            description: 'Event updated successfully!',
            className: 'toast-success',
          });
          setUpdateEventId(null);
        } else {
          // Add event
          await axios.post('http://localhost:3000/api/addEvent', {
            templeId: selectedTemple,
            startDate: formatDate(selectedDateRange.from),
            endDate: formatDate(selectedDateRange.to),
            name: eventName,
          });
          toast({
            title: 'Success',
            description: 'Event added successfully!',
            className: 'toast-success',
          });
        }
        setEventName('');
        setSelectedDateRange({ from: undefined, to: undefined });
        const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error adding/updating the event!', error);
        toast({
          title: 'Error',
          description: 'There was an error adding/updating the event!',
          className: 'toast-error',
        });
      }
    }
  };

  const handleUpdate = (event: Event) => {
    setUpdateEventId(event.id);
    setEventName(event.event_name);
    setSelectedDateRange({ from: new Date(event.event_date), to: new Date(event.to_date) });
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (deleteEventId && selectedTemple !== null) {
      try {
        await axios.delete('http://localhost:3000/api/deleteEvent', {
          data: { eventId: deleteEventId },
        });
        toast({
          title: 'Deleted',
          description: 'Event deleted successfully!',
          className: 'toast-success',
        });
        const response = await axios.get<Event[]>(`http://localhost:3000/api/getEvents?templeId=${selectedTemple}`);
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error deleting the event!', error);
        toast({
          title: 'Error',
          description: 'There was an error deleting the event!',
          className: 'toast-error',
        });
      }
    }
    setShowDeleteConfirmation(false);
  };

  // Generate the array of all event dates with counts
  const allEventDates = events.reduce((acc, event) => {
    const startDate = new Date(event.event_date);
    const endDate = new Date(event.to_date);
    const dates = getDatesInRange(startDate, endDate);

    dates.forEach(date => {
      const formattedDate = formatDate(date);
      if (acc[formattedDate]) {
        acc[formattedDate]++;
      } else {
        acc[formattedDate] = 1;
      }
    });

    return acc;
  }, {} as Record<string, number>);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEditClick = (event: Event) => {
    setUpdateEventId(event.id);
    setEventName(event.event_name);
    setSelectedDateRange({ from: new Date(event.event_date), to: new Date(event.to_date) });
    setShowForm(true);
  };

  const handleDeleteClick = (eventId: number) => {
    setDeleteEventId(eventId);
    setActionType('delete');
    setShowDeleteConfirmation(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-4 bg-white shadow-lg rounded-lg flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
          <div className="mb-4">
            <h2 className="text-xl mb-2">Select a Temple:</h2>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-white border border-gray-300 p-2 rounded flex justify-between items-center w-auto">
                {selectedTemple !== null ? (
                  <>
                    {temples.find(temple => temple.id === selectedTemple)?.name}
                    <ChevronDown className="ml-2" />
                  </>
                ) : (
                  <span>Select Temple</span>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md rounded mt-2 w-full">
                {temples.map(temple => (
                  <DropdownMenuItem key={temple.id} onClick={() => setSelectedTemple(temple.id)}>
                    {temple.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              fromYear={2020}
              toYear={2030}
              eventDates={allEventDates}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          {showForm && (
            <>
              <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <div className="flex justify-end mb-2">
                  <button
                    className="text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={handleCloseForm}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
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
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
                  >
                    {updateEventId ? 'Update Event' : 'Add Event'}
                  </Button>
                </form>
              </div>
            </>
          )}
          {selectedDate && (
            <>
              <div className="bg-white p-4 rounded-md shadow-md max-h-96 overflow-y-auto">
                <h2 className="text-xl mb-4">Events on {selectedDate.toDateString()}</h2>
                <div className="max-h-48 overflow-y-auto">
                  <ul>
                    {eventsForSelectedDate.map(event => (
                      <li key={event.id} className="mb-2 flex items-center justify-between">
                        <span>{event.event_name} ({event.event_days} days) - {formattingDate(event.event_date).toDateString()} to {formattingDate(event.to_date).toDateString()}</span>
                        <div className="flex space-x-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleEditClick(event)}
                            className="text-blue-500"
                          >
                            <Edit color="blue" size={15} />
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleDeleteClick(event.id)}
                            className="text-red-500"
                          >
                            <Trash2 color="red" size={15} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Toaster />
      <AlertDialog open={showDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your event
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={actionType === 'delete' ? handleDelete : () => { }}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CalendarDemo;