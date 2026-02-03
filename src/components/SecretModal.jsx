export const SecretModal = ({ secret, onClose }) => {
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

  // --- Updated copyToClipboard ---
  const copyToClipboard = async () => {
    await copyTextToClipboard(secret); // Use the helper
    alert("Secret copied to clipboard");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>Webhook Created </h3>

        <p className="warning">Copy this secret now</p>

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
