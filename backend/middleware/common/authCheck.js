const jwt = require("jsonwebtoken");

const authCheck = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  try {
    const decoded = await jwt.verify(accessToken, process.env.JWT_SECRET);
    const { email, userId } = decoded;
    req.email = email;
    req.userId = userId;
    next();
  } catch (err) {
    // next("Authorization failed!");
    res.status(401).json({
      error: "Authorization failed!",
    });
  }
};

module.exports = authCheck;
