const express = require('express')
const router = express.Router()
const { Products } = require("../models")
const {validateToken} = require('../middlewares/AuthMiddleware')

//file upload
const multer = require("multer")
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '.../client/public/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

//route 
router.get("/", async (req, res) => {
   const listOfProducts = await Products.findAll()
   res.json(listOfProducts)
})

router.post("/", validateToken, upload.single("image"), async (req, res) => {
   const url = req.protocol + '://' + req.get('host')
   const product = req.body
   product.image = url + '/public/' + req.body.image.name
   await Products.create(product)
   res.json(product)
})

router.get("/:id", async (req, res) => {
   const id = req.params.id
   const products = await Products.findByPk(id)
   res.json(products)
})

router.delete("/:productId", validateToken, async (req, res) => {
   const productId = req.params.productId
   
   await Products.destroy({
       where: {
           id: productId
       }
   })

   res.json("DELETED SUCCESSFULLY")
})

module.exports = router