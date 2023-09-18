// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Paper,
//   TextField,
//   Button,
//   Typography,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from '@mui/material';

// const CreateAccount = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     username: '',
//     password: '',
//     role: '', 
//   });

//   const onTextChange = (e) => {
//     const copy = { ...formData };
//     copy[e.target.name] = e.target.value;
//     setFormData(copy);
//   };

//   const onFormSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('/api/account/createaccount', formData);
//     navigate('/');
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       style={{
//         minHeight: '80vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Paper elevation={3} style={{ padding: '2rem' }}>
//         <Typography variant="h4" gutterBottom>
//           Create a new account
//         </Typography>
//         <form onSubmit={onFormSubmit}>
//           <TextField
//             fullWidth
//             label="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={onTextChange}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={onTextChange}
//             variant="outlined"
//             margin="normal"
//           />
//           <FormControl fullWidth variant="outlined" margin="normal">
//             <InputLabel htmlFor="role">Role</InputLabel>
//             <Select
//               label="Role"
//               name="role"
//               value={formData.role}
//               onChange={onTextChange}
//             >
//               <MenuItem value="Admin">Admin</MenuItem>
//               <MenuItem value="Office">Office</MenuItem>
//               <MenuItem value="Teacher">Teacher</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             fullWidth
//             label="Username"
//             name="username"
//             value={formData.username}
//             onChange={onTextChange}
//             variant="outlined"
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             name="password"
//             value={formData.password}
//             onChange={onTextChange}
//             type="password"
//             variant="outlined"
//             margin="normal"
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             style={{ marginTop: '1rem' }}
//           >
//             Create Account
//           </Button>
//         </form>
//       </Paper>
//     </Container>
//   );
// };

// export default CreateAccount;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete, // Import Autocomplete
} from '@mui/material';

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
    teacherId: '', // Add a field for teacherId
  });

  const [teachers, setTeachers] = useState([]); // State for storing the list of teachers

  useEffect(() => {
    // Fetch the list of teachers from the database and update the state
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get('/api/app/getteachers');
        data.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  const onTextChange = (e) => {
    const copy = { ...formData };
    copy[e.target.name] = e.target.value;
    setFormData(copy);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/account/createaccount', formData);
    navigate('/');
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Create a new account
        </Typography>
        <form onSubmit={onFormSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onTextChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onTextChange}
            variant="outlined"
            margin="normal"
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={onTextChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          {formData.role === 'Teacher' && ( // Conditionally render for the 'Teacher' role
            <Autocomplete
              options={teachers}
              getOptionLabel={(option) => option.name} // Adjust to match your data structure
              onChange={(event, newValue) => {
                const copy = { ...formData };
                copy.teacherId = newValue ? newValue.id : '';
                setFormData(copy);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a Teacher"
                  variant="outlined"
                  margin="normal"
                />
              )}
            />
          )}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={onTextChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={formData.password}
            onChange={onTextChange}
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateAccount;
