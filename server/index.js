const express = require('express')
const app = express()
app.use(express.json())

const cors = require("cors")
app.use(cors())

//db
const db = require('./models')
 
const usersRouter = require('./routes/users')
app.use("/Auth", usersRouter)
 
const productsRouter = require('./routes/products')
app.use("/products", productsRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001")
    })
 })
 