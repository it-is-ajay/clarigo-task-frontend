import { Route, Routes } from "react-router-dom";
import DashboardPage from './pages/Dashboard';
import UserDashboard from './pages/UserDashboard'
import LoginPage from './pages/Auth/Login';
import SignUpPage from './pages/Auth/SignUp';
import { ToastContainer } from "react-toastify";
import PrivateLayout from "./layout/private.layout";
import PublicLayout from "./layout/public.layout";
import PrivateLayoutAdmin from './layout/private.layout.admin'
function App() {
  return <>
    <Routes>
      <Route path="/" element={
        <PrivateLayout>
          <UserDashboard />
        </PrivateLayout>
      } />

      <Route path="/admin-dashboard" element={
        <PrivateLayoutAdmin>
          <DashboardPage />
        </PrivateLayoutAdmin>
      } />

      <Route path="/login" element={
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      } />
      <Route path="/signup" element={
        <PublicLayout>
          <SignUpPage />
        </PublicLayout>
      } />
    </Routes>
    <ToastContainer />
  </>
}

export default App;
