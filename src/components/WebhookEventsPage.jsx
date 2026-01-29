import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import EventList from "./EventList";

export default function WebhookEventsPage() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    const res = await api.get(`/events/${id}`);
    setEvents(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <h2>Webhook Events</h2>

      {loading ? <p>Loading events...</p> : <EventList events={events} />}
    </div>
  );
}
