export default function EventList({ events }) {
  if (!events.length) {
    return <p>No events received yet.</p>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <div className="event-header">
            <span className={`status ${event.status.toLowerCase()}`}>
              {event.status}
            </span>
            <span className="time">
              {new Date(event.createdAt).toLocaleString()}
            </span>
          </div>

          <pre className="payload">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        </div>
      ))}
    </div>
  );
}
