const User = require('../models/registerModel');

let attenUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        // let update = await Task.findByIdAndUpdate({_id: id}, req.body,{new: true});
         let update = await User.findByIdAndUpdate(
            id,
            { $set: { attendance: req.body } },
            { new: true }
        );
        res.sand(update)

    } catch (error) {
        res.status(500).send(error.message);
    }
}
module.exports = attenUpdate