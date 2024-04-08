import express from 'express';
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {corsConfig, validJson, errorEndWare} from './Utils/appMidd/index.js'
import mainRouter from './Routers/mainRouter.js'

const app = express();
app.use(morgan('dev'))
app.use(cors())
app.use(corsConfig)
app.use(helmet())
app.use(express.json())
app.use(validJson);

app.use(mainRouter)

app.use(errorEndWare)

export default app;