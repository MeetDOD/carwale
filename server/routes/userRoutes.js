const express = require('express');
const {registerUser,loginUser,test,adminAuth,myOrders,getAllOrdersController,orderStatusController,updateProfile} = require('../controllers/userControllers');
const {requireLogin,isAdmin} = require('../middleware/authMiddleware');

const router = express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.put('/profileUpdate',requireLogin,updateProfile);

router.get('/user-auth',requireLogin, (req,res) => {
    res.status(200).send({ok:true})
})

router.get('/admin-auth',requireLogin,isAdmin, (req,res) => {
    res.status(200).send({ok:true})
})

router.get('/orders',requireLogin,myOrders);

router.get("/allOrders", requireLogin, isAdmin, getAllOrdersController);

router.put("/orderStatus/:orderId",requireLogin,isAdmin,orderStatusController);

module.exports = router