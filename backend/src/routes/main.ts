import express from 'express'
import { index } from '../controllers/main-controller'
const router = express.Router()

router
  .route('/')
  .get(index)

export default router
