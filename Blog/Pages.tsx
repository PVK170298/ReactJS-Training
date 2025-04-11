"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({ title: '', body: '' });
    const router = useRouter();

    const fetchRecords = async () => {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({ title: post.title, body: post.body });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/posts/${editingPost.id}`, formData);
            setEditingPost(null);
            fetchRecords();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/posts/${id}`);
            fetchRecords();
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleRead = (id) => {
        router.push(`/posts/${id}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Blog Posts:</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid black', margin: '10px', padding: '10px', width: '200px', textAlign: 'left' }}>
                        <h2 style={{ fontWeight: 'bold' }}>{post.title}</h2>
                        <p style={{ fontStyle: 'italic' }}>{post.body}</p>
                        <p style={{ fontStyle: 'italic' }}><strong>Author:</strong> {post.userName}</p>
                        <div>
                            <button style={{ color: 'blue', fontWeight: 'bold', margin: '5px' }} onClick={() => handleRead(post.id)}>Read</button>
                            <button style={{ color: 'green', fontWeight: 'bold', margin: '5px' }} onClick={() => handleEdit(post)}>Edit</button>
                            <button style={{ color: 'red', fontWeight: 'bold', margin: '5px' }} onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            {editingPost && (
                <div style={styles.editContainer}>
                    <h2>Edit Post</h2>
                    <form onSubmit={handleUpdate} style={styles.form}>
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
                        <button type="submit" style={styles.button}>Update Post</button>
                    </form>
                </div>
            )}
        </div>
    );
}

const styles = {
    editContainer: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9'
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
