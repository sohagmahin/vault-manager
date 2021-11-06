const express = require('express');
const router = express.Router();

const authCheck = require('../middleware/authCheck');
const {
    getAllCredential,
    getCredential,
    createCredential,
    updateCredential,
    deleteCredential } = require('../controller/passManagerController');

// GET all credential 
router.get('/all', authCheck, getAllCredential);

// GET single credential 
router.get('/:id', authCheck, getCredential);

// POST create credential 
router.post('/', authCheck, createCredential);

// PUT credential 
router.put('/:id', authCheck, updateCredential);

// DELETE credential 
router.delete('/:id', authCheck, deleteCredential);

module.exports = router;