import { useState } from "react";
import api from "../api/axios";
import { SecretModal } from "./SecretModal";

const CreateWebhookForm = ({ onCreated }) => {
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [webhookSecret, setWebhookSecret] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/webhooks", {
        source,
        sourceUrl,
        callbackUrl,
      });

      setWebhookSecret(res.data.secret);
      setSource("");
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
    <>
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
          onChange={(e) => setSourceUrl(e.target.value)}
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

      {webhookSecret && (
        <SecretModal
          secret={webhookSecret}
          onClose={() => setWebhookSecret(null)}
        />
      )}
    </>
  );
};

export default CreateWebhookForm;
