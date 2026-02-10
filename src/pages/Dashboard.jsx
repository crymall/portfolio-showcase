import { Outlet } from "react-router-dom";
import useAuth from "../context/auth/useAuth";
import Header from "../components/Header";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <Header user={user} logout={logout} />
      <main className="bg-onyx flex min-h-screen items-start justify-center md:pt-5">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
