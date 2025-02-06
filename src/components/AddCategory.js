import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCategory.css';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [sequence, setSequence] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sequence', sequence);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/categories', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Category added successfully');
                navigate('/dashboard');
            } else {
                alert('Failed to add category');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category');
        }
    };

    return (
        <div className="add-category-container">
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category Sequence:</label>
                    <input
                        type="number"
                        value={sequence}
                        onChange={(e) => setSequence(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddCategory;