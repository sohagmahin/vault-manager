const express = require('express');
const router = express.Router();
const authCheck = require('../middleware/authCheck');

const {
    getAllUser,
    getUser,
    login,
    signup,
    deleteUser,
    updateUser } = require('../controller/userController');

// GET ALL USER
router.get('/all', authCheck, getAllUser);

// GET SINGLE USER
router.get('/:id', authCheck, getUser);

// POST LOGIN
router.post('/login', login);

// POST SIGNUP
router.post('/signup', signup);

// UPDATE USER
router.put('/:id', authCheck, updateUser);

// DELETE USER
router.delete('/:id', authCheck, deleteUser);

module.exports = router;