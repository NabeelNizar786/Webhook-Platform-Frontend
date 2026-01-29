import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <div className="webhook-button">
        <button onClick={() => navigate(`/webhooks`)}>
          Webhooks
        </button>
      </div>

      <button className="webhook-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
