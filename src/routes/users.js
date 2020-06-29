const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const AuthController = require('../controllers/Authcontroller')


router.get('/', (req, res) => {
    res.render('users/index')
})


router.post('/', AuthController.login)
    //  async(req, res) => {

//     const { uemail, upassword } = req.body;
//     if (uemail == undefined || upassword == undefined) {
//         res.status(500).send({ error: "authenication failed" });
//     }
//     const user = await User.find({ email: `${uemail}` }).limit(6).exec()
//     if (user == null) {
//         return res.status(400).send('Cannot find user')
//     }
//     //const user = users.find(user => user.name === req.body.name)

//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             //res.send('Success')
//             res.render('/index')
//         } else {
//             //res.send('Not Allowed')
//             res.render('users/index', {
//                 errorMessage: 'Login failed'
//             })
//         }
//     } catch {
//         res.status(500).send()
//     }
// })
router.get('/signup', (req, res) => {
        res.render('users/register')
    })
    //create user route
router.post('/signup', async(req, res) => {

    const { fname, lname, uemail, uphone, pwd, cpwd, uaddress, ugender, udob, role } = req.body;

    const hashedPassword = await bcrypt.hash(req.body.pwd, 10)

    const user = new User({
        firstName: `${fname}`,
        lastName: `${lname}`,
        email: `${uemail}`,
        phone: `${uphone}`,
        password: `${hashedPassword}`,
        address: `${uaddress}`,
        gender: `${ugender}`,
        dob: `${udob}`,
        role: `${role}`
    })
    try {
        const newUser = await user.save()
        res.render('users/index')

    } catch {
        res.render('auths/register', {
            errorMessage: 'Error in creating new User'
        })
    }
})

module.exports = router
    // (err, doc) => {
    //     if (err) return console.error(err);
    //     console.log("Document inserted succussfully!");
    // }/*
    // if (req.body.uemail == undefined || req.body.upassword == undefined) {
    //     res.status(500).send({ error: "authenication failed" });
    // }
    // const { fname, lname, uemail, uphone, pwd, cpwd, uaddress, ugender, udob, role } = req.body;
    // res.send(`${fname} ${lname} ${uemail} ${uphone} ${pwd} ${cpwd} ${uaddress} ${ugender} ${udob} ${role}`)
    // const user = new User({
    //         firstName: req.body.fname,
    //         lastName: req.body.lname,
    //         email: req.body.uemail,
    //         phone: req.body.uphone,
    //         password: req.body.pwd,
    //         address: req.body.uaddress,
    //         gender: req.body.ugender,
    //         dob: req.body.udob,
    //         role: req.body.role
    //     })
    // res.send(`${user}`)*/