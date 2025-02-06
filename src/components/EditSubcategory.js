import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditSubcategory.css';

const EditSubcategory = ({ subcategories, updateSubcategory }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const subcategory = subcategories ? subcategories.find(sub => sub.id === parseInt(id)) : null;

    const [name, setName] = useState(subcategory ? subcategory.name : '');
    const [sequence, setSequence] = useState(subcategory ? subcategory.sequence : '');
    const [image, setImage] = useState(subcategory ? subcategory.image : '');
    const [status, setStatus] = useState(subcategory ? subcategory.status : 'Active');

    useEffect(() => {
        if (!subcategory) {
            navigate('/dashboard');
        }
    }, [subcategory, navigate]);

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
            const response = await fetch(`http://localhost:5000/api/subcategories/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (response.ok) {
                const updatedSubcategory = await response.json();
                updateSubcategory(updatedSubcategory);
                alert('Subcategory updated successfully');
                navigate('/dashboard');
            } else {
                alert('Failed to update subcategory');
            }
        } catch (error) {
            console.error('Error updating subcategory:', error);
            alert('Failed to update subcategory');
        }
    };

    return (
        <div className="edit-subcategory-container">
            <h2>Edit Subcategory</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subcategory Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Subcategory Sequence:</label>
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

export default EditSubcategory;