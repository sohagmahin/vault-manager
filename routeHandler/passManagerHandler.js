const express = require('express');
const router = express.Router();

// GET passmanager data
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'This is get'
    })
});

// POST passmanager data
router.post('/', (req, res) => {
    res.status(200).json({
        message: 'This is post'
    })
});

// PUT passmanager data
router.put('/', (req, res) => {
    res.status(200).json({
        message: 'This is put'
    })
});

// PATCH passmanager data
router.patch('/', (req, res) => {
    res.status(200).json({
        message: 'This is patch'
    })
});

// DELETE passmanager data
router.delete('/', (req, res) => {
    res.status(200).json({
        message: 'This is delete'
    })
});

module.exports = router;