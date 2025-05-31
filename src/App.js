import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Courses from './Components/Courses';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import Home from './Components/Home';
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import certificate from './Components/certificate';
import Forum from './Components/forum';
import Privacy from './Components/Privacy';
import Shipping from './Components/Shipping';
import ContactUs from './Components/ContactUs'; // ✅ Added ContactUs page
import Terms from './Components/Terms';
import Refunds from './Components/Refunds';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Core App Routes */}
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/profile" Component={Profile} />
          <Route path="/courses" Component={Courses} />
          <Route path="/course/:id" Component={Course} />
          <Route path="/addcourse" Component={AddCourse} />
          <Route path="/editCourse/:id" Component={EditCourse} />
          <Route path="/learnings" Component={Learnings} />
          <Route path="/assessment/:id" Component={Assessment} />
          <Route path="/certificate/:id" Component={certificate} />
          <Route path="/discussion/:id" Component={Forum} />
          <Route path="/addquestions/:id" element={<AddQuestions />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/Dusers" Component={DUsers} />
          <Route path="/Dcourses" Component={DCourses} />
          <Route path="/Dtutors" Component={DTutors} />
          <Route path="/performance" Component={Performance} />

          {/* Policy Pages for Razorpay */}
          <Route path="/privacy" Component={Privacy} />
          <Route path="/shipping" Component={Shipping} />
          <Route path="/contactus" Component={ContactUs} /> {/* ✅ Contact Us Page */}
          <Route path="/terms" Component={Terms} />
          <Route path="/refunds" Component={Refunds} />

          {/* Fallback */}
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
