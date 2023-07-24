const CryptoJS = require("crypto-js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

// bcrypt saltroutnds
const saltRounds = 10;

const encryptData = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    data,
    process.env.CREDENTIAL_SECRET_KEY
  ).toString();
  return encryptedData;
};

const decryptData = (encriptedData) => {
  const bytes = CryptoJS.AES.decrypt(
    encriptedData,
    process.env.CREDENTIAL_SECRET_KEY
  );
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

const createHash = async (data) => {
  return await bcrypt.hash(data, 10);
};

const compareHash = async (plainText, hash) => {
  return await bcrypt.compare(plainText, hash);
};

// Generate token
const generateToken = async (user) => {
  const token = await jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

const generateRandomString = () => {
  // return crypto.randomBytes(32).toString("hex");
  return CryptoJS.lib.WordArray.random(32).toString();
};

module.exports = {
  encryptData,
  decryptData,
  createHash,
  compareHash,
  generateToken,
  generateRandomString,
};
