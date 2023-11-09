const express = require('express')
const cors = require('cors');

const contactRouter = require('./routes/contact.routes')

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use(cors());
app.use('/api', contactRouter)
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))