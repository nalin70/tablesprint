import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import AddSubcategory from './components/AddSubcategory';
import EditSubcategory from './components/EditSubcategory';
import Subcategory from './components/Subcategory';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import ViewProduct from './components/ViewProduct';
import './App.css';

function App() {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchSubcategories();
        fetchProducts();
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

    const fetchSubcategories = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/subcategories');
            const data = await response.json();
            setSubcategories(data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    const updateCategory = (updatedCategory) => {
        setCategories(categories.map(category =>
            category.id === updatedCategory.id ? updatedCategory : category
        ));
    };

    const addSubcategory = (newSubcategory) => {
        setSubcategories([...subcategories, newSubcategory]);
    };

    const updateSubcategory = (updatedSubcategory) => {
        setSubcategories(subcategories.map(subcategory =>
            subcategory.id === updatedSubcategory.id ? updatedSubcategory : subcategory
        ));
    };

    const addProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={
                            <Dashboard
                                categories={categories}
                                subcategories={subcategories}
                                products={products}
                                setCategories={setCategories}
                                setSubcategories={setSubcategories}
                                setProducts={setProducts}
                                addCategory={addCategory}
                                updateCategory={updateCategory}
                                addSubcategory={addSubcategory}
                                updateSubcategory={updateSubcategory}
                            />
                        } />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/" element={<Login />} /> {/* Default route */}
                        <Route path="/add-category" element={<AddCategory addCategory={addCategory} />} />
                        <Route path="/edit-category/:id" element={<EditCategory categories={categories} updateCategory={updateCategory} />} />
                        <Route path="/add-subcategory" element={<AddSubcategory addSubcategory={addSubcategory} />} />
                        <Route path="/subcategory" element={<Subcategory subcategories={subcategories} />} />
                        <Route path="/edit-subcategory/:id" element={<EditSubcategory subcategories={subcategories} updateSubcategory={updateSubcategory} />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/add-product" element={<AddProduct addProduct={addProduct} />} />
                        <Route path="/view-product/:id" element={<ViewProduct />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;