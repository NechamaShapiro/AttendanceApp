import React, { useState } from 'react';
import axios from 'axios';
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Input
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';

const EnterStudents = () => {
    const [names, setNames] = useState(['']);
    const [studentGrade, setStudentGrade] = useState('select');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check if the selected file type is allowed
            if (isValidFileType(file)) {
                setSelectedFile(file);
            } else {
                alert('Invalid file type. Please select a valid file.');
                event.target.value = null; // Clear the file input
            }
        }
    };

    const isValidFileType = (file) => {
        const acceptedTypes = ['.xlsx', '.xls']; // Specify accepted file types here
        const fileName = file.name || '';

        // Check if the file name has one of the accepted extensions
        const fileExtension = fileName.split('.').pop();
        return acceptedTypes.includes(`.${fileExtension}`);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('excelFile', selectedFile);

        try {
            // Adjust the URL to match your backend endpoint
            const response = await axios.post(`http://localhost:3000/api/app/uploadstudents`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);
            alert('File uploaded successfully.');
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };

    const handleGradeChange = (event) => {
        setStudentGrade(event.target.value);
    };
    const handleNameChange = (event, index) => {
        const newNames = [...names];
        newNames[index] = event.target.value;
        setNames(newNames);
    };

    const handleAddNameField = () => {
        setNames([...names, '']);
    };

    const handleDeleteNameField = (index) => {
        const newNames = [...names];
        newNames.splice(index, 1);
        setNames(newNames);
    };

    const onAddAllClick = async () => {
        const formData = new URLSearchParams();
        formData.append('grade', studentGrade);
        names.forEach(name => formData.append('names', name));
        await axios.post('/api/app/addstudents', formData);
        setNames(['']);
        setStudentGrade('select');
    };
    return (
        <>
            <h4><u>Enter Students:</u></h4>
            <ol>
                <li>Select a grade to add students to.</li>
                <li>Upload an excel spreadsheet with a list of students (one grade at a time) OR enter the name of the student manually [Last, First].</li>
                <li>Click on the <AddIcon color='primary' /> to add multiple students.</li>
                <li>Use the <DeleteOutlinedIcon color='error' /> as needed.</li>
                <li>Click ADD ALL STUDENTS.</li>
            </ol>
            <FormControl>
                <InputLabel>Select Grade</InputLabel>
                <Select
                    value={studentGrade}
                    label="Select Grade"
                    onChange={handleGradeChange}
                    required
                >
                    <MenuItem value="select" disabled>Select Grade</MenuItem>
                    <MenuItem key={9} value={9}>9th Grade</MenuItem>
                    <MenuItem key={10} value={10}>10th Grade</MenuItem>
                    <MenuItem key={11} value={11}>11th Grade</MenuItem>
                    <MenuItem key={12} value={12}>12th Grade</MenuItem>
                </Select>
            </FormControl>
            <br></br><br></br>
            <FormControl>
                {/* <InputLabel htmlFor="file-input">Choose a file</InputLabel> */}
                <Input
                    id="file-input"
                    type="file"
                    onChange={handleFileInputChange}
                    accept=".xlsx, .xls" // Specify accepted file types here
                    style={{ display: 'none' }}
                />
                <Button
                    variant="outlined"
                    component="label"
                    htmlFor="file-input"
                    color='secondary'
                >
                    Choose File
                </Button>
            </FormControl>
            {selectedFile && (
                <Typography variant="body1" gutterBottom>
                    Selected File: {selectedFile.name}
                </Typography>
            )}
            <Button
                variant="contained"
                onClick={handleUpload}
                disabled={!selectedFile}
                color='secondary'
            >
                Upload
            </Button>
            <br></br><br></br>
            {names.map((name, index) => (
                <div key={index}>
                    <TextField
                        label={`Student ${index + 1}`}
                        value={name}
                        onChange={(event) => handleNameChange(event, index)}
                    />
                    <Button color="error" onClick={() => handleDeleteNameField(index)} style={{ marginTop: '10px' }}>
                        <DeleteOutlinedIcon />
                    </Button>
                </div>
            ))}
            <Button onClick={handleAddNameField}>
                <AddIcon />
            </Button>
            <br></br>
            <Button variant="contained" onClick={onAddAllClick}>
                Add All Students
            </Button>
        </>
    )
}

export default EnterStudents;