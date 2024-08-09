const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Yashkulk0987@#'

//create a user
router.post('/createuser', [
    body('name', 'Please enter a valid name').isLength({ min: 3 }),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors return bad request and the errors
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }
    // check if same email exists

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists' })
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })

        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authTocken = jwt.sign(data, JWT_SECRET);

        res.json({success, authTocken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }

})

//login user 

router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    const result = validationResult(req);
    let success = false;
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    const { email, password } = req.body;
    const generateToken = (user) => {
        const payload = {
            user: {
                id: user.id
            }
        };
        return jwt.sign(payload, JWT_SECRET);
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please enter correct credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json({ error: "Please enter correct credentials" });
        }

        success = true
        const token = generateToken(user);

        res.json({success , token  })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }

})

//get user details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('User ID from token:', userId); // Debugging: Check the user ID
        const user = await User.findById(userId).select("-password");
        console.log('Fetched user:', user); // Debugging: Check the fetched user
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error.message); // Debugging: Log the error
        res.status(500).send("Some error occurred");
    }
});




module.exports = router