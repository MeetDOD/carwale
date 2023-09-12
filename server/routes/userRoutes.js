const express = require('express');
const {registerUser,loginUser,test,adminAuth} = require('../controllers/userControllers');
const {requireLogin,isAdmin} = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);

router.get('/user-auth',requireLogin, (req,res) => {
    res.status(200).send({ok:true})
})

router.get('/admin-auth',requireLogin,isAdmin, (req,res) => {
    res.status(200).send({ok:true})
})

module.exports = router