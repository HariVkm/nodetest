const { request, response } = require('express')
const user = require('../Model/Schema')
const router = require('express').Router()
// View Records From Db through Postman-Api
router.post('/view', async (req, res) => {
    console.log("Api View-Data", req.body);
    try {
        const findData = await user.findOne({ email: req.body.email, password: req.body.password })
        if (!findData) {
            return res.status(401).json("Email OR Password does'nt exist")
        }
        else {
            const msg = "Email & Password Found in the Database"
            res.status(200).json({ message: msg, email: req.body.email, password: req.body.password })
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})
module.exports = router