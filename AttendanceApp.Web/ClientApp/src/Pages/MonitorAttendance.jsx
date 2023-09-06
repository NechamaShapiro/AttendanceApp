import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MonitorDay from '../Components/MonitorDay';

const MonitorAttendance = () => {
    const [chosenDate, setChosenDate] = useState(null); // Initialize with null or a default date

    function handleChange1(date) {
        setChosenDate(date);
        console.log(date);
    }
    return (
        <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
            <Typography variant="h2" component="h1">
                Monitoring attendance page
            </Typography>
            <br></br>
            <Button component={Link} to="/attendance/monitoring/monitor-period" variant="contained" color="secondary">
                Current Period
            </Button>
            <br></br>
            <br></br>
            <Button component={Link} to="/attendance/monitoring/monitor-day" variant="contained" color="secondary">
                Today
            </Button>
            <br></br>
            <br></br>
            {/* <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={chosenDate} // Pass the chosenDate state to control the DatePicker value
                        onChange={handleChange1}
                        label="Choose date"
                    />
                </LocalizationProvider>
                <br></br>
                <Button
                    variant="contained"
                    component={Link} // Use Link component for routing
                    to={{
                        pathname: '/attendance/monitoring/monitor-day',
                        state: { date: chosenDate } // Pass chosenDate as state
                    }}
                >
                    Continue
                </Button>
            </> */}
        </div>
    );
};

export default MonitorAttendance;