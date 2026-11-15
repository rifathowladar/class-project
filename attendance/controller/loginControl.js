const User = require('../models/registerModel')
const transporter = require('../config/emailConfig')

const loginControl = async (req, res) => {
    try {
        let { email, password } = req.body
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send({
                message: "User not found"
            })
        }
        if (user.password !== password) {
            return res.status(400).send({
                message: "Wrong password"
            })
        }
        await transporter.sendMail({
            from: `"Example Team" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Login alert",
            html:`<body style="margin:0; padding:0; background:#f4f4f7; font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;"><tr><td align="center"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:550px; background:#ffffff; border-radius:12px; overflow:hidden;"><tr><td align="center" style="background:#2563eb; padding:30px 20px;"><h1 style="color:#ffffff; margin:0;">Example Team</h1><p style="color:#dbeafe; margin-bottom:0;">Account Security Notification<tr><td style="padding:35px 30px; color:#333333;"><h2 style="color:#2563eb; margin-top:0;">🔐 New Login Detected</h2><p style="font-size:15px; line-height:1.7;">Hello ,<p style="font-size:15px; line-height:1.7;">We noticed a successful login to your Example Team account.</p><table width="100%" cellpadding="12" cellspacing="0" style="background:#f8fafc; border-radius:8px;"><tr><td style="font-size:14px; color:#64748b;">Login Status<td align="right" style="color:#16a34a; font-weight:bold;">Successful<tr><td style="font-size:14px; color:#64748b;">Account Email<td align="right" style="font-size:14px;">${email}<tr><td style="font-size:14px; color:#64748b;">Login Time<td align="right" style="font-size:14px;">${new Date().toLocaleString()}</table><p style="font-size:14px; line-height:1.7; margin-top:25px;">If this was you, no action is required. If you don't recognize this activity, please change your password immediately.<p style="font-size:14px; color:#64748b;">Your account security is important to us.<p style="font-size:15px;">Best Regards,<br><strong>Example Team</strong><tr><td align="center" style="background:#f8fafc; padding:20px;"><p style="font-size:12px; color:#888888; margin:0;">© 2026 Example Team. All rights reserved.<p style="font-size:12px; color:#888888;">This is an automated security notification.</table></table>`
        })

        res.status(200).send({
            message: "Login successful"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports = loginControl