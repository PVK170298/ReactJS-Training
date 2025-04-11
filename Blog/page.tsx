"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
    const [formData, setFormData] = useState({
        userName: '',
        title: '',
        body: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/posts', formData);
            alert('Post created successfully!');
            setFormData({
                userName: '',
                title: '',
                body: ''
            });
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Create Page</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>User Name:</label>
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Body:</label>
                    <textarea
                        name="body"
                        value={formData.body}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    ></textarea>
                </div>
                <button type="submit" style={styles.button}>Create Post</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
    },
    heading: {
        color: 'black',
        align : 'Left'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: 'black'
    },
    input: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        color: 'black',
        width: '100%',
        backgroundColor: 'white'
    },
    textarea: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        color: 'black',
        width: '100%',
        backgroundColor: 'white',
        minHeight: '100px'
    },
    button: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        cursor: 'pointer'
    }
};

export default Create;
