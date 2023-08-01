// O Get one/all users
// O Create users
// O Update users
// O Delete users

const { userCreate, UserLogin, getUsers, updateUser, deleteUser } = require('../Controller/userController');
const { auth } = require('../Middleware/auth');


const router = require('express').Router();

router.post('/user', userCreate)
router.post('/Login', UserLogin)
router.get('/user',auth,getUsers)
router.put('/user/:userId', auth, updateUser)
router.delete('/user/:userId', auth, deleteUser);


module.exports = router