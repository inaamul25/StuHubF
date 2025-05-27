import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; // Create or adjust this// Create this
import Home from './Components/Home';
import Courses from './Components/Courses';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import AddCourse from './Components/AddCourse';
import EditCourse from './Components/EditCourses';
import Dashboard from './Components/DashBoard/Dashboard';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import Certificate from './Components/certificate';
import Forum from './Components/forum';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'boxicons/css/boxicons.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <div className="main-content">
          <header className="header">
            <h2>Learning Management System</h2>
            <div className="user-actions">
              <button>Logout</button>
            </div>
          </header>
          <Routes>
            <Route path="/addquestions/:id" element={<AddQuestions />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/discussion/:id" element={<Forum />} />
            <Route path="/certificate/:id" element={<Certificate />} />
            <Route path="/assessment/:id" element={<Assessment />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/editCourse/:id" element={<EditCourse />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Learnings" element={<Learnings />} />
            <Route path="/Dcourses" element={<DCourses />} />
            <Route path="/Dusers" element={<DUsers />} />
            <Route path="/Dtutors" element={<DTutors />} />
            <Route path="/Performance" element={<Performance />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
        <footer>
          <p>&copy; 2025 Learning Management System. All rights reserved.</p>
        </footer>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;