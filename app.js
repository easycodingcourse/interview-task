const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const cookieParser = require('cookie-parser');
const swaggerUI=require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerJSDoc');
require('./models')



// middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// for swaggerDocs 
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs));



app.get('/', (req, res) => {
  res.send('<h1>Everything is working perfectly</h1>')
})


// api route
app.use('/api',require('./routes/api'))



// 404 page
app.use((req, res, next) =>{
  res.status(404).send('404')
});




module.exports = app.listen(port, () => {
  console.log(`server runing on port ${port} at http://localhost:${port}`)
})