const router = require('express').Router()

const Users = require('./user-model')
const restricted = require('../auth/authenticate-middleware')

router.get('/', restricted, (req, res) =>{
    Users.find()
    .then(param => {
        res.status(200).json(param)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})


module.exports = router
