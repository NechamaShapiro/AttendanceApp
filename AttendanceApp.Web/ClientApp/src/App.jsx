import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import AdminHome from './Pages/AdminHome';
import Login from './Pages/Login';
import MonitorAttendance from './Pages/MonitorAttendance';
import MonitorDay from './Components/MonitorDay';
import EnterAttendance from './Pages/EnterAttendance';
import Reports from './Pages/Reports';
import Help from './Pages/Help';
import Layout from './Layout';
import EnterStudents from './Pages/Database/EnterStudents';
import Courses from './Pages/Database/Courses';
import Classes from './Pages/Database/Classes';
import AttendanceByTeacher from './Pages/AttendanceByTeacher';
import MonitorPeriod from './Pages/MonitorPeriod';
import Compliance from './Pages/Compliance';
const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<AdminHome />} />
                    <Route exact path='/login' element={<Login />} />

                    <Route exact path='/database/enter-students' element={<EnterStudents />} />
                    <Route exact path='/database/classes' element={<Classes />} />
                    <Route exact path='/database/courses' element={<Courses />} />

                    <Route exact path='/attendance/monitoring' element={<MonitorAttendance />} />
                    <Route exact path='/attendance/monitoring/monitor-day' element={<MonitorDay />} />
                    <Route exact path='/attendance/monitoring/monitor-period' element={<MonitorPeriod />} />
                    <Route exact path='/attendance/entry' element={<EnterAttendance />} />
                    <Route exact path='/attendance/entry/by-teacher' element={<AttendanceByTeacher />} />

                    <Route exact path='/compliance' element={<Compliance />} />
                    <Route exact path='/reports' element={<Reports />} />
                    <Route exact path='/help' element={<Help />} />
                </Routes>
            </Layout>
        </LocalizationProvider>
    );
};

export default App;