import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import './ViewProduct.css';

const ViewProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProduct = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`);
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <div className="view-product-container">
            {product ? (
                <div>
                    <h2>View Product</h2>
                    <p><strong>ID:</strong> {product.id}</p>
                    <p><strong>Product Name:</strong> {product.name}</p>
                    <p><strong>Subcategory:</strong> {product.subcategoryName}</p>
                    <p><strong>Category:</strong> {product.categoryName}</p>
                    <p><strong>Status:</strong> {product.status}</p>
                    <button onClick={() => navigate('/product')}>Back to Products</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewProduct;