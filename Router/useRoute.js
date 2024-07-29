const router = require('express').Router()
const { db } = require('../Model/Schema')
const user = require('../Model/Schema')

//Adding Records to Mongodb through Postman-Api
router.post('/postdata', async (request, response) => {
    console.log(request.body);
    try {
        const newuser = new user({
            username: request.body.name,
            password: request.body.password,
            ...request.body
        })
        const saveUser = await newuser.save()
        console.log("Database Save values", saveUser);
        const msg = "Record Successfully Inserted to Database"
        response.status(200).json({ success: saveUser._id, message: msg })
    }
    catch (error) {
        response.status(500).json(error.message)
    }
})

//Deleting Records from  Mongodb through Postman-Api
router.delete('/deleteData/:id', async (request, response) => {
    console.log("Deleting Record Api View", request.params.id);
    try {
        await user.findByIdAndDelete(request.params.id)
        const delmsg = "Record Deleted Successfully"
        response.status(200).json({ message: delmsg })
    }
    catch (error) {
        response.status(500).json(error.message)
    }
})
//Updating  Records  In the  Mongodb through Postman-Api
router.put('/updateData/:id', async (request, response) => {
    console.log("Update Record View", request.body);
    try {
        const updatedData = await user.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.name,
                password: request.body.password,
                ...request.body
            }
        }, { new: true })
        response.status(200).json({ message: "Record Updated Successfully", Success: updatedData, })
    }
    catch (error) {
        response.status(500).json(error.message)
    }
})
module.exports = router