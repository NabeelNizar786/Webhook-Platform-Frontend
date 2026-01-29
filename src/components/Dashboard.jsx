import { logout } from "../utils/auth";

const Dashboard = () => {
  const handleLogout = () => {
    logout("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome! You are logged in.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
