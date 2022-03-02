const router = require('express').Router()
const User = require('../model/User')
const { registerValidation, loginValidation } = require('../config/validation')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res)=>{

    //LETS VALIDATE THE DATA
    
    const { error } = registerValidation(req.body)
    
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the databas
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exist')

    //Hash Passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    
    try{

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        res.status(200).send({user: user._id})

    } catch (err){
        res.status(400).send(err)
    }
})
    

router.post('/login', async (req, res)=>{
    
    
    //LETS VALIDATE THE DATA
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the databas
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Email or Password is Wrong!')

    //Password is Correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    //Create and assign a token

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
    

})



module.exports = router
