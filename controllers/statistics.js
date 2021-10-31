// Require Own Modules
const UserModel = require("../models/Users");

const saveResult = async (req, res) => {
    try {
        const { _id }          = res.locals.token;
        const { type, userId } = req.params;

        if (_id != userId) {
            return res.status(403).send({ err : "You can only update your own results" });
        }

        const user = await UserModel.findOne({ _id : userId }).exec();

        if (!user) {
            return res.status(404).send({ err : "User not found" });
        }

        const { score } = req.body;
        const parseNumber = value => !isNaN(parseFloat(value)) ? parseFloat(value) : 0;

        const total   = parseNumber(user[type].total) + 1;
        const best    = parseNumber(user[type].best);
        const average = parseNumber(user[type].average);
  
        user[type].total   = total;
        if ( type === "cards") {
            user[type].best = score < best ? score : best
        } else {
            user[type].best = score > best ? score : best
        }
        user[type].average = total > 0 ? parseNumber((average + score) / total) : score;

        await user.save();

        return res.status(200).send("ok");
    } catch (err) {
        console.error("[StatisticsController.saveResult] ", err);

        return res.status(500).send({ err : "Couldn't save results" });
    }
};

const getStatistics = async (req, res) => {
    try {
        const { type } = req.params;

        

    } catch (err) {
        console.error("[StatisticsController.getStatistics] ", err);

        return res.status(500).send({ err : "Couldn't get statistics" });
    }
};

module.exports = {
    saveResult,
    getStatistics,
};
