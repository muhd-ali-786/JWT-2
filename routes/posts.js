const router = require('express').Router()
const verify = require('../config/verifyToken')



router.get('/', verify,(req, res) => {

    res.json(req.user)
   
})


module.exports = router
