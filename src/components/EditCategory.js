import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditCategory.css';

const EditCategory = ({ categories, updateCategory }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const category = categories ? categories.find(cat => cat.id === parseInt(id)) : null;

    const [name, setName] = useState(category ? category.name : '');
    const [sequence, setSequence] = useState(category ? category.sequence : '');
    const [image, setImage] = useState(category ? category.image : '');
    const [status, setStatus] = useState(category ? category.status : 'Active');

    useEffect(() => {
        if (!category) {
            navigate('/dashboard');
        }
    }, [category, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('sequence', sequence);
        formData.append('status', status);
        if (image instanceof File) {
            formData.append('image', image);
        } else {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                const updatedCategory = await response.json();
                updateCategory(updatedCategory);
                alert('Category updated successfully');
                navigate('/dashboard');
            } else {
                alert('Failed to update category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
            alert('Failed to update category');
        }
    };

    return (
        <div className="edit-category-container">
            <h2>Edit Category</h2>
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
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditCategory;