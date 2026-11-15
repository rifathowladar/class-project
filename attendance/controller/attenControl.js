const User = require('../models/registerModel');

let attenControl = async (req, res) => {
    try {
        const { id } = req.params;
        const { date } = req.body;

        const alreadyExists = await User.findOne({
            _id: id,
            "attendance.date": date
        });

        if (alreadyExists) {
            return res.send({
                message: "Attendance already exists"
            });
        }
        const user = await User.findById(id);
        user.attendance.push(req.body);
        await user.save();

        res.send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = attenControl