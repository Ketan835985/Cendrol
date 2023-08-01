// O Get one/all users
// O Create users
// O Update users
// O Delete users

const { userCreate, UserLogin, getUsers, updateUser, deleteUser } = require('../Controller/userController');
const { auth } = require('../Middleware/auth');


const router = require('express').Router();

router.post('/createUser', userCreate)
router.post('/Login', UserLogin)
router.get('/allUsers',auth,getUsers)
router.put('/updateUser/:userId', auth, updateUser)
router.delete('/deleteUser/:userId', auth, deleteUser);


module.exports = router