import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getAxios from '../AuthAxios';
import { useAuth } from '../AuthContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isValidLogin, setIsValidLogin] = useState(true);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await getAxios().post('/api/account/login', formData);
      const { token } = data;
      localStorage.setItem('auth-token', token);
      setIsValidLogin(true);
      const { data: user } = await getAxios().get('/api/account/getcurrentuser');
      setUser(user);
      navigate('/');
    } catch (e) {}
  };

  const onTextChange = (e) => {
    const copy = { ...formData };
    copy[e.target.name] = e.target.value;
    setFormData(copy);
  };

  return (
    <Container
      maxWidth="md"
      style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}
    >
      <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
        <Typography variant="h5">Log in to your account</Typography>
        {!isValidLogin && (
          <Typography variant="body2" color="error">
            Invalid username/password. Please try again.
          </Typography>
        )}
        <form onSubmit={onFormSubmit}>
          <TextField
            onChange={onTextChange}
            value={formData.username}
            type="text"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            onChange={onTextChange}
            value={formData.password}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: '10px' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
