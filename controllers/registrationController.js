const router = require("express").Router();
const userSchema = require('../models/candidateModel');
const testSchema = require('../models/test_scoreModel');
router.post("/register", (req, res) => {
    try {
        console.log("===>", req.body);
        const user = new userSchema(req.body);
        console.log(user)
        user.save((err, user) => {
            if (err) {
                return res.json({ Success: false, message: "Internal server error.", error: err });
            } else {
                return res.json({ Success: true, message: "user registered.", result: user });
            }
        })
    } catch (error) {
        console.log("Ak", error)
        return res.json({ Success: false, message: "Something went wrong.", error: error });

    }
}),

    router.post('/addScore', (req, res) => {
        try {
            if (!req.body.candidateId  || !req.body.round) {
                return res.json({ Success: false, message: "Please provide required parameter." });
            }
            else {

                userSchema.findOne({ "_id": req.body.candidateId }, (err_, result_) => {
                    if (err_) {
                        return res.json({ Success: false, message: "Internal server error.", error: err_ });
                    } else if (!result_) {
                        return res.json({ Success: false, message: "User not found.", result: null });
                    }

                    else {


                        testSchema.findOne({ "candidateId": req.body.candidateId, round: req.body.round }, (err, result) => {
                            if (err) {
                                return res.json({ Sucaacess: false, message: "Internal server error.", error: err });
                            } else if (result) {
                                return res.json({ Success: false, message: "Candidate round already done." });
                            }
                            else {
                                const test = new testSchema({ candidateId: req.body.candidateId, round: req.body.round, score: req.body.score });
                                test.save((err, result) => {
                                    if (err) {
                                        return res.json({ Success: false, message: "Internal server error.", error: err });
                                    } else {
                                        return res.json({ Success: true, message: "test score added successfully.", result: result });
                                    }
                                })
                            }
                        })

                    }

                })
            }
        } catch (error) {
            return res.json({ Success: false, message: "Something went wrong.", error: error });
        }
    })


router.get('/highestScore', (req, res) => {
    try {
        testSchema.aggregate([
            {
                $lookup:
                {
                    from: "candidate",
                    localField: "candidateId",
                    foreignField: "_id",
                    as: "candidateDetails"
                }
            },
            {
                $group:
                {
                    _id: "$candidateId",
                    candidateDetails: {
                        $first: "$candidateDetails"
                    },
                    score: { $sum: "$score" },
                    count: { $sum: 1 }
                }
            },

            {
                $sort: {
                    'score': -1
                }
            },
            { $limit: 1 }

        ], (err, result) => {
            if (err) {
                return res.json({ Success: false, message: "Internal server error.", error: err });
            } else {
                return res.json({ Success: true, message: "Data found..", result: result });
            }
        });
    } catch (error) {
        return res.json({ Success: false, message: "Something went wrong.", error: error });
    }
});
module.exports = router;