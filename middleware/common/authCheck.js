const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  try {
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (err) {
    next("Authorization failed!");
  }
};

module.exports = authCheck;
