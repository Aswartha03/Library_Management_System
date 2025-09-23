import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/Home";
import DashBoard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./components/profile";
import EditProfile from "./components/EditProfile";
import ResetPassword from "./components/ResetPassword";
import LibrarianDashboard from "./components/Books/LibrarianDashboard";
import UpdateBook from "./components/Books/UpdateBook";
import ForgotPassword from './components/ForgotPassword';
import AddBook from './pages/AddBook';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
        <Route path="/add-book" element={<AddBook/>} />
        <Route path="/edit-book/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
