const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, checkRole('user'), usersRouter);


server.get("/", (req, res) => {
    res.send('Server is working')
})

module.exports = server;



function checkRole(param){
    return (req, res, next) => {
        if(
            req.decodedToken &&
            req.decodedToken.role &&
            req.decodedToken.role.toLowerCase() === param
        ){
            next()
        } else{
            res.status(403).json({warning: 'You will not enter'})
        }
    }
    }
