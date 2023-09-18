import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    CssBaseline,
    Toolbar,
    List,
    Typography,
    Divider,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Button,
    IconButton,
    Tooltip
} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HomeIcon from '@mui/icons-material/Home';
import GradingIcon from '@mui/icons-material/Grading';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from './AuthContext';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const drawerWidth = 240;

const Layout = ({ children }) => {
    const { user } = useAuth();
    const [openDatabaseCollapse, setOpenDatabaseCollapse] = useState(false);
    const [openAttendanceCollapse, setOpenAttendanceCollapse] = useState(false);

    const handleOpenDatabaseCollapse = () => {
        setOpenDatabaseCollapse(!openDatabaseCollapse);
    };
    const handleOpenAttendanceCollapse = () => {
        setOpenAttendanceCollapse(!openAttendanceCollapse);
    };
    return (
        <div>
            <header>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" noWrap component="div">
                                    Attendance App
                                </Typography>
                            </Box>
                            {!user && <Box sx={{ flexGrow: 0 }}>
                                <Tooltip>
                                    <Button sx={{ p: 0, color: 'white' }} component={Link} to='/login'>
                                        <LoginIcon />
                                        <Typography>Login</Typography>
                                    </Button>
                                </Tooltip>
                            </Box>}
                            {!!user && <Box sx={{ flexGrow: 0 }}>
                                <Tooltip>
                                    <Button sx={{ p: 0, color: 'white' }} component={Link} to='/logout'>
                                        <LogoutIcon />
                                        <Typography>Logout</Typography>
                                    </Button>
                                </Tooltip>
                            </Box>}
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip>
                                    <ListItem sx={{ p: 0 }} style={{margin: '15px'}}>
                                        <PersonIcon />
                                        <Typography>{!!user ? user.username : "Logged out"}</Typography>
                                    </ListItem>
                                </Tooltip>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar />
                        <Box sx={{ overflow: 'auto' }}>
                            <List>
                                <ListItem key="Home" disablePadding>
                                    <ListItemButton component={Link} to='/'>
                                        <ListItemIcon>
                                            <HomeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Home" />
                                    </ListItemButton>
                                </ListItem>
                                {!!user && user.role === 'Admin' && <ListItem key="Create Account" disablePadding>
                                    <ListItemButton component={Link} to='/create-account'>
                                        <ListItemIcon>
                                            <PersonAddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Create Account" />
                                    </ListItemButton>
                                </ListItem>}
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <ListItem key="Database Setup" disablePadding>
                                    <ListItemButton onClick={handleOpenDatabaseCollapse}>
                                        <ListItemIcon>
                                            {openDatabaseCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary="Database Setup" />
                                    </ListItemButton>
                                </ListItem>}
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <Collapse in={openDatabaseCollapse} timeout="auto" unmountOnExit>
                                    <ListItem key="Enter Students" disablePadding>
                                        <ListItemButton component={Link} to='/database/enter-students'>
                                            <ListItemText inset primary="Enter Students" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Enter Class Splits" disablePadding>
                                        <ListItemButton component={Link} to='/database/classes'>
                                            <ListItemText inset primary="Enter Class Splits" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Create Courses" disablePadding>
                                        <ListItemButton component={Link} to='/database/courses'>
                                            <ListItemText inset primary="Create Courses" />
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>}

                                {!!user && user.role === 'Teacher' && <ListItem key="Attendance Entry" disablePadding>
                                    <ListItemButton component={Link} to='/attendance/entry'>
                                        <ListItemText primary="Attendance Entry" />
                                    </ListItemButton>
                                </ListItem>}

                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <ListItem key="Attendance" disablePadding>
                                    <ListItemButton onClick={handleOpenAttendanceCollapse}>
                                        <ListItemIcon>
                                            {openAttendanceCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary="Attendance" />
                                    </ListItemButton>
                                </ListItem>}
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <Collapse in={openAttendanceCollapse} timeout="auto" unmountOnExit>
                                    <ListItem key="Entry" disablePadding>
                                        <ListItemButton component={Link} to='/attendance/entry'>
                                            <ListItemText inset primary="Entry" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem key="Monitoring" disablePadding>
                                        <ListItemButton component={Link} to='/attendance/monitoring'>
                                            <ListItemText inset primary="Monitoring" />
                                        </ListItemButton>
                                    </ListItem>
                                </Collapse>}
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <ListItem key="Compliance" disablePadding>
                                    <ListItemButton component={Link} to='/compliance'>
                                        <ListItemIcon>
                                            <GradingIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Compliance" />
                                    </ListItemButton>
                                </ListItem>}
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <ListItem key="Reports" disablePadding>
                                    <ListItemButton component={Link} to='/reports'>
                                        <ListItemIcon>
                                            <SummarizeIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Reports" />
                                    </ListItemButton>
                                </ListItem>}
                            </List>
                            {!!user && <Divider />}
                            <List>
                                {!!user && (user.role === 'Admin' || user.role === 'Office') && <ListItem key="Help" disablePadding>
                                    <ListItemButton component={Link} to='/help'>
                                        <ListItemIcon>
                                            <HelpIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Help" />
                                    </ListItemButton>
                                </ListItem>}
                            </List>
                        </Box>
                    </Drawer>
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Toolbar />
                        {children}
                    </Box>
                </Box>
            </header>
        </div>

    );
}

export default Layout;