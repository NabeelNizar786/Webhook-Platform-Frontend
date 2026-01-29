import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateWebhookForm from "../components/CreateWebhookForm";
import { useNavigate } from "react-router-dom";

const Webhooks = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchWebhooks = async () => {
    try {
      const res = await api.get("/webhooks");
      console.log(res.data);
      setWebhooks(res.data);
    } catch (err) {
      alert("Failed to fetch webhooks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2>Webhook Subscriptions</h2>
        </div>

        <CreateWebhookForm onCreated={fetchWebhooks} />

        {loading ? (
          <p className="loading">Loading webhooks...</p>
        ) : (
          <div className="table-wrapper">
            <table className="webhook-table">
              <thead>
                <tr>
                  <th>Source URL</th>
                  <th>Callback URL</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {webhooks.map((wh) => (
                  <tr
                    key={wh.id}
                    onClick={() => navigate(`/webhooks/${wh._id}/events`)}
                    className="clickable"
                  >
                    <td className="mono">{wh.sourceUrl}</td>
                    <td className="mono">{wh.callbackUrl}</td>
                    <td>
                      <span className={`status ${wh.status.toLowerCase()}`}>
                        {wh.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Webhooks;
