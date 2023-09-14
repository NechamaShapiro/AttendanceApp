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
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Logout from './Pages/Logout';
import CreateAccount from './Pages/CreateAccount';

const App = () => {
    return (
        <AuthContextComponent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Layout>
                    <Routes>
                        <Route exact path='/' element={<AdminHome />} />
                        <Route exact path='/login' element={<Login />} />
                        <Route exact path='/logout' element={
                            <PrivateRoute>
                                <Logout />
                            </PrivateRoute>
                        } />

                        <Route exact path='/database/enter-students' element={
                            <PrivateRoute>
                                <EnterStudents />
                            </PrivateRoute>
                        } />
                        <Route exact path='/database/classes' element={
                            <PrivateRoute>
                                <Classes />
                            </PrivateRoute>
                        } />
                        <Route exact path='/database/courses' element={
                            <PrivateRoute>
                                <Courses />
                            </PrivateRoute>
                        } />

                        <Route exact path='/attendance/monitoring' element={
                            <PrivateRoute>
                                <MonitorAttendance />
                            </PrivateRoute>
                        } />
                        <Route exact path='/attendance/monitoring/monitor-day' element={
                            <PrivateRoute>
                                <MonitorDay />
                            </PrivateRoute>
                        } />
                        <Route exact path='/attendance/monitoring/monitor-period' element={
                            <PrivateRoute>
                                <MonitorPeriod />
                            </PrivateRoute>
                        } />
                        <Route exact path='/attendance/entry' element={<EnterAttendance />} />
                        <Route exact path='/attendance/entry/by-teacher' element={<AttendanceByTeacher />} />

                        <Route exact path='/compliance' element={
                            <PrivateRoute>
                                <Compliance />
                            </PrivateRoute>
                        } />
                        <Route exact path='/reports' element={
                            <PrivateRoute>
                                <Reports />
                            </PrivateRoute>
                        } />
                        <Route exact path='create-account' element={
                            // <PrivateRoute>
                                <CreateAccount />
                            // </PrivateRoute>
                        } />
                        <Route exact path='/help' element={
                            <PrivateRoute>
                                <Help />
                            </PrivateRoute>
                        } />
                    </Routes>
                </Layout>
            </LocalizationProvider>
        </AuthContextComponent>
    );
};

export default App;