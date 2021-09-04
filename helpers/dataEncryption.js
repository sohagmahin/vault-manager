const CryptoJS = require('crypto-js');
const secretKey = 'sohag123456';

const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
    return encryptedData;
}

const decryptData = (encriptedData) => {
    const bytes = CryptoJS.AES.decrypt(encriptedData, secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

module.exports = { encryptData, decryptData };