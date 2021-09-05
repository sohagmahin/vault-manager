const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

// bcrypt saltroutnds
const saltRounds = 10;

const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, process.env.CREDENTIAL_SECRET_KEY).toString();
    return encryptedData;
}

const decryptData = (encriptedData) => {
    const bytes = CryptoJS.AES.decrypt(encriptedData, process.env.CREDENTIAL_SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}


const createHash = async (data) => {
    return await bcrypt.hash(data, 10);
}

const compareHash = async (plainText, hash) => {
    return await bcrypt.compare(plainText, hash);
}


module.exports = { encryptData, decryptData, createHash, compareHash };