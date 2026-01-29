import { useState } from "react";
import api from "../api/axios";

const CreateWebhookForm = ({ onCreated }) => {
  const [source, setSource] = useState("");
  const [sourceUrl, setsourceUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/webhooks", {
        source,
        sourceUrl,
        callbackUrl,
      });

      setSourceUrl("");
      setCallbackUrl("");
      onCreated();
    } catch (err) {
      alert("Failed to create webhook");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Webhook</h3>

      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        required
      />

      <input
        placeholder="Source URL"
        value={sourceUrl}
        onChange={(e) => setsourceUrl(e.target.value)}
        required
      />

      <input
        placeholder="Callback URL"
        value={callbackUrl}
        onChange={(e) => setCallbackUrl(e.target.value)}
        required
      />

      <button disabled={loading}>{loading ? "Creating..." : "Create"}</button>
    </form>
  );
};

export default CreateWebhookForm;
