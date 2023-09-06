import React, { useState } from 'react';
import { Typography, List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Reports = () => {
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClick1 = () => {
        setOpen1(!open1);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
    };
    return (
        <div style={{ margin: '5px', padding: '50px'/*, textAlign: 'center'*/ }}>
            <Typography variant="h5">
                Choose a report:
            </Typography>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
            >
                <ListItemButton onClick={handleClick1}>
                    <ListItemText primary="Get today's records" />
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="By grade" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="By student" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Entire school" />
                        </ListItemButton>
                    </List>
                </Collapse>

                <ListItemButton onClick={handleClick2}>
                    <ListItemText primary="Get records by date range" />
                    {open2 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open2} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="By grade" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="By student" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Entire school" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </div>
    );
};

export default Reports;