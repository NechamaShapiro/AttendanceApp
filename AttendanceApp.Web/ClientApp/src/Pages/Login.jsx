// import React from 'react';
// import { Container, Typography, TextField, Button } from '@mui/material';

// const Login = () => {
//     <>
//         {/* const [values, setValues] = React.useState({
//         password: "",
//         showPassword: false,
//     });

//     const handleClickShowPassword = () => {
//         setValues({ ...values, showPassword: !values.showPassword });
//     };

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };

//     const handlePasswordChange = (prop) => (event) => {
//         setValues({ ...values, [prop]: event.target.value });
//     }; */}
//     </>
//     return (
//         <div style={{ margin: '5px', padding: '50px', textAlign: 'center' }}>
//             <form>
//                 <Typography variant="h4" component="h1">
//                     Log in to your account:
//                 </Typography>
//                 <br></br>
//                 <TextField label="Username" variant="outlined" />
//                 <>
//                     {/* <InputLabel htmlFor="standard-adornment-password">
//                             Enter your Password
//                         </InputLabel>
//                         <Input
//                             type={values.showPassword ? "text" : "password"}
//                             onChange={handlePasswordChange("password")}
//                             value={values.password}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                     >
//                                         {values.showPassword ? <Visibility /> : <VisibilityOff />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                         /> */}
//                 </>
//                 <br></br><br></br>
//                 <TextField label="Password" variant="outlined" type='password' />
//                 <br></br><br></br>
//                 <Button variant="contained">Login</Button>
//             </form>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getAxios from '../AuthAxios';
import { useAuth } from '../AuthContext';

const Login = () => {

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const onFormSubmit = async e => {
        try {
            e.preventDefault();
            const { data } = await getAxios().post('/api/account/login', formData);
            const { token } = data;
            localStorage.setItem('auth-token', token);
            setIsValidLogin(true);
            const { data: user } = await getAxios().get('/api/account/getcurrentuser');
            setUser(user);
            navigate('/');
        }
        catch (e) {

        }
    }

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!isValidLogin && <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.username} type="text" name="username" placeholder="Username" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.password} type="password" name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
