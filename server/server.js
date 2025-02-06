const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'nalin',
    database: 'projects'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
    }
    console.log('MySQL connected...');
});

// Create a new user
app.post('/register', (req, res) => {
    const { loginId, password } = req.body;
    console.log('Request body:', req.body); // Debugging statement
    console.log('loginId:', loginId); // Debugging statement
    console.log('password:', password); // Debugging statement

    if (!loginId || !password) {
        return res.status(400).send('loginId and password are required');
    }

    const sql = 'INSERT INTO users (loginId, password) VALUES (?, ?)';
    db.query(sql, [loginId, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }
        res.send('User registered successfully');
    });
});

// Fetch categories
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching categories:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Add a new category
app.post('/api/categories', upload.single('image'), (req, res) => {
    const { name, sequence } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const status = 'Active'; // Default value for status
    const sql = 'INSERT INTO category (name, sequence, image, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, sequence, image, status], (err, result) => {
        if (err) {
            console.error('Error adding category:', err);
            return res.status(500).send(err);
        }
        res.send('Category added successfully');
    });
});

// Update a category
app.put('/api/categories/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, sequence, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    console.log('Updating category:', { id, name, sequence, image, status }); // Debugging statement
    const sql = 'UPDATE category SET name = ?, sequence = ?, image = ?, status = ? WHERE id = ?';
    db.query(sql, [name, sequence, image, status, id], (err, result) => {
        if (err) {
            console.error('Error updating category:', err);
            return res.status(500).send(err);
        }
        res.json({ id, name, sequence, image, status });
    });
});

// Delete a category
app.delete('/api/categories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM category WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting category:', err);
            return res.status(500).send(err);
        }
        res.send('Category deleted successfully');
    });
});


// Add these endpoints to your existing server.js file
// Fetch subcategories
app.get('/api/subcategories', (req, res) => {
    const sql = 'SELECT * FROM subcategory';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching subcategories:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Add a new subcategory
app.post('/api/subcategories', upload.single('image'), (req, res) => {
    const { categoryId, name, sequence } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    const status = 'Active'; // Default value for status
    console.log('Adding subcategory:', { categoryId, name, sequence, image, status }); // Debugging statement
    const sql = 'INSERT INTO subcategory (categoryId, name, sequence, image, status) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [categoryId, name, sequence, image, status], (err, result) => {
        if (err) {
            console.error('Error adding subcategory:', err);
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, categoryId, name, sequence, image, status });
    });
});

// Update a subcategory
app.put('/api/subcategories/:id', upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, sequence, status } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    console.log('Updating subcategory:', { id, name, sequence, image, status }); // Debugging statement
    const sql = 'UPDATE subcategory SET name = ?, sequence = ?, image = ?, status = ? WHERE id = ?';
    db.query(sql, [name, sequence, image, status, id], (err, result) => {
        if (err) {
            console.error('Error updating subcategory:', err);
            return res.status(500).send(err);
        }
        res.json({ id, name, sequence, image, status });
    });
});

// Delete a subcategory
app.delete('/api/subcategories/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM subcategory WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting subcategory:', err);
            return res.status(500).send(err);
        }
        res.send('Subcategory deleted successfully');
    });
});


// Add these endpoints to your existing server.js file

// Fetch products
app.get('/api/products', (req, res) => {
    const sql = `
        SELECT p.id, p.name, p.status, s.name AS subcategoryName, c.name AS categoryName
        FROM product p
        JOIN subcategory s ON p.subcategoryId = s.id
        JOIN category c ON s.categoryId = c.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Fetch a single product
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT p.id, p.name, p.status, s.name AS subcategoryName, c.name AS categoryName
        FROM product p
        JOIN subcategory s ON p.subcategoryId = s.id
        JOIN category c ON s.categoryId = c.id
        WHERE p.id = ?
    `;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send(err);
        }
        res.json(results[0]);
    });
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { categoryId, subcategoryId, name, status } = req.body;
    const sql = 'INSERT INTO product (categoryId, subcategoryId, name, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [categoryId, subcategoryId, name, status], (err, result) => {
        if (err) {
            console.error('Error adding product:', err);
            return res.status(500).send(err);
        }
        res.json({ id: result.insertId, categoryId, subcategoryId, name, status });
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM product WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).send(err);
        }
        res.send('Product deleted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});