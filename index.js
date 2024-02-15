import express from 'express'
import connectDb from './src/database/db.js'
import routes from './src/routes.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

connectDb()
    .then(() => {
        app.listen(3000, () => console.log('Connected to DB'))
    })
    .catch((err) => console.log(err))