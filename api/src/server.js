import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
// import { corsConfig } from './Utils/appMidd/index.js'
import * as eh from './Configs/errorHandlers.js'
import { sessionMiddleware } from './Shared/Auth/Session.js'
import * as auth from './Shared/Auth/authMiddlewares.js'
import mainRouter from './routes.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())
// app.use(corsConfig)
app.use(helmet())
app.use(sessionMiddleware)
app.use(auth.csrfProtection)
app.use(auth.setCsrfToken)
app.use(cookieParser())
app.use(express.json())
app.use(eh.jsonFormat)

app.use(mainRouter)

app.use(eh.notFoundRoute)
app.use(eh.errorEndWare)

export default app
