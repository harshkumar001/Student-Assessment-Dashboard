import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import PublicRoutes from "./components/Routes/PublicRoutes";
import CreateAssessment from "./pages/AssessmentForm";
import AssessmentForm from "./pages/AssessmentForm";
import Teachers from "./pages/Admin/Teachers";
import Students from "./pages/Admin/Students";
import Assessments from "./pages/Assessments";
import Profile from "./pages/Admin/Profile";
import TeacherProfile from "./pages/Teacher/TeacherProfile";
import StudentProfile from "./pages/Student/StudentProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <Homepage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedRoutes>
                  <Teachers />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedRoutes>
                  <Students />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/assessments"
              element={
                <ProtectedRoutes>
                  <Assessments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/teacher/createAssessment"
              element={
                <ProtectedRoutes>
                  <AssessmentForm />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/teacher/profile"
              element={
                <ProtectedRoutes>
                  <TeacherProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/student/profile/:id"
              element={
                <ProtectedRoutes>
                  <StudentProfile />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
