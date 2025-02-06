import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AddSubcategory from './AddSubcategory';
import EditSubcategory from './EditSubcategory';
import './Subcategory.css';

const Subcategory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubcategories();
    }, []);

    const fetchSubcategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/subcategories');
            const data = await response.json();
            setSubcategories(data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAdd = () => {
        navigate('/add-subcategory');
    };

    const handleEdit = (id) => {
        navigate(`/edit-subcategory/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/subcategories/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setSubcategories(subcategories.filter(subcategory => subcategory.id !== id));
                alert('Subcategory deleted successfully');
            } else {
                alert('Failed to delete subcategory');
            }
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            alert('Failed to delete subcategory');
        }
    };

    const addSubcategory = (newSubcategory) => {
        setSubcategories([...subcategories, newSubcategory]);
    };

    const updateSubcategory = (updatedSubcategory) => {
        setSubcategories(subcategories.map(subcategory =>
            subcategory.id === updatedSubcategory.id ? updatedSubcategory : subcategory
        ));
    };

    const filteredSubcategories = subcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="subcategory-container">
            <div className="search-add-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
            <table className="subcategory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category</th>
                        <th>Subcategory Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Sequence</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSubcategories.map(subcategory => (
                        <tr key={subcategory.id}>
                            <td>{subcategory.id}</td>
                            <td>{subcategory.categoryId}</td>
                            <td>{subcategory.name}</td>
                            <td><img src={`http://localhost:5000${subcategory.image}`} alt={subcategory.name} width="50" /></td>
                            <td>{subcategory.status}</td>
                            <td>{subcategory.sequence}</td>
                            <td>
                                <button onClick={() => handleEdit(subcategory.id)}>Edit</button>
                                <button onClick={() => handleDelete(subcategory.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Routes>
                <Route path="/add-subcategory" element={<AddSubcategory addSubcategory={addSubcategory} />} />
                <Route path="/edit-subcategory/:id" element={<EditSubcategory subcategories={subcategories} updateSubcategory={updateSubcategory} />} />
            </Routes>
        </div>
    );
};

export default Subcategory;