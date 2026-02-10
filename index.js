//Use dotenv to read .env vars into Node
require('dotenv').config()

//Built In Node Dependencies
// const path = require('path')
// const fs = require('fs')

//Logging Dependencies
const { logger } = require('./config/log-module')

//Express
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const { initFirebase } = require("./firebase-admin");

//Init express
const app = express()

//Routes
const userRoutes = require('./routes/user.routes')

//Middlewares
app.use(express.json());
app.use(cors())

// --- Firebase Admin init ---
// Recommended: use GOOGLE_APPLICATION_CREDENTIALS env var pointing to serviceAccountKey.json
// Or you can load it explicitly with import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };
initFirebase();

//Routes Definitions API
app.use('/v1/users', userRoutes)

// //Route Web Site
app.get('/', (req, res) => res.json({ message: 'Arqueros Del Mar API' }));



//Handle production
// if (process.env.NODE_ENV === 'production') {
//Static Files
// app.use(express.static(path.join(__dirname, '/public/')))

//Handle SPA
// app.get(/.*/, (req, res) =>
// res.sendFile(path.join(__dirname, '/public/index.html')),
// )
// }

// let server
server = app.listen(process.env.PORT || 5000, () => {
  console.log(`[LOG=SERVER] Server started on port ${process.env.PORT}`)
  logger.info(`[LOG=SERVER] Server started on port ${process.env.PORT}`)
})
