import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import Analytics from "./pages/dashboard/Analytics";
import InstitutionSetup from "./pages/setup/InstitutionSetup";
import TeacherList from "./pages/teachers/TeacherList";
import AddTeacher from "./pages/teachers/AddTeacher";
import StudentList from "./pages/students/StudentList";
import AddStudent from "./pages/students/AddStudent";
import SubjectConfig from "./pages/academics/SubjectConfig";
import ClassroomSetup from "./pages/locations/ClassroomSetup";
import SessionControl from "./pages/attendance/SessionControl";
import LiveMonitor from "./pages/attendance/LiveMonitor";
import ManualOverride from "./pages/attendance/ManualOverride";
import AttendanceReports from "./pages/reports/AttendanceReports";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/auth/verify-email" element={<VerifyEmail />} />
                <Route path="/auth/reset-password" element={<ResetPassword />} />

                {/* Protected Admin Routes */}
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Analytics />} />
                    <Route path="setup" element={<InstitutionSetup />} />

                    <Route path="teachers" element={<TeacherList />} />
                    <Route path="teachers/add" element={<AddTeacher />} />

                    <Route path="students" element={<StudentList />} />
                    <Route path="students/add" element={<AddStudent />} />

                    <Route path="academics" element={<SubjectConfig />} />
                    <Route path="locations" element={<ClassroomSetup />} />

                    <Route path="attendance/sessions" element={<SessionControl />} />
                    <Route path="attendance/live" element={<LiveMonitor />} />
                    <Route path="attendance/manual" element={<ManualOverride />} />

                    <Route path="reports" element={<AttendanceReports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;