import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateWebhookForm from "../components/CreateWebhookForm";
import { useNavigate } from "react-router-dom";
// Optional: npm install lucide-react
import { Copy, Check, Pencil } from "lucide-react";

const Webhooks = () => {
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null); // To show "Success" state
  const navigate = useNavigate();

  const fetchWebhooks = async () => {
    try {
      const res = await api.get("/webhooks");
      setWebhooks(res.data);
    } catch (err) {
      alert("Failed to fetch webhooks");
    } finally {
      setLoading(false);
    }
  };

  const copyTextToClipboard = async (text) => {
    // Try the modern API first
    if (navigator.clipboard && window.isSecureContext) {
      return await navigator.clipboard.writeText(text);
    } else {
      // Fallback: Create a temporary textarea element
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Ensure the textarea is off-screen
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
      } catch (err) {
        console.error("Fallback copy failed", err);
      }

      document.body.removeChild(textArea);
    }
  };

  // --- Updated handleCopy ---
  const handleCopy = async (e, id) => {
    e.stopPropagation();
    await copyTextToClipboard(id); // Use the helper
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = async (webhook) => {
    try {
      await api.delete(`/webhooks/${webhook._id}`);
      fetchWebhooks();
    } catch (error) {
      alert("Failed to deactivate webhooks");
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
                  <th>Webhook ID</th>
                  <th>Source URL</th>
                  <th>Callback URL</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {webhooks.map((wh) => (
                  <tr
                    key={wh._id}
                    onClick={() => navigate(`/webhooks/${wh._id}/events`)}
                    className="clickable"
                  >
                    <td className="mono id-cell">
                      <span>{wh._id}</span>
                      <button
                        className="copy-inline-btn"
                        onClick={(e) => handleCopy(e, wh._id)}
                        title="Copy ID"
                      >
                        {copiedId === wh._id ? (
                          <Check size={14} color="#4caf50" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </td>
                    <td className="mono">{wh.sourceUrl}</td>
                    <td className="mono">{wh.callbackUrl}</td>
                    <td>
                      <span className={`status ${wh.status.toLowerCase()}`}>
                        {wh.status}
                      </span>
                    </td>
                    <td>
                      <div className="status-cell">
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Stop row click
                            handleEdit(wh); // Call your edit logic
                          }}
                          title="Edit Status"
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
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
