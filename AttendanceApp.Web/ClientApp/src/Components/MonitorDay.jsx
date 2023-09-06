import React, { useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MonitorPeriod from '../Pages/MonitorPeriod';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const MonitorDay = () => {
    const periods = [
        { period: 1, startTime: '09:00', endTime: '09:40', startTimeDisplay: '9:00 AM', endTimeDisplay: '9:40 AM' },
        { period: 2, startTime: '09:40', endTime: '10:20', startTimeDisplay: '9:40 AM', endTimeDisplay: '10:20 AM' },
        { period: 3, startTime: '10:30', endTime: '11:10', startTimeDisplay: '10:30 AM', endTimeDisplay: '11:10 AM' },
        { period: 4, startTime: '11:10', endTime: '11:50', startTimeDisplay: '11:10 AM', endTimeDisplay: '11:50 AM' },
        { period: 5, startTime: '11:50', endTime: '12:30', startTimeDisplay: '11:50 AM', endTimeDisplay: '12:30 PM' },
        { period: 6, startTime: '13:00', endTime: '13:40', startTimeDisplay: '1:00 PM', endTimeDisplay: '1:40 PM' },
        { period: 7, startTime: '13:40', endTime: '14:20', startTimeDisplay: '1:40 PM', endTimeDisplay: '2:20 PM' },
        { period: 8, startTime: '14:30', endTime: '15:10', startTimeDisplay: '2:30 PM', endTimeDisplay: '3:10 PM' },
        { period: 9, startTime: '15:10', endTime: '15:50', startTimeDisplay: '3:10 PM', endTimeDisplay: '3:50 PM' },
        { period: 10, startTime: '16:00', endTime: '16:40', startTimeDisplay: '4:00 PM', endTimeDisplay: '4:40 PM' }
    ];
    const [openStates, setOpenStates] = useState(Array(periods.length).fill(false)); // Manage expansion states for each period
    const toggleRow = (index) => {
        const newOpenStates = [...openStates];
        newOpenStates[index] = !newOpenStates[index];
        setOpenStates(newOpenStates);
    };
    return (
        <TableContainer>
            <Table aria-label="collapsible table" style={{ width: 1000 }} align="center">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>
                            <Typography variant="h4" component="h1">
                                Today, {new Date().toLocaleDateString()}
                            </Typography>
                        </TableCell>
                        <TableCell align='center'>
                            Everyone took attendance?
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {periods.map((p, index) => (
                        <React.Fragment key={p.period}>
                            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                                <TableCell width={100}>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => toggleRow(index)}
                                    >
                                        {openStates[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{ fontSize: 20 }}>
                                    <Typography variant="h6" component="p">
                                        Period {p.period}, {p.startTimeDisplay}-{p.endTimeDisplay}
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <ClearIcon color='error' />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                    <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                            <MonitorPeriod
                                                date={new Date ()}
                                                startTime={p.startTime}
                                                endTime={p.endTime}
                                            />
                                        </Box>
                                    </Collapse>
                                </TableCell>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MonitorDay;