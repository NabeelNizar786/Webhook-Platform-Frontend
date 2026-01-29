export const SecretModal = ({ secret, onClose }) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(secret);
    alert("Secret copied to clipboard");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Webhook Created </h3>

        <p className="warning">
          Copy this secret now
        </p>

        <div className="secret-box">
          <code>{secret}</code>
          <button onClick={copyToClipboard}>Copy</button>
        </div>

        <button className="close-btn" onClick={onClose}>
          I have copied it
        </button>
      </div>
    </div>
  );
};
