import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import './Product.css';

const Product = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAdd = () => {
        navigate('/add-product');
    };

    const handleView = (id) => {
        navigate(`/view-product/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProducts(products.filter(product => product.id !== id));
                alert('Product deleted successfully');
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-container">
            <div className="top-bar">
                <button className="home-button" onClick={() => navigate('/dashboard')}>Home</button>
            </div>
            <div className="search-add-container">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button onClick={handleAdd}>Add Product</button>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Subcategory</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.subcategoryName}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.status}</td>
                            <td>
                                <button onClick={() => handleView(product.id)}>View</button>
                                <button onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Routes>
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/view-product/:id" element={<ViewProduct />} />
            </Routes>
        </div>
    );
};

export default Product;