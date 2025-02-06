// import React, { useState, useEffect } from 'react';
// import { useNavigate, Route, Routes } from 'react-router-dom';
// import AddCategory from './AddCategory';
// import EditCategory from './EditCategory';
// import AddSubcategory from './AddSubcategory';
// import EditSubcategory from './EditSubcategory';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [categories, setCategories] = useState([]);
//     const [subcategories, setSubcategories] = useState([]);
//     const [activeSection, setActiveSection] = useState('home');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchCategories();
//         fetchSubcategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/categories');
//             const data = await response.json();
//             setCategories(data);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     };

//     const fetchSubcategories = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/subcategories');
//             const data = await response.json();
//             setSubcategories(data);
//         } catch (error) {
//             console.error('Error fetching subcategories:', error);
//             setSubcategories([]); // Ensure subcategories is an array even if the fetch fails
//         }
//     };

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleAddCategory = () => {
//         navigate('/add-category');
//     };

//     const handleAddSubcategory = () => {
//         navigate('/add-subcategory');
//     };

//     const handleEditCategory = (id) => {
//         navigate(`/edit-category/${id}`);
//     };

//     const handleEditSubcategory = (id) => {
//         navigate(`/edit-subcategory/${id}`);
//     };

//     const handleDeleteCategory = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 setCategories(categories.filter(category => category.id !== id));
//                 alert('Category deleted successfully');
//             } else {
//                 alert('Failed to delete category');
//             }
//         } catch (error) {
//             console.error('Error deleting category:', error);
//             alert('Failed to delete category');
//         }
//     };

//     const handleDeleteSubcategory = async (id) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/subcategories/${id}`, {
//                 method: 'DELETE'
//             });

//             if (response.ok) {
//                 setSubcategories(subcategories.filter(subcategory => subcategory.id !== id));
//                 alert('Subcategory deleted successfully');
//             } else {
//                 alert('Failed to delete subcategory');
//             }
//         } catch (error) {
//             console.error('Error deleting subcategory:', error);
//             alert('Failed to delete subcategory');
//         }
//     };

//     const handleLogout = () => {
//         alert('Logged out');
//         navigate('/login');
//     };

//     const addCategory = (newCategory) => {
//         setCategories([...categories, newCategory]);
//     };

//     const updateCategory = (updatedCategory) => {
//         setCategories(categories.map(category =>
//             category.id === updatedCategory.id ? updatedCategory : category
//         ));
//     };

//     const addSubcategory = (newSubcategory) => {
//         setSubcategories([...subcategories, newSubcategory]);
//     };

//     const updateSubcategory = (updatedSubcategory) => {
//         setSubcategories(subcategories.map(subcategory =>
//             subcategory.id === updatedSubcategory.id ? updatedSubcategory : subcategory
//         ));
//     };

//     const filteredCategories = categories.filter(category =>
//         category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const filteredSubcategories = subcategories.filter(subcategory =>
//         subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="dashboard">
//             <div className="sidebar">
//                 <ul>
//                     <li onClick={() => setActiveSection('home')}>Dashboard Home</li>
//                     <li onClick={() => setActiveSection('category')}>Category</li>
//                     <li onClick={() => setActiveSection('subcategory')}>Subcategory</li>
//                     <li>Products</li>
//                 </ul>
//             </div>
//             <div className="main-content">
//                 <div className="top-bar">
//                     <button className="logout-button" onClick={handleLogout}>Log Out</button>
//                 </div>
//                 <div className="content">
//                     {activeSection === 'home' && (
//                         <div>
//                             <h2>Welcome to the Dashboard</h2>
//                         </div>
//                     )}
//                     {activeSection === 'category' && (
//                         <div className="category-container">
//                             <div className="search-add-container">
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchTerm}
//                                     onChange={handleSearch}
//                                 />
//                                 <button onClick={handleAddCategory}>Add</button>
//                             </div>
//                             <table className="category-table">
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Category Name</th>
//                                         <th>Image</th>
//                                         <th>Status</th>
//                                         <th>Sequence</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredCategories.map(category => (
//                                         <tr key={category.id}>
//                                             <td>{category.id}</td>
//                                             <td>{category.name}</td>
//                                             <td><img src={`http://localhost:5000${category.image}`} alt={category.name} width="50" /></td>
//                                             <td>{category.status}</td>
//                                             <td>{category.sequence}</td>
//                                             <td>
//                                                 <button onClick={() => handleEditCategory(category.id)}>Edit</button>
//                                                 <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                     {activeSection === 'subcategory' && (
//                         <div className="subcategory-container">
//                             <div className="search-add-container">
//                                 <input
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchTerm}
//                                     onChange={handleSearch}
//                                 />
//                                 <button onClick={handleAddSubcategory}>Add</button>
//                             </div>
//                             <table className="subcategory-table">
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Subcategory Name</th>
//                                         <th>Image</th>
//                                         <th>Status</th>
//                                         <th>Sequence</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredSubcategories.map(subcategory => (
//                                         <tr key={subcategory.id}>
//                                             <td>{subcategory.id}</td>
//                                             <td>{subcategory.name}</td>
//                                             <td><img src={`http://localhost:5000${subcategory.image}`} alt={subcategory.name} width="50" /></td>
//                                             <td>{subcategory.status}</td>
//                                             <td>{subcategory.sequence}</td>
//                                             <td>
//                                                 <button onClick={() => handleEditSubcategory(subcategory.id)}>Edit</button>
//                                                 <button onClick={() => handleDeleteSubcategory(subcategory.id)}>Delete</button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <Routes>
//                 <Route path="/add-category" element={<AddCategory addCategory={addCategory} />} />
//                 <Route path="/edit-category/:id" element={<EditCategory categories={categories} updateCategory={updateCategory} />} />
//                 <Route path="/add-subcategory" element={<AddSubcategory addSubcategory={addSubcategory} />} />
//                 <Route path="/edit-subcategory/:id" element={<EditSubcategory subcategories={subcategories} updateSubcategory={updateSubcategory} />} />
//             </Routes>
//         </div>
//     );
// };

