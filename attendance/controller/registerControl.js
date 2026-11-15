const User = require('../models/registerModel')
const transporter = require('../config/emailConfig')

const registerControl = async (req, res) => {
    try {
        let { name, email, password, roll } = req.body

        let existingMail = await User.findOne({email: email})
        if (existingMail) {
            return res.send("This email is already registered")
        }

        let user = await new User({
            name,
            email,
            password,
            roll
        }).save()
        await transporter.sendMail({
            from: `"Example Team" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Registration successful",
            html:`<body style="margin:0; padding:0; background-color:#f4f4f7; font-family:Arial, sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;"><tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px; background:#ffffff; border-radius:12px; overflow:hidden;"><tr><td align="center" style="background:#2563eb; padding:30px 20px;"><h1 style="color:#ffffff; margin:0; font-size:26px;">Example Team</h1><p style="color:#dbeafe; margin:10px 0 0;">Welcome to our community!<tr><td style="padding:35px 30px; color:#333333;"><h2 style="color:#16a34a; margin-top:0;">🎉 Registration Successful!</h2><p style="font-size:15px; line-height:1.7;">Hello,<p style="font-size:15px; line-height:1.7;">Congratulations! Your account has been successfully created. We are happy to have you with us.<p style="font-size:15px; line-height:1.7;">You can now log in to your account and explore our services.</p><table cellpadding="0" cellspacing="0" style="margin:25px 0;"><tr><td align="center" bgcolor="#2563eb" style="border-radius:6px;"><a href="https://example.com/login" style="display:inline-block; padding:14px 30px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">Login to Your Account</a></table><p style="font-size:14px; color:#666666; line-height:1.7;">If you did not create this account, please contact our support team.<p style="font-size:15px; margin-bottom:0;">Best Regards,<br><strong>Example Team</strong><tr><td align="center" style="background:#f8fafc; padding:20px;"><p style="font-size:12px; color:#888888; margin:0;">© 2026 Example Team. All rights reserved.<p style="font-size:12px; color:#888888;">This is an automated email. Please do not reply.</table></table>`
        })
        res.status(200).send({
            success: true,
            message: "Registration successful",
            data: user
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = registerControl
