const CryptoJS = require('crypto-js');

const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, process.env.CREDENTIAL_SECRET_KEY).toString();
    return encryptedData;
}

const decryptData = (encriptedData) => {
    const bytes = CryptoJS.AES.decrypt(encriptedData, process.env.CREDENTIAL_SECRET_KEY);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

module.exports = { encryptData, decryptData };