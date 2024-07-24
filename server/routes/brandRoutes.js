const express = require('express')
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const {createBrand,updateBrand,deleteBrand, getBrand, getBrandById,upload} = require('../controllers/brandController');

const router = express.Router();

router.get('/getAll-brand',getBrand);
router.get('/getBrandBtId-brand/:slug',getBrandById);
router.post('/create-brand',upload.single('brandPictures'),requireLogin, isAdmin,createBrand);
router.put('/update-brand/:id',requireLogin,isAdmin,updateBrand);
router.delete('/delete-brand/:id',requireLogin,isAdmin,deleteBrand);

module.exports = router