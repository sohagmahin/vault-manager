const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { encryptData, decryptData } = require('../helpers/dataEncryption');
const credientialSchema = require('../schema/credentialSchema');
const Credential = mongoose.model('credential', credientialSchema);

// GET passmanager data
router.get('/all', async (req, res) => {

    try {
        const data = await Credential.find();
        res.status(200).json({
            data,
            message: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    // res.status(200).json({
    //     message: 'This is get'
    // })
});

// GET passmanager data
router.get('/:id', async (req, res) => {

    try {
        const data = await Credential.findOne({ _id: req.params.id });
        // data.password = decryptData(data.password);
        // console.log(decryptData(data.password));
        //console.log('encrypted data: ' + data.password);
        console.log('decrypted data : ' + decryptData(data.password));
        res.status(200).json({
            data,
            message: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    // res.status(200).json({
    //     message: 'This is get'
    // })
});

// POST passmanager data
router.post('/', async (req, res) => {

    // const enryptedPassword = encryptData(req.body.password);
    // console.log(enryptedPassword);
    let decrytedPassword = decryptData("U2FsdGVkX19YlOzi7418X666knmDM7eWR40pslfRWK0=");
    console.log(decrytedPassword);

    const credential = new Credential({
        ...req.body,
        // password: enryptedPassword
    });
    try {
        const data = await credential.save();
        res.status(200).json({
            data: data,
            message: 'Credential was inserted successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Credentail insertion failed!'
        });
    }
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