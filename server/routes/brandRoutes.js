const express = require('express')
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');
const {createBrand,updateBrand,deleteBrand, getBrand, getBrandById} = require('../controllers/brandController');
const multer  = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      let ex = path.extname(file.originalname)
      cb(null, `${Date.now()}${ex}`)
    }
})

  const upload = multer({storage})

router.get('/getAll-brand',getBrand);
router.get('/getBrandBtId-brand/:slug',getBrandById);
router.post('/create-brand',upload.single('brandPictures'),requireLogin,isAdmin,createBrand);
router.put('/update-brand/:id',requireLogin,isAdmin,updateBrand);
router.delete('/delete-brand/:id',requireLogin,isAdmin,deleteBrand);

module.exports = router