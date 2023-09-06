import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const MonitorPeriod = ({ date, startTime, endTime }) => {
    const [courses, setCourses] = useState([]);
    const [attendanceTakenCourseIds, setAttendanceTakenCourseIds] = useState([]);
    useEffect(() => {
        //TO USE THE CURRENT DATE AND CHOOSE A TIME
        // const currentDate = new Date();
        // currentDate.setHours(10);  // Set the desired hour
        // currentDate.setMinutes(45); // Set the desired minute
        // currentDate.setSeconds(0);  // Set the desired second
        const getCurrentPeriodInfo = async () => {
            try {
                let response;
                if (date === undefined) {
                    response = await axios.get(`http://localhost:3000/api/app/getcurrentperiodinfo?utcDateTime=${new Date().toISOString()}`);
                } else {
                    response = await axios.get(`http://localhost:3000/api/app/getperiodinfo?utcDateTime=${date.toISOString()}&startTime=${startTime}&endTime=${endTime}`);
                }
                
                console.log("Current courses:", response.data);
                setCourses(response.data);
            } catch (error) {
                console.error('Error retrieving information:', error);
            }
        }
        getCurrentPeriodInfo();
        const getAttendanceTakenInfo = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/api/app/getattendancetakeninfo?utcDateTime=${new Date().toISOString()}`);
                console.log("Attendance taken course ids:", data);
                setAttendanceTakenCourseIds(data);
            } catch (error) {

            }
        }
        getAttendanceTakenInfo();
    }, []);

    return (
        <Table size="small" aria-label="period" style={{ width: 750 }} align="center">
            <TableHead>
                <TableRow>
                    <TableCell align="center"><strong>Teacher</strong></TableCell>
                    <TableCell align="center"><strong>Subject</strong></TableCell>
                    <TableCell align="center"><strong>Took Attendance?</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.map((c, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell align="center">{c.teacherName}</TableCell>
                            <TableCell align="center">{c.subject}</TableCell>
                            <TableCell align="center">
                                {attendanceTakenCourseIds.includes(c.courseId) ?
                                    <CheckIcon color="success" />
                                    :
                                    <ClearIcon color="error" />}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
};

export default MonitorPeriod;