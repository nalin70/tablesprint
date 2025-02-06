import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddSubcategory.css';

const AddSubcategory = ({ addSubcategory }) => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [sequence, setSequence] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryId', categoryId);
        formData.append('name', name);
        formData.append('sequence', sequence);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/subcategories', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const newSubcategory = await response.json();
                addSubcategory(newSubcategory);
                alert('Subcategory added successfully');
                navigate('/subcategory');
            } else {
                alert('Failed to add subcategory');
            }
        } catch (error) {
            console.error('Error adding subcategory:', error);
            alert('Failed to add subcategory');
        }
    };

    return (
        <div className="add-subcategory-container">
            <h2>Add Subcategory</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category:</label>
                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
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
                        required
                    />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default AddSubcategory;