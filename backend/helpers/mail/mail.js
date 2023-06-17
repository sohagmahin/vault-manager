// import { Resend } from "resend";
const { Resend } = require("resend");
const { EmailTemplete } = require("./template");

const resend = new Resend(`${process.env.RESENT_API_KEY}`);
const SendMail = async (email, userName, resetLink) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Password Reset Link",
    // react: EmailTemplete({
    //   userName: userName,
    //   resetPasswordLink: resetLink,
    // }),
    html: `<p>HI <strong>${userName}</strong>! </br> <a href=${resetLink}>click here to reset password</a>
    </p>`,
  });
};

module.exports = { SendMail };
