const User = require("../model/userModel");
const Token = require("../model/tokenModel");
// const SendMail = require("../helper/sendMail");
const {
  generateRandomString,
  createHash,
} = require("../helpers/dataEncryption");

//prepare passsword link and send the link to user email.
const forgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    //lookup the user
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: `${email} doesn't exist!`,
      });
    }

    //lookup token
    let token = await Token.findOne({ userId: user._id });

    //generate new token
    if (!token) {
      let newToken = new Token({
        userId: user._id,
        token: generateRandomString(),
      });

      token = await newToken.save();
    }

    //generate password reset link
    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

    //link send to mail

    // await SendMail(
    //   `${user.email}`,
    //   "Reset Password link",
    //   `Plese click link below to reset password. ${link}`
    // );

    return res.status(200).json({
      message: "Reset link was sended. Please check your inbox!",
    });
  } catch (err) {
    res.send("An error occured!");
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const tokenParam = req.params.token;
    const newPassword = req.body.password;

    //lookup user
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Link!",
      });
    }

    //lookup token
    const token = await Token.findOne({
      userId: userId,
      token: tokenParam,
    });

    if (!token) {
      return res.status(400).json({
        message: "Invalid Link!",
      });
    }

    //add new password
    user.password = await createHash(newPassword);
    await user.save();
    await token.delete();

    //response success message
    res.status(201).json({
      message: "Password reset successfully!",
    });
  } catch (err) {
    res.send("An error accured!");
  }
};

module.exports = {
  forgetPassword,
  resetPassword,
};
