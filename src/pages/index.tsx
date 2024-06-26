// pages/index.js

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const CalendarDemo = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDays, setEventDays] = useState(1);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('There was an error fetching the events!', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedDate) {
      try {
        await axios.post('/api/addEvent', {
          date: selectedDate,
          name: eventName,
          days: eventDays,
        });
        alert('Event added successfully!');
        setEventName('');
        setEventDays(1);
        // Fetch the events again to update the calendar
        const response = await axios.get('/api/events');
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
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              fromYear={2020}
              toYear={2030}
              events={events} // Pass events data to the calendar
            />
          </div>
        </div>
        {selectedDate && (
          <div className="w-1/3 pl-4">
            <div className="bg-white p-6 rounded-md shadow-md">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDemo;
