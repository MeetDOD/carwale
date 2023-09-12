const express = require('express')
const { isAdmin, requireLogin } = require('../middleware/authMiddleware');
const {createCar,getAllCar, getCarById,getPhotoById,deleteCar,updatecar} = require('../controllers/carController');
const formidable = require('express-formidable')
const multer  = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      let ex = path.extname(file.originalname)
      cb(null, `${Date.now()}${ex}`)
    }
  })

  const upload = multer({storage})
  
router.get('/getAll-car',getAllCar);
router.get('/getCarById-car/:slug',getCarById);
router.get('/getPhoto-car/:pid',getPhotoById);

router.post('/create-car',requireLogin,isAdmin,upload.array('productPictures'),createCar);

router.put('/update-car/:pid',requireLogin,isAdmin,formidable(),updatecar);
router.delete('/delete-car/:pid',requireLogin,isAdmin,deleteCar);

module.exports = router