// export default Dashboard;

import React, { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import AddCategory from './AddCategory';
import EditCategory from './EditCategory';
import AddSubcategory from './AddSubcategory';
import EditSubcategory from './EditSubcategory';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import './Dashboard.css';

const Dashboard = ({
    categories,
    subcategories,
    products,
    setCategories,
    setSubcategories,
    setProducts,
    addCategory,
    updateCategory,
    addSubcategory,
    updateSubcategory
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddCategory = () => {
        navigate('/add-category');
    };

    const handleAddSubcategory = () => {
        navigate('/add-subcategory');
    };

    const handleAddProduct = () => {
        navigate('/add-product');
    };

    const handleEditCategory = (id) => {
        navigate(`/edit-category/${id}`);
    };

    const handleEditSubcategory = (id) => {
        navigate(`/edit-subcategory/${id}`);
    };

    const handleViewProduct = (id) => {
        navigate(`/view-product/${id}`);
    };

    const handleDeleteCategory = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/categories/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setCategories(categories.filter(category => category.id !== id));
                alert('Category deleted successfully');
            } else {
                alert('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    const handleDeleteSubcategory = async (id) => {
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

    const handleDeleteProduct = async (id) => {
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

    const handleLogout = () => {
        alert('Logged out');
        navigate('/login');
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredSubcategories = subcategories.filter(subcategory =>
        subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="dashboard">
            <div className="sidebar">
                <ul>
                    <li onClick={() => setActiveSection('home')}>Dashboard Home</li>
                    <li onClick={() => setActiveSection('category')}>Category</li>
                    <li onClick={() => setActiveSection('subcategory')}>Subcategory</li>
                    <li onClick={() => setActiveSection('product')}>Products</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="top-bar">
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
                <div className="content">
                    {activeSection === 'home' && (
                        <div>
                            <h2>Welcome to the Dashboard</h2>
                        </div>
                    )}
                    {activeSection === 'category' && (
                        <div className="category-container">
                            <div className="search-add-container">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button onClick={handleAddCategory}>Add</button>
                            </div>
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Category Name</th>
                                        <th>Image</th>
                                        <th>Status</th>
                                        <th>Sequence</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map(category => (
                                        <tr key={category.id}>
                                            <td>{category.id}</td>
                                            <td>{category.name}</td>
                                            <td><img src={`http://localhost:5000${category.image}`} alt={category.name} width="50" /></td>
                                            <td>{category.status}</td>
                                            <td>{category.sequence}</td>
                                            <td>
                                                <button onClick={() => handleEditCategory(category.id)}>Edit</button>
                                                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSection === 'subcategory' && (
                        <div className="subcategory-container">
                            <div className="search-add-container">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button onClick={handleAddSubcategory}>Add</button>
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
                                                <button onClick={() => handleEditSubcategory(subcategory.id)}>Edit</button>
                                                <button onClick={() => handleDeleteSubcategory(subcategory.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeSection === 'product' && (
                        <div className="product-container">
                            <div className="search-add-container">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                <button onClick={handleAddProduct}>Add</button>
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
                                                <button onClick={() => handleViewProduct(product.id)}>View</button>
                                                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <Routes>
                <Route path="/add-category" element={<AddCategory addCategory={addCategory} />} />
                <Route path="/edit-category/:id" element={<EditCategory categories={categories} updateCategory={updateCategory} />} />
                <Route path="/add-subcategory" element={<AddSubcategory addSubcategory={addSubcategory} />} />
                <Route path="/edit-subcategory/:id" element={<EditSubcategory subcategories={subcategories} updateSubcategory={updateSubcategory} />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/view-product/:id" element={<ViewProduct />} />
            </Routes>
        </div>
    );
};

export default Dashboard;