const crypto = require('crypto');

const algorithm = "aes-192-cbc";
// generate 16 bytes of random data
const initVector = new Uint8Array(crypto.randomBytes(16), 'utf8');
// secret key generate 32 bytes of random data
// const Securitykey = crypto.randomBytes(32);
var password = "Hello darkness";
const Securitykey = crypto.scryptSync(password, 'salt', 24);
// const Securitykey = crypto.generateKey

const encryptData = (data) => {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    // console.log(initVector);
    // console.log(initVector.toString());
    // console.log(Uint8Array.from(initVector.toString()));
    // return { encryptedData, initVector };
    return encryptedData;
    // console.log("Encrypted message:" + encryptedData);
}

const decryptData = (hash) => {
    // the decipher function
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(hash, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
    // console.log("Decrypted message: " + decryptedData);
}

module.exports = { encryptData, decryptData };