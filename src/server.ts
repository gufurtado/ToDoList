import 'reflect-metadata'
import cors from 'cors'
import express, { response } from 'express'
import routes from './routes'
import './database'

const app = express()

app.use(express.json())

app.use(routes)
app.use(cors())

app.listen(3333, () => {
    console.log('Server up')
})