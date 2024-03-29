const User = require("../model/userModel");
const Token = require("../model/tokenModel");
const { SendMail } = require("../helpers/mail/mail");
const {
  generateRandomString,
  createHash,
} = require("../helpers/dataEncryption");

//prepare passsword link and send the link to user email.
const forgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    //lookup the user
    // const user = await User.findOne({ email: email });
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: `${email} doesn't exist!`,
      });
    }

    //lookup token
    let token = await Token.findOne({ userId: user._id });
    console.log(token);

    //generate new token
    if (!token) {
      console.log("inside new token");
      let newToken = new Token({
        userId: user._id,
        token: generateRandomString(),
      });

      console.log(newToken);

      token = await newToken.save();
    }

    //generate password reset link
    const url = process.env.FRONTEND_URL || "http://localhost";
    const link = `${url}/password-reset/` + user?._id + "/" + token?.token;
    //link send to mail
    // email, userName, resetLink, id
    await SendMail(`${user.email}`, `${user.name}`, `${link}`);

    return res.status(200).json({
      message: "Reset link was sended. Please check your inbox!",
      link: link,
    });
  } catch (err) {
    console.log(err);
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

// const validateToken = async (req, res, next) => {
//   try {
//     const tokenParam = req.params.token;
//     const userId = req.params.userId;
//     //lookup user
//     const user = await User.findById({ _id: userId });

//     if (!user) {
//       return res.status(400).json({
//         valid: false,
//         message: "Invalid Link!",
//       });
//     }

//     //lookup token
//     const token = await Token.findOne({
//       token: tokenParam,
//     });

//     if (token) {
//       const url = process.env.FRONTEND_URL || "localhost";
//       res
//         .status(301)
//         .redirect(`http://${url}/password-reset/` + userId + "/" + tokenParam);
//     } else {
//       return res.status(400).json({
//         valid: false,
//         message: "Invalid Link!",
//       });
//     }
//   } catch (err) {
//     res.send("An error occured!");
//   }
// };

module.exports = {
  forgetPassword,
  resetPassword,
  // validateToken,
};
